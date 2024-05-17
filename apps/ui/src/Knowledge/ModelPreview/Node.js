import React, { useState, useEffect, forwardRef, memo } from "react";
import {
  ListItem,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Card,
  CardContent,
  CardActions,
  Tooltip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import StarRateIcon from "@material-ui/icons/StarRate";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CancelIcon from "@material-ui/icons/Cancel";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Icon from '@mui/material/Icon';
import TextField from "Libs/orbital-templates/Material/_shared/Forms/Inputs/Forms.TextFieldInput";

const Node = forwardRef((props, ref) => {
  const [showNote, setShowNote] = useState(false);
  const [nodeValue, setNodeValue] = useState({ value: props.title, key: "title" });
  const [actionOpen, setActionOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setNodeValue({ value: props.title, key: "title" });
  }, [props.title]);

  const testHtml = (title) => {
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    return title && title.match(regex);
  };

  const renderExpandCollapse = () => {
    if (props.hasChildren) {
      return props.visible ? (
        <IconButton onClick={props.handleNodeToggle}>
          <KeyboardArrowDownIcon />
        </IconButton>
      ) : (
        <IconButton onClick={props.handleNodeToggle}>
          <KeyboardArrowRightIcon />
        </IconButton>
      );
    }
    return (
      <IconButton onClick={props.handleNodeToggle}>
        <StarRateIcon />
      </IconButton>
    );
  };

  const getTextStyle = (isHighlighted, index) => {
    return {
      margin: `10px 0px 10px ${props.level.split(".").length * 10}px`,
      borderBottom: "1px solid lightgrey",
      marginTop: isHighlighted ? "30px" : "0",
      fontWeight: isHighlighted ? "bold" : "",
      cursor: "pointer",
    };
  };

  const renderActions = () => {
    return (
      <>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={(event) => {
            setActionOpen(true);
            setAnchorEl(event.currentTarget);
          }}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          open={actionOpen}
          id="fade-menu"
          keepMounted
          onClose={() => setActionOpen(false)}
          anchorEl={anchorEl}
        >
          <MenuItem
            onClick={() => {
              props.handleNodeAdd("Empty Note ");
            }}
          >
            <IconButton>
              <AddCircleIcon />
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton
              onClick={() => {
                if (props.isEditing) {
                  return props.handleNodeUpdate(nodeValue);
                }
                props.handleNodeEdit();
              }}
            >
              {props.isEditing ? <CancelIcon /> : <EditIcon />}
            </IconButton>
          </MenuItem>
          <MenuItem>
            <IconButton
              onClick={() => {
                props.handleNodeDelete();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </MenuItem>
        </Menu>
      </>
    );
  };

  const renderText = () => {
    if (!props.isEditing) {
      return testHtml(props.title) ? (
        <a target="_blank" href={props.title} rel="noopener noreferrer">
          <Typography style={{ whiteSpace: "nowrap" }}>
            {props.title.length > 20 ? props.title : props.title}
          </Typography>
        </a>
      ) : (
        <Typography style={{ whiteSpace: "nowrap" }}>
          {props.title}
        </Typography>
      );
    }
    return (
      <TextField
        id={`input-${props._id}`}
        type="text"
        value={nodeValue.value}
        key={props.title}
        field={{ name: "title" }}
        setFieldValue={(key, value) => {
          setNodeValue({ key, value });
        }}
        setFieldTouched={(key, value) => {}}
        standAlone={true}
      />
    );
  };

  const isHighlighted = props.level.length <= 6;
  return (
    <Card key={props._id} ref={ref} id={props._id} style={{ margin: "10px 0" }}>
      <CardContent>
        <ListItem className={"list-item"} style={{ ...getTextStyle(isHighlighted, props.index) }}>
          <IconButton>
            <DragIndicatorIcon />
          </IconButton>
          {renderExpandCollapse()}
          {renderText()}
          <CardActions>
            <IconButton
              onClick={() => {
                if (props.isEditing) {
                  props.handleNodeUpdate(nodeValue);
                }
                props.handleNodeEdit();
              }}
            >
              {props.isEditing ? <CancelIcon /> : <EditIcon />}
            </IconButton>
            {props.note && (
              <IconButton
                onClick={() => {
                  setShowNote((prevState) => !prevState);
                }}
              >
                <Icon>note</Icon>
              </IconButton>
            )}
            {renderActions()}
            <Tooltip title="Search on Google">
              <IconButton
                component="a"
                href={`https://www.google.com/search?q=${props.rootTitle}+${props.title}`}
                target="_blank"
                style={{ marginRight: "5px" }}
              >
                <Icon>search</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Search on Wikipedia">
              <IconButton
                component="a"
                href={`https://en.wikipedia.org/wiki/Special:Search?search=${props.rootTitle}+${props.title}`}
                target="_blank"
                style={{ marginLeft: "5px" }}
              >
                <Icon>wiki</Icon>
              </IconButton>
            </Tooltip>
          </CardActions>
        </ListItem>
      </CardContent>
    </Card>
  );
});

export default memo(Node);

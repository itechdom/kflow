import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Icon } from "../../Libs/orbital-templates/Material/_shared/Icon/Icon";
import {
  truncateText,
  isLargeText,
  isHttpLink,
  MIN_TEXT_LENGTH,
  MAX_TEXT_LENGTH,
} from "./CustomTreeNode.utils";

const CustomTreeNode = ({
  nodeDatum,
  toggleNode,
  onClick,
  nodeStyle,
  textColor,
  onChatRequest,
  ...rest
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    if (
      nodeDatum &&
      nodeDatum.name &&
      nodeDatum.name.length > MAX_TEXT_LENGTH
    ) {
      handleOpenDialog();
    }
    onClick(nodeDatum, rest);
    toggleNode();
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [pWidth, setPWidth] = useState(0);
  const [pHeight, setPHeight] = useState(0);
  const pRef = useRef(null);

  useEffect(() => {
    if (pRef.current) {
      setPWidth(pRef.current.getBoundingClientRect().width);
      setPHeight(pRef.current.getBoundingClientRect().height);
    }
  }, [nodeDatum, pRef]);

  return (
    <>
      <g>
        <foreignObject x="-100" y="-100" width="200" height="250" ref={pRef}>
          <Card
            style={{
              maxWidth: 200,
              margin: "0 auto",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
            }}
          >
            {/* <CardMedia
              style={{ width: "50%", marginLeft: "25%" }}
              component="img"
              alt="Node Image"
              height="140"
              image="/images/knowledge-icon.webp"
              title="Node Image"
            /> */}
            <CardContent>
              <Tooltip title={nodeDatum.name} placement="top">
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: textColor,
                  }}
                >
                  {truncateText(nodeDatum.name, 15)}
                </div>
              </Tooltip>
            </CardContent>
            <CardActions style={{ justifyContent: "center" }}>
              {nodeDatum.children && (
                <IconButton onClick={toggleNode} style={{ color: "black" }}>
                  <Icon>{nodeDatum.__rd3t.collapsed ? "expand_more" : "expand_less"}</Icon>
                </IconButton>
              )}
              <IconButton
                onClick={() => onChatRequest(nodeDatum)}
                style={{ color: "black" }}
              >
                <Icon>search</Icon>
              </IconButton>
            </CardActions>
          </Card>
        </foreignObject>
      </g>
      <Dialog
        style={{ zIndex: 999999999999 }}
        open={openDialog}
        onClose={handleCloseDialog}
      >
        <DialogContent>
          <DialogContentText>{nodeDatum.name}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomTreeNode;

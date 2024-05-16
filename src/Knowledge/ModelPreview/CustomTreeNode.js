import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Icon } from "../../Libs/orbital-templates/Material/_shared/Icon/Icon";
import {
  truncateText,
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
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const hiddenDivRef = useRef(null);

  const handleClick = () => {
    if (nodeDatum?.name?.length > MAX_TEXT_LENGTH) {
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

  useEffect(() => {
    if (hiddenDivRef.current) {
      const { width, height } = hiddenDivRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, [nodeDatum]);

  return (
    <>
      <div style={{ position: "absolute", visibility: "hidden", whiteSpace: "nowrap" }} ref={hiddenDivRef}>
        {truncateText(nodeDatum.name, 15)}
      </div>
      <g>
        <foreignObject
          x={-dimensions.width / 2}
          y={-dimensions.height / 2}
          width={dimensions.width}
          height={dimensions.height}
        >
          <Card
            style={{
              margin: "0 auto",
              boxShadow: "none",
              borderRadius: "10px",
              width: dimensions.width,
              height: 'auto',
            }}
          >
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

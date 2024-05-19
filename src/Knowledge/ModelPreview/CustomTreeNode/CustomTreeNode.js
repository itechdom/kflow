import React, { useState } from "react";
import {
  Card, CardContent, CardActions,
  Dialog, DialogContent, DialogContentText, DialogActions,
  Button, IconButton, Tooltip
} from "@material-ui/core";
import { Icon } from "../../../Libs/orbital-templates/Material/_shared/Icon/Icon";

const CustomTreeNode = ({
  nodeDatum, toggleNode, onClick,
  nodeStyle, textColor, onChatRequest, onTopicDetails, ...rest
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    onClick(nodeDatum, rest);
    toggleNode();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <g>
        <foreignObject x="-100" y="-100" width="200" height="250"> {/* Removed ref here */}
          <Card
            style={{
              margin: "0 auto",
              width: "100%",
              boxShadow: "none",
              borderRadius: "10px",
            }}
            onClick={handleClick} // Added click handler to the Card
          >
            <CardContent>
              <Tooltip title={nodeDatum.name} placement="top">
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: textColor,
                    wordWrap: 'break-word'  //Added for text to wrap instead of overflowing
                  }}
                >
                  {nodeDatum.name} {/* Display the full name */}
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
              <IconButton
                onClick={() => onTopicDetails(nodeDatum)}
                style={{ color: "black" }}
              >
                <Icon>details</Icon>
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

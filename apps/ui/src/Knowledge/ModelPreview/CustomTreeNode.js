import React, { useEffect, useRef, useState } from "react";
import {
  Card, CardContent, CardActions, CardMedia,
  Dialog, DialogContent, DialogContentText, DialogActions,
  Button, IconButton, Tooltip
} from "@mui/material";
import { Icon } from "../../Libs/orbital-templates/Material/_shared/Icon/Icon";

// Removed unused imports
// import { truncateText, isLargeText, isHttpLink, MIN_TEXT_LENGTH, MAX_TEXT_LENGTH } from "./CustomTreeNode.utils";

const CustomTreeNode = ({
  nodeDatum, toggleNode, onClick,
  nodeStyle, textColor, onChatRequest, ...rest
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    onClick(nodeDatum, rest);
    toggleNode();
  };

  //Removed unnecessary dialog open 
  // const handleOpenDialog = () => {
  //   setOpenDialog(true);
  // };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Removed unused state and ref
  // const [pWidth, setPWidth] = useState(0);
  // const [pHeight, setPHeight] = useState(0);
  // const pRef = useRef(null);

  // Removed unused useEffect
  // useEffect(() => {
  //   if (pRef.current) {
  //     setPWidth(pRef.current.getBoundingClientRect().width);
  //     setPHeight(pRef.current.getBoundingClientRect().height);
  //   }
  // }, [nodeDatum, pRef]);

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
            </CardActions>
          </Card>
        </foreignObject>
      </g>

     {/*Removed dialog as it is not required anymore */} 
      {/* <Dialog
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
      </Dialog> */}
    </>
  );
};

export default CustomTreeNode;

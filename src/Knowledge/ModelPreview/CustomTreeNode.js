import React, { useEffect, useRef, useState } from "react";
import SvgCircles from "./SvgCircles";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import SaveIcon from "@material-ui/icons/Save";
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
  const [isExpanded, setIsExpanded] = useState(true);

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
    setIsExpanded(!isExpanded);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [cx, setCx] = useState(30);
  const [cy, setCY] = useState(30);
  const [radius, setRadius] = useState(100);
  const [pWidth, setPWidth] = useState(0);
  const [pHeight, setPHeight] = useState(0);
  const pRef = useRef(null);

  useEffect(() => {
    if (
      nodeDatum &&
      nodeDatum.name &&
      nodeDatum.name.length > MIN_TEXT_LENGTH
    ) {
      setRadius(200);
      setCx(40);
      setCY(80);
    } else {
      setRadius(200);
      setCx(40);
      setCY(20);
    }

    toggleNode();
  }, [nodeDatum, pWidth, pHeight, toggleNode]);

  useEffect(() => {
    if (
      nodeDatum &&
      nodeDatum.name &&
      nodeDatum.name.length > MAX_TEXT_LENGTH
    ) {
      nodeDatum.label = truncateText(nodeDatum.name, 40);
    } else {
      nodeDatum.label = truncateText(nodeDatum.name, nodeDatum.name.length);
    }
    if (pRef.current) {
      setPWidth(pRef.current.getBoundingClientRect().width);
      setPHeight(pRef.current.getBoundingClientRect().height);
    }
  }, [nodeDatum, pRef]);

  return (
    <>
      <g>
        <SvgCircles
          cx={cx}
          cy={cy}
          r={radius}
          fill="white"
          stroke="black"
          strokeWidth="1.5"
          filter="url(#dropshadow)"
          nodeStyle={nodeStyle}
          onClick={handleClick}
        />
        <foreignObject
          onClick={handleClick}
          x="-70"
          y="-70"
          width="100%"
          height="100%"
          ref={pRef}
        >
          {isHttpLink(nodeDatum.name) ? (
            <a
              href={nodeDatum.name}
              target="_blank"
              rel="noopener noreferrer"
              xmlns="http://www.w3.org/1999/xhtml"
            >
              <p
                style={{
                  fontSize: "36px",
                  width: "300px",
                  whiteSpace: "wrap",
                  color: textColor,
                }}
              >
                <Tooltip title={nodeDatum.name} placement="top">
                  <span>{truncateText(nodeDatum.name, 10)}</span>
                </Tooltip>
              </p>
            </a>
          ) : isLargeText(nodeDatum.name) ? (
            <Tooltip title={nodeDatum.name} placement="top">
              <p
                style={{
                  fontSize: "36px",
                  width: "300px",
                  whiteSpace: "wrap",
                  color: textColor,
                }}
                xmlns="http://www.w3.org/1999/xhtml"
              >
                {nodeDatum.label}
              </p>
            </Tooltip>
          ) : (
            <p
              style={{
                fontSize: "36px",
                width: "300px",
                whiteSpace: "wrap",
                color: textColor,
              }}
              xmlns="http://www.w3.org/1999/xhtml"
            >
              {nodeDatum.label}
            </p>
          )}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            {nodeDatum.children && (
              <IconButton
                onClick={handleClick}
                style={{ color: "black", zIndex: 99999999999 }}
              >
                {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </IconButton>
            )}
            <IconButton
              onClick={() => onChatRequest(nodeDatum)}
              style={{ color: "black", zIndex: 99999999999 }}
            >
              <SaveIcon />
            </IconButton>
          </div>
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
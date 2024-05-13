import React, { useEffect, useRef, useState } from "react";
import SvgCircles from "./SvgCircles";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

function truncateText(text, maxLength) {
  //make copy of text to avoid mutation
  let mutatedText = text.slice();
  if (text.length > maxLength) {
    //create a non mutating version of the below line
    mutatedText = mutatedText.substring(0, maxLength) + "...";
  }
  return mutatedText;
}

function isHttpLink(text) {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&amp;a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!urlPattern.test(text);
}

const CustomTreeNode = ({
  nodeDatum,
  toggleNode,
  onClick,
  nodeStyle,
  textColor,
  ...rest
}) => {
  const MIN_TEXT_LENGTH = 20;
  const MAX_TEXT_LENGTH = 70;
  const [openDialog, setOpenDialog] = useState(false);

  const handleClick = () => {
    if (nodeDatum.name.length > MAX_TEXT_LENGTH) {
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

  const [cx, setCx] = useState(30);
  const [cy, setCY] = useState(30);
  const [radius, setRadius] = useState(100);
  const [pWidth, setPWidth] = useState(0);
  const [pHeight, setPHeight] = useState(0);
  const pRef = useRef(null);

  useEffect(() => {
    if (nodeDatum.name.length > MIN_TEXT_LENGTH) {
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
    if (nodeDatum.name.length > MAX_TEXT_LENGTH) {
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
                {truncateText(nodeDatum.name, 20)}
              </p>
            </a>
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

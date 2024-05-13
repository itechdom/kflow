import React, { useEffect, useRef } from "react";
import SvgCircles from "./SvgCircles";

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength - 3) + "...";
  }
  return text;
}

function isHttpLink(text) {
  const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&amp;a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!urlPattern.test(text);
}

const CustomTreeNode = ({ nodeDatum, toggleNode, onClick, nodeStyle, textColor, ...rest }) => {
  const MIN_TEXT_LENGTH = 20;
  const MAX_TEXT_LENGTH = 95;
  const handleClick = () => {
    onClick(nodeDatum, rest);
    toggleNode();
  };
  const [cx, setCx] = React.useState(30);
  const [cy, setCY] = React.useState(30);
  const [radius, setRadius] = React.useState(100);
  const [pWidth, setPWidth] = React.useState(0);
  const [pHeight, setPHeight] = React.useState(0);
  const pRef = useRef(null);

  useEffect(() => {
    if (nodeDatum.name.length > MIN_TEXT_LENGTH) {
      setRadius(200);
      setCx(40);
      setCY(80);
      if (nodeDatum.name.length > MAX_TEXT_LENGTH) {
        nodeDatum.name = truncateText(nodeDatum.name, MAX_TEXT_LENGTH);
      }
    } else {
      setRadius(200);
      setCx(40);
      setCY(20);
    }
    toggleNode();
  }, [nodeDatum, pWidth, pHeight, toggleNode]);

  useEffect(() => {
    if (pRef.current) {
      setPWidth(pRef.current.getBoundingClientRect().width);
      setPHeight(pRef.current.getBoundingClientRect().height);
    }
  }, []);

  return (
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
        {
          isHttpLink(nodeDatum.name) ? (
            <a href={nodeDatum.name} target="_blank" rel="noopener noreferrer" xmlns="http://www.w3.org/1999/xhtml">
              <p style={{
                fontSize: "36px",
                width: "300px",
                whiteSpace: "wrap",
                color: textColor,
              }}>
                {truncateText(nodeDatum.name, 20)}
              </p>
            </a>
          ) : (
            <p style={{
              fontSize: "36px",
              width: "300px",
              whiteSpace: "wrap",
              color: textColor,
            }} xmlns="http://www.w3.org/1999/xhtml">
              {nodeDatum.name}
            </p>
          )
        }
      </foreignObject>
    </g>
  );
};

export default CustomTreeNode;

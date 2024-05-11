import React from "react";

const SpriteDisplay = ({
  x,
  y,
  spriteWidth,
  spriteHeight,
  totalWidth,
  totalHeight,
  imageUrl,
}) => {
  return (
    // <svg width="100%" height="100%" viewBox={`0 0 ${spriteWidth} ${spriteHeight}`}>
    //   <defs>
    //     <clipPath id={`clip-${x}-${y}`}>
    //       <rect x="0" y="0" width={spriteWidth} height={spriteHeight} />
    //     </clipPath>
    //   </defs>
    //   <image
    //     href={imageUrl}
    //     width={totalWidth}
    //     height={totalHeight}
    //     transform={`translate(${offsetX}, ${offsetY})`}
    //     clipPath={`url(#clip-${x}-${y})`}
    //   />
    // </svg>
    //from right to left
    //column 1
    <>
      <defs>
        <clipPath id="c">
          <rect x="193" y="0" width="170px" height="150px"></rect>
        </clipPath>
        <clipPath id="c">
          <rect x="362" y="0" width="169px" height="150px"></rect>
        </clipPath>
        <clipPath id="c">
          <rect x="510" y="0" width="160px" height="150px"></rect>
        </clipPath>
        <clipPath id="c">
          <rect x="660" y="0" width="130px" height="150px"></rect>
        </clipPath>
        <clipPath id="c">
          <rect x="785" y="0" width="165px" height="153px"></rect>
        </clipPath>
        <clipPath id="c">
          <rect x="935" y="0" width="168px" height="150px"></rect>
        </clipPath>
        <clipPath id="c">
          <rect x="1100" y="0" width="168px" height="150px"></rect>
        </clipPath>
      </defs>
      <image
        transform={`translate(${x}, ${y})`}
        width="100%"
        height="100%"
        href="/images/planets-sprite-sheet.png"
        clip-path="url(#c)"
      ></image>
    </>
  );
};

export default SpriteDisplay;

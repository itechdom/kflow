import React from "react";

const SpriteDisplay = ({
  x,
  y,
  spriteWidth,
  spriteHeight,
  totalWidth,
  totalHeight,
  imageUrl,
  position
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
        {/* <clipPath id="c">
          <rect x="220" y="0" width="170px" height="150px"></rect>
        </clipPath> */}
        {/* <clipPath id="c">
          <rect x={(220*2)-10} y="0" width="60px" height="140px"></rect>
        </clipPath> */}
        <clipPath id="c">
          <rect x={(220*position)} y="0" width="100px" height="150"></rect>
        </clipPath>
        {/* <clipPath id="c">
          <rect x="660" y="0" width="130px" height="150px"></rect>
        </clipPath> */}
        {/* <clipPath id="c">
          <rect x="785" y="0" width="165px" height="153px"></rect>
        </clipPath> */}
        {/* <clipPath id="c">
          <rect x="935" y="0" width="168px" height="150px"></rect>
        </clipPath> */}
        {/* <clipPath id="c">
          <rect x="1100" y="0" width="168px" height="150px"></rect>
        </clipPath> */}
      </defs>
      <image
        transform={`translate(${x}, ${y})`}
        width="100%"
        height="100%"
        href="/images/plants-sprite-sheet-icons.webp"
        clip-path="url(#c)"
      ></image>
    </>
  );
};

export default SpriteDisplay;

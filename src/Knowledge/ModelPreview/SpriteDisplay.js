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
  //image width
  //1457
  //image height
  //1019
  //sprite width
  //170
  //sprite height
  //180
  // Calculate the transform offset based on the given position
  // The positions x and y are zero-based indices, so (1,1) means the second sprite horizontally and vertically.
  const offsetX = -(x * spriteWidth);
  const offsetY = -(y * spriteHeight);

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
      {/* <svg id="mySvg1" width="100%" height="100%" viewBox="0 0 200 180">
        <defs>
          <clipPath id="c">
            <rect x="-170" y="0" width="100%" height="100%"></rect>
          </clipPath>
        </defs>
        <image
          width="100%"
          height="100%"
          href="/images/planets-sprite-sheet.png"
          clip-path="url(#c)"
        ></image>
      </svg> */}
      <svg id="mySvg2" width="100%" height="100%" viewBox="0 0 200 180">
        <defs>
          <clipPath id="c">
            <rect x="-170" y="0" width="100%" height="100%"></rect>
          </clipPath>
        </defs>
        <image
          width="100%"
          height="100%"
          href="/images/planets-sprite-sheet.png"
          clip-path="url(#c)"
        ></image>
      </svg>
    </>
  );
};

export default SpriteDisplay;

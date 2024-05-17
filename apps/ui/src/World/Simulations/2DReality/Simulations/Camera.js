import React from "react";
import Matter from "matter-js";
import { Grid } from "@mui/material";
export const zoom = (Render, render, min, max) => {
  Render.lookAt(render, {
    min: { x: min, y: min },
    max: { x: max, y: max },
  });
};

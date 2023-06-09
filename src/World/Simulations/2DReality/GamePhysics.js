import React from "react";
import { Grid } from "@material-ui/core";
import Matter from "matter-js";
// import Pendulum from "./Simulations/Pendulum";
// import Gravitation from "./Simulations/Gravitation";
// import Math from "./Simulations/Math";
// import Primes from "./Simulations/Primes";
// import NumberTimeline from "./Simulations/NumberTimeline";
// import MatterGrid from "./Simulations/MatterGrid";
// import Axes from "./Simulations/Axes";
import Waves from "./Stories/Waves";
import Render from "./Matter/Render";
import KeyboardEventHandler from "react-keyboard-event-handler";
let fpsInterval = 1000 / 60,
  then = Date.now();
const animate = (onDraw) => {
  // request another frame
  requestAnimationFrame(animate.bind(null, onDraw));
  // calc elapsed time since last loop
  let now = Date.now();
  let elapsed = now - then;

  // if enough time has elapsed, draw the next frame
  if (elapsed > fpsInterval) {
    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    then = now - (elapsed % fpsInterval);
    onDraw();
  }
};
const initMatter = (
  canvasId,
  containerId,
  options,
  removeWalls,
  wallOptions
) => {
  var Engine = Matter.Engine,
    Runner = Matter.Runner,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    World = Matter.World,
    Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create(),
    world = engine.world;

  // create renderer
  var render = Render.create({
    element: document.getElementById(containerId),
    canvas: document.getElementById(canvasId),
    engine: engine,
    options: {
      background: "#8BE1EB",
      showAngleIndicator: true,
      wireframes: true,
      width: 1000,
      height: 750,
      ...options,
    },
  });

  Render.run(render);

  // create runner
  var runner = Runner.create();
  Runner.run(runner, engine);

  // add bodies
  var offset = 10,
    options = {
      isStatic: true,
      ...wallOptions,
    };
  world.bodies = [];
  if (!removeWalls) {
    World.add(world, [
      Bodies.rectangle(500, -offset, 1000 + 2 * offset, 50, options),
      Bodies.rectangle(500, 600 + offset, 1000 + 2 * offset, 50, options),
      Bodies.rectangle(1000 + offset, 300, 50, 600 + 2 * offset, options),
      Bodies.rectangle(-offset, 300, 50, 600 + 2 * offset, options),
    ]);
  }
  // add mouse control
  var mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: true,
        },
      },
    });

  World.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  // fit the render viewport to the scene
  // Render.lookAt(render, {
  //   min: { x: 0, y: 0 },
  //   max: {
  //     x: options && options.width ? options.width : 800,
  //     y: options && options.height ? options.height : 600,
  //   },
  // });

  // context for MatterTools.Demo
  return {
    engine: engine,
    runner: runner,
    Render,
    render: render,
    mouse: mouse,
    canvas: render.canvas,
    stop: function () {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
    },
  };
};
export const Game = ({ grid, phase, currentPlayer, onKeyPress }) => {
  const [paused, setPaused] = React.useState(false);
  const [position, setPosition] = React.useState();
  React.useEffect(() => {
    if (!grid[0] || !grid[0][0]) {
      return;
    }
    const { x, y, direction } = grid[0][0];
    setPosition({ x, y, direction });
  }, [grid]);
  return (
    <Grid
      className="game"
      id="canvas-container"
      container
      style={{
        width: "100%",
        minWidth: "800px",
        overflow: "scroll",
        marginLeft: "auto",
        marginRight: "auto",
        // backgroundColor: "#8BE1EB",
        overflow: "hidden" /* Hide scrollbars */,
      }}
    >
      {/* <Grid
        style={{
          padding: "2px",
          color: "white",
          textShadow: "black 0px 1px 1px",
          zIndex: 400,
          textAlign: "center",
        }}
        direction="column"
        justify="center"
        container
      >
        <Grid
          style={{
            marginBottom: "5em",
            padding: "3em",
          }}
          item
        >
          <h1>Physics</h1>
          <h3>
            Drag and Drop different objects in the scene using your mouse.
            Discover concepts like Gravity, Newton laws of motion and many other
            phyiscs concepts!
          </h3>
        </Grid>
      </Grid> */}
      <KeyboardEventHandler
        handleKeys={["all"]}
        onKeyEvent={(key, e) => onKeyPress(key)}
      />
      <Grid container justify="center">
        <Waves
          initMatter={initMatter}
          grid={grid}
          {...position}
        />
      </Grid>
    </Grid>
  );
};
export default Game;

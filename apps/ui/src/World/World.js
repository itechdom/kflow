import React from "react";
import { styles } from "./World.styles.js";
import theme from "Libs/orbital-templates/theme";
import { withStyles, Button } from "@mui/material";
import { Game as PhysicsGame } from "./Simulations/2DReality/GamePhysics.js";
import { GameState as PhysicsGameState } from "./Simulations/2DReality/GamePhysics.state.js";
import { Grid } from "@mui/material";
import Reality from "./Simulations/Reality/Reality.js";
const World = ({
  knowledge,
  knowledge_createModel,
  knowledge_getModel,
  knowledge_updateModel,
  knowledge_deleteModel,
  knowledge_searchModel,
  knowledge_gallery_upload,
  knowledge_media_upload,
  knowledge_media_delete,
  knowledge_count,
  knowledge_set_filter,
  knowledge_remove_filter,
  location,
  match,
  history,
  classes,
  form,
  notifications,
  saveNotification,
  removeNotification,
  modelName,
  getUnsplash,
  knowledge_createKnowledge,
  knowledge_updateKnowledge,
  knowledge_searchKnowledge,
  deleting,
  setDeleting,
  knowledge_loading,
  ...rest
}) => {
  return (
    <Grid
      container
      style={{
        backgroundImage: `url("/Assets/game/hexagonTiles/webb.png")`,
        backgroundRepeat: "repeat",
        height: "100vh",
      }}
    >
      <Grid md={12} item>
        <PhysicsGameState>
          <PhysicsGame></PhysicsGame>
          {/* <Reality canvasId="3d" /> */}
        </PhysicsGameState>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles, { defaultTheme: theme })(World);

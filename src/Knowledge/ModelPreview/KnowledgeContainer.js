import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  Grid,
} from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ListTree from "./ListTree.js";
import GraphTree from "./GraphTree.js";
import Mindmap from "./Mindmap.js";

const KnowledgeContainer = ({
  model,
  edit,
  editedNode,
  knowledge,
  mindmapByKeys,
  level,
  knowledgeChat,
  viewOption,
  setReferences,
  graphContainer,
  TreeOperations,
  onBack,
  onEdit,
  onDelete,
  classes,
}) => {
  return (
    <>
      <AppBar position="static" color="default" className={classes.header}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onBack}>
            <BackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {model.title}
          </Typography>
          <div>
            <IconButton color="inherit" onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton color="inherit" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} className={classes.viewContainer}>
        <Grid item xs={12} md={6}>
          <Paper>
            {viewOption === 0 ? (
              <Mindmap
                knowledge={knowledge}
                mindmapByKeys={mindmapByKeys}
                editedNode={editedNode}
                knowledgeChat={knowledgeChat}
                edit={edit}
                level={level}
                width={graphContainer && graphContainer.width}
                height={graphContainer && graphContainer.height}
                {...TreeOperations}
              />
            ) : (
              <GraphTree
                knowledge={knowledge}
                mindmapByKeys={mindmapByKeys}
                editedNode={editedNode}
                edit={edit}
                level={level}
                width={graphContainer && graphContainer.width}
                height={graphContainer && graphContainer.height}
                {...TreeOperations}
              />
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <ListTree
              knowledge={knowledge}
              mindmapByKeys={mindmapByKeys}
              title={model.title}
              editedNode={editedNode}
              edit={edit}
              level={level}
              onRefs={(references) => {
                setReferences(references);
              }}
              {...TreeOperations}
            />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(KnowledgeContainer);
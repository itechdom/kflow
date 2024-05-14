import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Paper,
  Grid,
  Button,
  Tab,
  Tabs,
  Box,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import BackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmDeleteModal from "Libs/orbital-templates/Material/_shared/ConfirmDeleteModal/ConfirmDeleteModal";
import ListTree from "./ListTree.js";
import GraphTree from "./GraphTree";
import Mindmap from "./Mindmap";
import { withState, compose } from "recompose";
import star from "../../Assets/images/star.jpg";
import {
  handleNodeAdd,
  handleNodeDelete,
  handleNodeEdit,
  handleNodeSave,
  handleNodeSwap,
  handleNodeToggle,
  handleNodeUpdate,
  handleNodeSearch,
  isVisible,
} from "./Model.Preview.state";

const enhance = compose(
  withState("edit", "setEdit", false),
  withState("level", "setLevel", 0),
  withState("editedNode", "setEditedNode", ""),
  withState("mindmapByKeys", "setMindmapByKeys"),
  withState("viewOption", "setViewOption", 0),
  withState("deleting", "setDeleting", false),
  withState("references", "setReferences"),
  withState("graphContainer", "setGraphContainer"),
  withState("listContainer", "setListContainer")
);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
  },
  toolbar: {
    justifyContent: "space-between",
  },
  operationIcon: {
    marginRight: theme.spacing(1),
  },
  viewContainer: {
    marginTop: theme.spacing(2),
  },
  tab: {
    minWidth: 80, // Set according to your space
  },
}));

const ModelPreview = ({
  model,
  edit,
  setEdit,
  editedNode,
  setEditedNode,
  visibleNodeKeys,
  setVisibleNodeByKeys,
  mindmapByKeys,
  setMindmapByKeys,
  level,
  setLevel,
  knowledge_updateModel,
  knowledge_deleteModel,
  knowledgeChat,
  knowledge_loading,
  viewOption,
  setViewOption,
  graphData,
  setGraphData,
  deleting,
  setDeleting,
  references,
  setReferences,
  graphContainer,
  setGraphContainer,
  listContainer,
  setListContainer,
  TreeOperations,
  onBack,
  onEdit,
  onDelete,

  onAdd,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
            {/* Mindmap or GraphTree depending on tab selection */}
            {viewOption === 0 ? (
              <GraphTree
                mindmapByKeys={mindmapByKeys}
                editedNode={editedNode}
                edit={edit}
                level={level}
                width={graphContainer && graphContainer.width}
                height={graphContainer && graphContainer.height}
                {...TreeOperations}
              />
            ) : (
              <Mindmap
                mindmapByKeys={mindmapByKeys}
                editedNode={editedNode}
                knowledgeChat={knowledgeChat}
                edit={edit}
                level={level}
                width={graphContainer && graphContainer.width}
                height={graphContainer && graphContainer.height}
                {...TreeOperations}
              ></Mindmap>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            {/* ListTree or additional details panel */}
            <ListTree
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
            similar props
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default enhance(ModelPreview);

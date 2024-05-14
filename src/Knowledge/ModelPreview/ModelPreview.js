import React from "react";
import {
  Button,
  Grid,
  Paper,
  CircularProgress,
  Toolbar,
  AppBar,
  List,
  ListItem,
  IconButton,
  Icon,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import Autocomplete from "Libs/orbital-templates/Material/_shared/Autocomplete/Autocomplete";
import ListTree from "./ListTree.js";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ConfirmDeleteModal from "Libs/orbital-templates/Material/_shared/ConfirmDeleteModal/ConfirmDeleteModal";
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

const ModelPreviewViewOption = ({ viewOption, setViewOption, classes }) => {
  return (
    <Grid
      className={classes.viewOptionContainer}
      container
      justify={"flex-end"}
    >
      {/* <Grid item>
        <Paper>
          <Button
            className={
              viewOption === 0 ? classes.viewOptionSelected : classes.viewOption
            }
            onClick={() => setViewOption(0)}
          >
            Graph
          </Button>
        </Paper>
      </Grid>

      <Grid item>
        <Paper>
          <Button
            className={
              viewOption === 1 ? classes.viewOptionSelected : classes.viewOption
            }
            onClick={() => setViewOption(1)}
          >
            List
          </Button>
        </Paper>
      </Grid> */}
    </Grid>
  );
};

const graphRefCallback = (graphConainer, setGraphContainer, ref) => {
  if (ref) {
    setGraphContainer(ref.getBoundingClientRect());
  }
};

const listRefCallback = (listConainer, setListContainer, ref) => {
  if (ref) {
    setListContainer(ref);
  }
};

const store = {};

const ModelPreview = (props) => {
  let {
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
    classes,
    deleting,
    setDeleting,
    references,
    setReferences,
    graphContainer,
    setGraphContainer,
    listContainer,
    setListContainer,
    onAdd,
    onEdit,
    onDelete,
    onCreate,
    onView,
    wiki,
    fetchWikipediaPageByTopic,
    history,
    ...rest
  } = props;
  React.useEffect(() => {
    // setTimeout(() => {
    //   const container = document.getElementById("scrollContainer");
    //   if (store[model.title]) {
    //     document.getElementById("scrollContainer").scrollTop =
    //       store[model.title];
    //   } else {
    //     container.onscroll = function () {
    //       let scrollPos = this.scrollTop; //check the number in console
    //       store[model.title] = scrollPos;
    //     }
    //   }
    // }, 1000);
    console.log(props, "PROPS");
    console.log(props, "PROPS");
    fetchWikipediaPageByTopic(model.title);
  }, []);
  if (!mindmapByKeys && model && model.body) {
    setMindmapByKeys(model.body);
  }
  const measure = {
    graphRefCallback: graphRefCallback.bind(
      null,
      graphContainer,
      setGraphContainer
    ),
    listRefCallback: listRefCallback.bind(
      null,
      listContainer,
      setListContainer
    ),
  };
  const TreeOperations = {
    handleNodeAdd: handleNodeAdd.bind(null, mindmapByKeys, setMindmapByKeys),
    handleNodeEdit: handleNodeEdit.bind(null, mindmapByKeys, setEditedNode),
    handleNodeUpdate: handleNodeUpdate.bind(
      null,
      mindmapByKeys,
      setMindmapByKeys,
      setEditedNode,
      knowledge_updateModel,
      model
    ),
    handleNodeToggle: handleNodeToggle.bind(
      null,
      mindmapByKeys,
      setMindmapByKeys
    ),
    handleNodeDelete: handleNodeDelete.bind(
      null,
      mindmapByKeys,
      setMindmapByKeys
    ),
    isVisible: isVisible.bind(null, mindmapByKeys, visibleNodeKeys),
  };
  const listTreeSizes = {
    xs: viewOption === 1 ? 12 : 12,
    sm: viewOption === 1 ? 12 : 12,
    md: viewOption === 1 ? 12 : 12,
    lg: viewOption === 1 ? 12 : 12,
    xl: viewOption === 1 ? 12 : 12,
  };
  const graphTreeSizes = {
    xs: viewOption === 0 ? 12 : 12,
    sm: viewOption === 0 ? 12 : 12,
    md: viewOption === 0 ? 5 : 1,
    lg: viewOption === 0 ? 5 : 1,
    xl: viewOption === 0 ? 5 : 1,
  };
  return (
    <>
      <header>
        <Button onClick={() => history.push('/')} color="primary">
          Back to Home
        </Button>
        <h1>{model.title}</h1>
        <Paper style={{ padding: "1em", borderRadius: "50px" }}>
          <Grid style={{ marginBottom: "1em" }} container justify="flex-end">
            <Grid item xs={12}>
              <Autocomplete
                inputClassName={classes.autocomplete}
                throttleSearch={true}
                placeholder={`Search ${model.title}`}
                onSelect={(suggestion) => {
                  TreeOperations.handleNodeToggle(suggestion.id);
                  setTimeout(() => {
                    document.getElementById(suggestion.id).style =
                      "border:black 0.2px solid";
                    document.getElementById(suggestion.id).scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                      inline: "start",
                    });
                  }, 1000);
                }}
                loadSuggestions={(text) => {
                  return new Promise((resolve, reject) => {
                    let found = handleNodeSearch(mindmapByKeys, text);
                    found && resolve(found);
                  });
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </header>
      {model && (
        <Toolbar>
          <Grid container justify="flex-end">
            <Button
              variant="contained"
              aria-label="Edit Note"
              label="Edit Note"
              color="primary"
              style={{ marginRight: "10px" }}
              onClick={() => onEdit(model)}
            >
              <EditIcon style={{ marginRight: "5px" }} />
            </Button>
            <Button
              variant="contained"
              aria-label="Edit Note"
              label="Edit Note"
              color="secondary"
              onClick={() => setDeleting(true)}
            >
              <DeleteIcon style={{ marginRight: "5px" }} />
            </Button>
          </Grid>
        </Toolbar>
      )}
      <ConfirmDeleteModal
        open={deleting}
        setOpen={setDeleting}
        onConfirm={() => {
          setDeleting(false);
          knowledge_deleteModel(model).then((res) => {
            onDelete && onDelete();
          });
        }}
      />
      <ModelPreviewViewOption
        viewOption={viewOption}
        setViewOption={setViewOption}
        classes={classes}
      />
      {mindmapByKeys && (
        <Grid container justify="space-between">
          <Grid xs={12} sm={12} md={12} lg={12} xl={12} item>
            <Grid container justify="center" style={{ marginBottom: "30px" }}>
              <Grid item md={4}></Grid>
            </Grid>
            <Paper>
              <div
                ref={(ref) => {
                  if (!graphContainer) {
                    measure.graphRefCallback(ref);
                  }
                }}
              >
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
              </div>
            </Paper>
          </Grid>
          <Grid
            style={{
              marginTop: "30px",
              marginBottom: "6em",
            }}
            {...listTreeSizes}
            item
          >
            <Paper
              style={{
                height: "400px",
                overflow: "scroll",
              }}
              id="scrollContainer"
            >
              <div
                ref={(ref) => {
                  if (!listContainer) {
                    measure.listRefCallback(ref);
                  }
                }}
              >
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
              </div>
            </Paper>
          </Grid>

          <Grid {...graphTreeSizes} item style={{ marginTop: "30px" }}>
            <Grid item>
              <Paper>
                <List>
                  {wiki &&
                    wiki.map((link) => (
                      <ListItem>
                        <a target="_blank" href={link}>
                          {link}
                        </a>
                      </ListItem>
                    ))}
                  {wiki &&
                    wiki.map((link) => (
                      <ListItem>
                        <a target="_blank" href={link}>
                          {link}
                        </a>
                      </ListItem>
                    ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
          <Grid {...graphTreeSizes} item style={{ marginTop: "30px" }}>
            <Grid container justify="center" style={{ marginBottom: "10px" }}>
              <Grid item md={4}></Grid>
            </Grid>
            <Paper>
              <div
                ref={(ref) => {
                  if (!graphContainer) {
                    measure.graphRefCallback(ref);
                  }
                }}
              >
                <GraphTree
                  mindmapByKeys={mindmapByKeys}
                  editedNode={editedNode}
                  edit={edit}
                  level={level}
                  width={graphContainer && graphContainer.width}
                  height={graphContainer && graphContainer.height}
                  {...TreeOperations}
                />
              </div>
            </Paper>
          </Grid>
        </Grid>
      )}
      {!mindmapByKeys && (
        <Grid container justify="center">
          <CircularProgress />
        </Grid>
      )}
    </>
  );
};

export default enhance(ModelPreview);

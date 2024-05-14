import React from "react";
import ConfirmDeleteModal from "Libs/orbital-templates/Material/_shared/ConfirmDeleteModal/ConfirmDeleteModal";
import { withState, compose } from "recompose";
import KnowledgeContainer from "./KnowledgeContainer"; // Import MindmapContainer
import { Grid } from "@material-ui/core";
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
import Loading from "Libs/orbital-templates/Material/_shared/Loading/Loading";

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
    knowledge_chat,
    knowledge_loading,
    viewOption,
    classes,
    deleting,
    setDeleting,
    setReferences,
    graphContainer,
    onEdit,
    onDelete,
    fetchWikipediaPageByTopic,
    history,
  } = props;
  React.useEffect(() => {
    fetchWikipediaPageByTopic(model.title);
  }, []);
  if (!mindmapByKeys && model && model.body) {
    setMindmapByKeys(model.body);
  }
  // Operations passed to MindmapContainer
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

  React.useEffect(() => {
    fetchWikipediaPageByTopic(model.title);
  }, [model.title]);

  if (!mindmapByKeys && model && model.body) {
    setMindmapByKeys(model.body);
  }

  return mindmapByKeys? (
    <div>
      <KnowledgeContainer
        model={model}
        edit={edit}
        editedNode={editedNode}
        mindmapByKeys={mindmapByKeys}
        level={level}
        knowledgeChat={knowledge_chat}
        viewOption={viewOption}
        setReferences={setReferences}
        graphContainer={graphContainer}
        TreeOperations={TreeOperations}
        onBack={() => history.push("/")}
        onEdit={onEdit}
        onDelete={onDelete}
        classes={classes}
      />
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
    </div>
  ):(<Loading></Loading>);
};
export default enhance(ModelPreview);

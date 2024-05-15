import React, { useState, useEffect } from "react";
import ConfirmDeleteModal from "Libs/orbital-templates/Material/_shared/ConfirmDeleteModal/ConfirmDeleteModal";
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

const ModelPreview = (props) => {
  const {
    model,
    knowledge,
    knowledge_updateModel,
    knowledge_deleteModel,
    knowledge_chat,
    knowledge_loading,
    classes,
    fetchWikipediaPageByTopic,
    history,
    onEdit,
    onDelete
  } = props;

  const [edit, setEdit] = useState(false);
  const [level, setLevel] = useState(0);
  const [editedNode, setEditedNode] = useState("");
  const [mindmapByKeys, setMindmapByKeys] = useState(null);
  const [viewOption, setViewOption] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [references, setReferences] = useState(null);
  const [graphContainer, setGraphContainer] = useState(null);
  const [listContainer, setListContainer] = useState(null);
  const [visibleNodeKeys, setVisibleNodeByKeys] = useState([]);

  useEffect(() => {
    fetchWikipediaPageByTopic(model.title);
  }, [model.title, fetchWikipediaPageByTopic]);

  useEffect(() => {
    if (!mindmapByKeys && model && model.body) {
      setMindmapByKeys(model.body);
    }
  }, [model, mindmapByKeys]);

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

  return mindmapByKeys ? (
    <div>
      <KnowledgeContainer
        model={model}
        knowledge={knowledge}
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
  ) : (
    <Loading />
  );
};

export default ModelPreview;
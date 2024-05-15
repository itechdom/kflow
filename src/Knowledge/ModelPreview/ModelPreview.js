import React, { useState, useEffect, useCallback, useMemo } from "react";
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

const ModelPreview = ({
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
  onDelete,
}) => {
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

  const handleNodeAddCallback = useCallback(
    (nodeId, title, id) => handleNodeAdd(mindmapByKeys, setMindmapByKeys, nodeId, title, id),
    [mindmapByKeys, setMindmapByKeys]
  );

  const handleNodeEditCallback = useCallback(
    (nodeId, title) => handleNodeEdit(mindmapByKeys, setEditedNode, nodeId, title),
    [mindmapByKeys, setEditedNode]
  );

  const handleNodeUpdateCallback = useCallback(
    (nodeId, title) =>
      handleNodeUpdate(mindmapByKeys, setMindmapByKeys, setEditedNode, knowledge_updateModel, model, nodeId, title),
    [mindmapByKeys, setMindmapByKeys, setEditedNode, knowledge_updateModel, model]
  );

  const handleNodeToggleCallback = useCallback(
    (nodeId) => handleNodeToggle(mindmapByKeys, setMindmapByKeys, nodeId),
    [mindmapByKeys, setMindmapByKeys]
  );

  const handleNodeDeleteCallback = useCallback(
    (nodeId) => handleNodeDelete(mindmapByKeys, setMindmapByKeys, nodeId),
    [mindmapByKeys, setMindmapByKeys]
  );

  const isVisibleCallback = useCallback(
    (nodeId) => isVisible(mindmapByKeys, visibleNodeKeys, nodeId),
    [mindmapByKeys, visibleNodeKeys]
  );

  const TreeOperations = useMemo(() => ({
    handleNodeAdd: handleNodeAddCallback,
    handleNodeEdit: handleNodeEditCallback,
    handleNodeUpdate: handleNodeUpdateCallback,
    handleNodeToggle: handleNodeToggleCallback,
    handleNodeDelete: handleNodeDeleteCallback,
    isVisible: isVisibleCallback,
  }), [
    handleNodeAddCallback,
    handleNodeEditCallback,
    handleNodeUpdateCallback,
    handleNodeToggleCallback,
    handleNodeDeleteCallback,
    isVisibleCallback
  ]);

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

export default React.memo(ModelPreview);
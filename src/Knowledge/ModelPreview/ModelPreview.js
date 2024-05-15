import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ConfirmDeleteModal from "Libs/orbital-templates/Material/_shared/ConfirmDeleteModal/ConfirmDeleteModal";
import KnowledgeContainer from "./KnowledgeContainer";
import {
  addNode,
  editNode,
  updateNode,
  saveNode,
  deleteNode,
  toggleNode,
  setModel,
} from "./Model.Preview.feature";
import { isVisible } from "./Model.Preview.feature.helper";
import Loading from "Libs/orbital-templates/Material/_shared/Loading/Loading";

const ModelPreview = ({
  model,
  knowledge,
  knowledge_updateModel,
  knowledge_deleteModel,
  knowledge_chat,
  classes,
  history,
  onEdit,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const mindmapByKeys = useSelector((state) => state.mindmap.mindmapByKeys);
  const editedNode = useSelector((state) => state.mindmap.editedNode);
  const [edit, setEdit] = useState(false);
  const [level, setLevel] = useState(0);
  const [viewOption, setViewOption] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [references, setReferences] = useState(null);
  const [graphContainer, setGraphContainer] = useState(null);
  const [listContainer, setListContainer] = useState(null);
  const [visibleNodeKeys, setVisibleNodeByKeys] = useState([]);

  useEffect(() => {
    dispatch(setModel({ model }));
  }, [model, mindmapByKeys, dispatch, knowledge_updateModel]);

  const handleNodeAddCallback = useCallback(
    (nodeId, title) => dispatch(addNode({ nodeId, title })),
    [dispatch]
  );

  const handleNodeEditCallback = useCallback(
    (nodeId) => dispatch(editNode({ nodeId })),
    [dispatch]
  );

  const handleNodeUpdateCallback = useCallback(
    (nodeId, key, value) => dispatch(updateNode({ nodeId, key, value })),
    [dispatch]
  );

  const handleNodeToggleCallback = useCallback(
    (nodeId) => dispatch(toggleNode({ nodeId })),
    [dispatch]
  );

  const handleNodeDeleteCallback = useCallback(
    (nodeId) => dispatch(deleteNode({ nodeId })),
    [dispatch]
  );

  const isVisibleCallback = useCallback(
    (nodeId) => isVisible(mindmapByKeys, visibleNodeKeys, nodeId),
    [mindmapByKeys, visibleNodeKeys]
  );

  const TreeOperations = useMemo(
    () => ({
      handleNodeAdd: handleNodeAddCallback,
      handleNodeEdit: handleNodeEditCallback,
      handleNodeUpdate: handleNodeUpdateCallback,
      handleNodeToggle: handleNodeToggleCallback,
      handleNodeDelete: handleNodeDeleteCallback,
      isVisible: isVisibleCallback,
    }),
    [
      handleNodeAddCallback,
      handleNodeEditCallback,
      handleNodeUpdateCallback,
      handleNodeToggleCallback,
      handleNodeDeleteCallback,
      isVisibleCallback,
    ]
  );

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

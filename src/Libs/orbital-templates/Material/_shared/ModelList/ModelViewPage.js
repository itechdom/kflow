import React from "react";
import { Grid } from "@material-ui/core";
import ModelPreview from "../ModelPreview/ModelPreview";
import Loading from "../Loading/Loading";

const ModelViewPage = ({
  modelArray,
  modelName,
  onEditWrapper,
  onDeleteWrapper,
  deleteModel,
  updateModel,
  searchModel,
  form,
  classes,
  history,
  location,
  match,
  ModelPreviewActions,
  ModelPreviewAction,
  ModelPreviewAttachment,
  notifications,
  removeNotification,
}) => {
  const model = modelArray.data.find(({ _id }) => _id === match.params.id);
  if (!model) {
    return <Loading />;
  }
  return (
    <Grid container>
      <Grid item xs={12}>
        <ModelPreview
          modelName={modelName}
          onEdit={onEditWrapper}
          onDelete={onDeleteWrapper}
          deleteModel={deleteModel}
          updateModel={updateModel}
          searchModel={searchModel}
          form={form}
          classes={classes}
          model={model}
          ModelPreviewActions={ModelPreviewActions}
          ModelPreviewAction={ModelPreviewAction}
          notifications={notifications}
          removeNotification={removeNotification}
        />
        {ModelPreviewAttachment && <ModelPreviewAttachment model={model} />}
      </Grid>
    </Grid>
  );
};

export default ModelViewPage;

import React from "react";
import { Grid } from "@material-ui/core";
import ModelEdit from "../ModelEdit/ModelEdit";

const ModelEditPage = ({
  form,
  model,
  modelSchema,
  updateModel,
  onEditSubmit,
  modelName,
  history,
  match,
  media,
  gallery,
  uploadMedia,
  uploadGallery,
  addToGallery,
  removeFromGallery,
  addToMedia,
  deleteMedia,
  removeFromMedia,
  notifications,
  removeNotification,
}) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <ModelEdit
          modelName={modelName}
          onCancel={() => {
            history.goBack();
          }}
          onSave={(updatedModel, values) => {
            updateModel(updatedModel, values).then((res) => {
              onEditSubmit && onEditSubmit(updatedModel);
            });
          }}
          form={form}
          modelSchema={modelSchema}
          model={model}
          media={media}
          gallery={gallery}
          uploadMedia={uploadMedia}
          uploadGallery={uploadGallery}
          addToGallery={addToGallery}
          removeFromGallery={removeFromGallery}
          addToMedia={addToMedia}
          deleteMedia={deleteMedia}
          removeFromMedia={removeFromMedia}
          onMediaUploadComplete={(model, media) => {
            updateModel(model, { image: `${media}&q=${Date.now()}` });
          }}
          onGalleryUploadComplete={(model, media) => {
            updateModel(model, { gallery: [...model.gallery, ...media] });
          }}
          onMediaDeleteComplete={(model, media) => {
            updateModel(model, { image: `` });
          }}
          onGalleryDeleteComplete={(model, index) => {
            model.gallery.remove(index);
            updateModel(model, { gallery: model.gallery });
          }}
          notifications={notifications}
          removeNotification={removeNotification}
        />
      </Grid>
    </Grid>
  );
};

export default ModelEditPage;

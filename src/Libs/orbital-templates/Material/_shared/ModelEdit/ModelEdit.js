/**
 * Represents a component for editing a model.
 *
 * @component
 * @example
 * // Usage:
 * <ModelEdit
 *   model={model}
 *   modelSchema={modelSchema}
 *   onSave={handleSave}
 *   onCancel={handleCancel}
 *   onSelect={handleSelect}
 *   form={form}
 *   uploadMedia={uploadMedia}
 *   deleteMedia={deleteMedia}
 *   onMediaUploadComplete={handleMediaUploadComplete}
 *   onGalleryUploadComplete={handleGalleryUploadComplete}
 *   onMediaDeleteComplete={handleMediaDeleteComplete}
 *   onGalleryDeleteComplete={handleGalleryDeleteComplete}
 *   uploadGallery={uploadGallery}
 *   gallery={gallery}
 *   media={media}
 *   notifications={notifications}
 *   removeNotification={removeNotification}
 *   classes={classes}
 *   {...rest}
 * />
 *
 * @param {Object} props - The component props.
 * @param {Object} props.model - The model object to be edited.
 * @param {Object} props.modelSchema - The schema for the model.
 * @param {Function} props.onSave - The function to be called when the model is saved.
 * @param {Function} props.onCancel - The function to be called when the editing is cancelled.
 * @param {Function} props.onSelect - The function to be called when a selection is made.
 * @param {Object} props.form - The form object.
 * @param {Function} props.uploadMedia - The function to upload media.
 * @param {Function} props.deleteMedia - The function to delete media.
 * @param {Function} props.onMediaUploadComplete - The function to be called when media upload is complete.
 * @param {Function} props.onGalleryUploadComplete - The function to be called when gallery upload is complete.
 * @param {Function} props.onMediaDeleteComplete - The function to be called when media delete is complete.
 * @param {Function} props.onGalleryDeleteComplete - The function to be called when gallery delete is complete.
 * @param {Function} props.uploadGallery - The function to upload gallery.
 * @param {Object} props.gallery - The gallery object.
 * @param {Object} props.media - The media object.
 * @param {Array} props.notifications - The array of notifications.
 * @param {Function} props.removeNotification - The function to remove a notification.
 * @param {Object} props.classes - The CSS classes for styling the component.
 * @param {Object} props.rest - The rest of the props.
 * @returns {JSX.Element} The rendered component.
 */
import React from "react";
import { Formik } from "formik";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Icon,
} from "@material-ui/core";
import Forms from "../Forms/Forms";
import FormsValidate from "../Forms/Forms.Validate";
import Loading from "../Loading/Loading";
import ClientNotification from "../ClientNotification/ClientNotification";

export default class ModelEdit extends React.Component {
  componentWillReceiveProps(nextProps) {}
  componentDidMount() {}
  render() {
    let {
      model,
      modelSchema,
      onSave,
      onCancel,
      onSelect,
      form,
      uploadMedia,
      deleteMedia,
      onMediaUploadComplete,
      onGalleryUploadComplete,
      onMediaDeleteComplete,
      onGalleryDeleteComplete,
      uploadGallery,
      gallery,
      media,
      notifications,
      removeNotification,
      classes,
      ...rest
    } = this.props;

    return !!model ? (
      <Formik
        onSubmit={(values, actions) => {
          onSave(model, values);
        }}
        initialValues={model}
        enableReinitialize={true}
        validate={(values, props) => {
          let errors;
          errors = FormsValidate(values, form, modelSchema);
          return errors;
        }}
        render={({
          values,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
        }) => {
          return (
            <Card className={classes && classes.editContent}>
              <CardHeader title={model && model.title} />
              <CardContent>
                <form id="edit-form">
                  <Forms
                    id="edit-fields"
                    form={form}
                    errors={errors}
                    modelSchema={modelSchema}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                    values={values}
                    touched={touched}
                    media={model && model.image}
                    tempMedia={media}
                    gallery={model && model.gallery}
                    tempGallery={gallery}
                    isSubmitting={isSubmitting}
                    onMediaDrop={(acceptedFiles, rejectedFiles) => {
                      uploadMedia(model._id, acceptedFiles).then((res) => {
                        onMediaUploadComplete(model, res.data);
                      });
                    }}
                    onGalleryDrop={(acceptedFiles, rejectedFiles) => {
                      uploadGallery(model._id, acceptedFiles).then((res) => {
                        onGalleryUploadComplete(model, res.data);
                      });
                    }}
                    onMediaDelete={(image, index, isMultiple) => {
                      deleteMedia(model._id, image).then(() => {
                        if (isMultiple) {
                          onGalleryDeleteComplete(model, image, index);
                        }
                        onMediaDeleteComplete(model, image);
                      });
                    }}
                    onSelect={onSelect}
                    {...rest}
                  />
                </form>
              </CardContent>
              <CardActions style={{ justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={(event) => {
                    onCancel(event);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={(event) => {
                    handleSubmit(event);
                  }}
                >
                  <Icon>save</Icon>
                  <span style={{ marginLeft: "5px" }}>Save</span>
                </Button>
              </CardActions>
              <ClientNotification
                notifications={notifications}
                handleClose={(event, reason, notification) => {
                  removeNotification(notification);
                }}
              />
            </Card>
          );
        }}
      />
    ) : (
      <Loading />
    );
  }
}

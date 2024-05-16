import React, { useEffect } from "react";
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

const ModelEdit = ({
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
}) => {
  useEffect(() => {
    // ComponentDidMount logic can be placed here if needed
    // ComponentWillReceiveProps logic can be handled by the `useEffect` dependency array
  }, [model]);

  return !!model ? (
    <Formik
      onSubmit={(values) => {
        onSave(model, values);
      }}
      initialValues={model}
      enableReinitialize={true}
      validate={(values) => {
        const errors = FormsValidate(values, form, modelSchema);
        return errors;
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        setFieldTouched,
      }) => (
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
                onMediaDrop={(acceptedFiles) => {
                  uploadMedia(model._id, acceptedFiles).then((res) => {
                    onMediaUploadComplete(model, res.data);
                  });
                }}
                onGalleryDrop={(acceptedFiles) => {
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
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
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
      )}
    </Formik>
  ) : (
    <Loading />
  );
};

export default ModelEdit;
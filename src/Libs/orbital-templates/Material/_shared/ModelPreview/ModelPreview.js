import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ImageGallery from "react-image-gallery";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import * as Inputs from "../Forms/Inputs";
import Forms from "../Forms";
import "react-image-gallery/styles/css/image-gallery.css";
import { Formik } from "formik";
import moment from "moment";
import ClientNotification from "../ClientNotification/ClientNotification";
import {
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  Typography,
} from "@material-ui/core";

const ModelPreview = ({
  model,
  onEdit,
  form,
  deleteModel,
  onDelete,
  classes,
  ModelPreviewActions,
  ModelPreviewAction,
  onAction,
  notifications,
  removeNotification,
}) => {
  const [open, setOpen] = useState(false);

  if (form && model) {
    const previewList = form.fields.map((field, index) => {
      const values = model[field.name];
      const isEven = index % 2 === 0;
      const fieldType = field.type;
      const placeholder = field.placeholder;
      const fieldName = model[field.name];

      const getTableRow = (content) => (
        <TableRow selected={isEven}>
          <TableCell>
            <Typography variant="subtitle2">{placeholder}</Typography>
          </TableCell>
          <TableCell>
            <Typography>{content}</Typography>
          </TableCell>
        </TableRow>
      );

      switch (fieldType) {
        case "text":
        case "number":
        case "checkbox":
          return getTableRow(fieldName);
        case "select":
          return getTableRow(
            model[`${field.name}Value`] ? model[`${field.name}Value`] : fieldName
          );
        case "email":
          return getTableRow(fieldName);
        case "password":
          return getTableRow("********");
        case "datetime":
        case "date":
          return getTableRow(moment(fieldName).format("MMMM Do YYYY"));
        case "time":
          return getTableRow(moment(fieldName).format("hh:mm a"));
        case "text-editor":
          return getTableRow(fieldName);
        case "code-editor":
          return (
            <TableRow selected={isEven}>
              <TableCell>
                <Typography variant="subtitle2">{placeholder}</Typography>
              </TableCell>
              <TableCell>
                <Inputs.CodeInput previewOnly={true} field={field} value={fieldName} />
              </TableCell>
            </TableRow>
          );
        case "object-array":
          return (
            <TableRow selected={isEven}>
              <Formik>
                <Inputs.EditableObjectArray
                  form={field.form}
                  field={field}
                  values={values}
                  hideAdd={true}
                  hideDelete={true}
                  Actions={ModelPreviewActions}
                  onAction={(event, from) => onAction(event, model, from)}
                  FieldsComponent={Forms}
                />
              </Formik>
              <Grid container justify="flex-end">
                {ModelPreviewAction && (
                  <ModelPreviewAction onAction={(event) => onAction(event, model)} model={model} />
                )}
              </Grid>
            </TableRow>
          );
        case "markdown":
          return (
            <TableRow selected={isEven}>
              <TableCell>
                <Typography variant="subtitle2">{placeholder}</Typography>
              </TableCell>
              <TableCell>
                <Inputs.MarkdownInput previewOnly={true} field={field} value={fieldName} />
              </TableCell>
            </TableRow>
          );
        default:
          return null;
      }
    });

    return (
      <>
        <Card className={classes.previewContent}>
          <CardHeader
            title={model.title || model.name}
            action={
              <>
                <IconButton onClick={() => onEdit(model)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => setOpen(true)}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          />
          {model.image && (
            <Grid container justify="center" style={{ height: "200px" }}>
              <CardMedia
                component="img"
                alt={model.title || model.name}
                image={model.image}
                title="Contemplative Reptile"
                style={{ height: "200px", width: "auto" }}
              />
            </Grid>
          )}
          {model.gallery && model.gallery.length > 0 && (
            <ImageGallery
              items={model.gallery.map((image) => ({
                original: image,
                thumbnail: image,
              }))}
            />
          )}
          <CardContent>
            <Table>
              <TableBody>{previewList}</TableBody>
            </Table>
          </CardContent>
          <ClientNotification
            notifications={notifications}
            handleClose={(event, reason, notification) => {
              removeNotification(notification);
            }}
          />
        </Card>
        <ConfirmDeleteModal
          open={open}
          setOpen={setOpen}
          onConfirm={() => {
            deleteModel(model).then(() => {
              setOpen(false);
              onDelete();
            });
          }}
        />
      </>
    );
  }

  return null;
};

export default ModelPreview;

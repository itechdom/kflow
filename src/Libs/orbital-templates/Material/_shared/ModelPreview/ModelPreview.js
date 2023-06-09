import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ImageGallery from "react-image-gallery";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import * as Inputs from "../Forms/Inputs";
import Forms from "../Forms";
import "react-image-gallery/styles/css/image-gallery.css";
import { withState, compose } from "recompose";
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
  Typography
} from "@material-ui/core";

const enhance = compose(withState("open", "setOpen", false));

const ModelPreview = enhance(
  ({
    model,
    onEdit,
    form,
    open,
    setOpen,
    deleteModel,
    onDelete,
    classes,
    ModelPreviewActions,
    ModelPreviewAction,
    onAction,
    notifications,
    removeNotification
  }) => {
    if (form && model) {
      let previewList = form.fields.map((field, index) => {
        const values = model[field.name];
        if (
          (values !== model[field.name] && field.type === "text") ||
          field.type === "number" ||
          field.type === "checkbox"
        ) {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography variant="subtitle2">{field.placeholder}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{model[field.name]}</Typography>
              </TableCell>
            </TableRow>
          );
        }
        if (field.type === "select") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography>{field.placeholder}</Typography>
              </TableCell>
              <TableCell>
                <Typography>
                  {model[`${field.name}Value`]
                    ? model[`${field.name}Value`]
                    : model[`${field.name}`]}
                </Typography>
              </TableCell>
            </TableRow>
          );
        }
        if (field.type === "email") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography>{field.placeholder}</Typography>
              </TableCell>
              <TableCell>
                <Typography>{model[field.name]}</Typography>
              </TableCell>
            </TableRow>
          );
        }
        if (field.type === "password") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography>{field.placeholder}</Typography>
              </TableCell>
              <TableCell>{model[field.name]}</TableCell>
            </TableRow>
          );
        }
        if (field.type === "datetime" || field.type === "date") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography>{field.placeholder}</Typography>
              </TableCell>
              <TableCell>
                {moment(model[field.name]).format("MMMM Do YYYY")}
              </TableCell>
            </TableRow>
          );
        }
        if (field.type === "time") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography>{field.placeholder}</Typography>
              </TableCell>
              <TableCell>
                {moment(model[field.name]).format("hh:mm a")}
              </TableCell>
            </TableRow>
          );
        }
        if (field.type === "text-editor") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography variant="subtitle2">{field.placeholder}</Typography>
              </TableCell>
              <TableCell>{model[field.name]}</TableCell>
            </TableRow>
          );
        }
        if (field.type === "code-editor") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography variant="subtitle2">{field.placeholder}</Typography>
              </TableCell>
              <TableCell>
                <Inputs.CodeInput
                  previewOnly={true}
                  field={field}
                  value={model[field.name]}
                />
              </TableCell>
            </TableRow>
          );
        }
        if (field.type === "object-array") {
          return (
            <TableRow selected={index % 2 === 0}>
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
                  <ModelPreviewAction
                    onAction={event => onAction(event, model)}
                    model={model}
                  />
                )}
              </Grid>
            </TableRow>
          );
        }
        if (field.type === "markdown") {
          return (
            <TableRow selected={index % 2 === 0}>
              <TableCell>
                <Typography variant="subtitle2">{field.placeholder}</Typography>
              </TableCell>
              <TableCell>
                <Inputs.MarkdownInput
                  previewOnly={true}
                  field={field}
                  value={model[field.name]}
                />
              </TableCell>
            </TableRow>
          );
        }
      });
      return (
        <>
          <Card className={classes.previewContent}>
            <CardHeader
              title={model.title || model.name}
              action={
                <>
                  <IconButton
                    onClick={() => {
                      onEdit(model);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
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
            {model.gallery && (
              <>
                {/* <Typography>Gallery</Typography> */}
                {model.gallery.length > 0 ? (
                  <ImageGallery
                    items={model.gallery.map(image => {
                      return {
                        original: image,
                        thumbnail: image
                      };
                    })}
                  />
                ) : (
                  ""
                )}
              </>
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
    return <></>;
  }
);

export default ModelPreview;

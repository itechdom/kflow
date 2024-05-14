/**
 * React component for rendering a card item in a model list.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.classes - The CSS classes for styling the component.
 * @param {boolean} props.open - Flag indicating whether the delete confirmation modal is open.
 * @param {function} props.setOpen - Function to set the open state of the delete confirmation modal.
 * @param {Object} props.model - The model object to be displayed in the card.
 * @param {function} props.updateModel - Function to update the model.
 * @param {function} props.deleteModel - Function to delete the model.
 * @param {Object} props.setDeletedModel - Function to set the deleted model.
 * @param {Object} props.deletedModel - The deleted model object.
 * @param {string} props.mode - The mode of the component.
 * @param {Object} props.match - The match object from React Router.
 * @param {Object} props.history - The history object from React Router.
 * @param {function} props.onEdit - Function to handle the edit action.
 * @param {function} props.onView - Function to handle the view action.
 * @returns {JSX.Element} The JSX element representing the model list card item.
 */
import React from "react";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import moment from "moment";
import { withState, compose } from "recompose";
import {
  Chip,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  IconButton,
  Divider,
  Grid
} from "@material-ui/core";

const enhance = compose(
  withState("actionOpen", "setActionOpen", false),
  withState("anchorEl", "setAnchorEl"),
  withState("fetchedImage", "setFetchedImage", []),
  withState("isLoading", "setIsLoading", false),
  withState("selectedImage", "setSelectedImage", 0)
);

const ModelListCardItem = ({
  classes,
  open,
  setOpen,
  model,
  updateModel,
  deleteModel,
  setDeletedModel,
  deletedModel,
  mode,
  match,
  history,
  onEdit,
  onView
}) => {
  return (
    <>
      <Card
        style={{ width: "300px" }}
        key={model._id}
        className={classes.card}
      >
        <CardActionArea
          onClick={() => {
            onView
              ? onView(model)
              : history.push(`${match.url}/view/${model._id}`);
          }}
        >
          <Grid container direction="column" justify="center">
            {/* <CardMedia
              className={classes.cardImage}
              component="img"
              image={
                model.image ||
                "https://orbital-clients.s3.amazonaws.com/_Main/Markab-logo-only.svg"
              }
            />
            <Divider /> */}
            <CardContent>
              <Typography style={{ fontSize: "14px", fontWeight: "400" }}>
                {model.name || model.title}
              </Typography>
            </CardContent>
          </Grid>
        </CardActionArea>
        <CardActions>
          {model.tags &&
            model.tags.length > 0 &&
            model.tags.map((tag, index) => (
              <Chip
                key={index}
                size="small"
                style={{ fontSize: "10px", marginRight: "3px" }}
                variant="outlined"
                label={<>{tag}</>}
              />
            ))}
        </CardActions>
      </Card>
      <ConfirmDeleteModal
        open={open}
        setOpen={setOpen}
        onConfirm={() => {
          deleteModel(deletedModel).then(() => {
            setOpen(false);
          });
        }}
      />
    </>
  );
};

export default enhance(ModelListCardItem);

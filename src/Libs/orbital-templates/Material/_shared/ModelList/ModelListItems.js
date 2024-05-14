/**
 * Renders a list of model items.
 *
 * @component
 * @param {Object[]} models - The array of models to render.
 * @param {Object} gridSizes - The grid sizes for responsive layout.
 * @param {number} columnNumber - The number of columns in the grid.
 * @param {Object} classes - The CSS classes for styling.
 * @param {React.Component} ModelListItemComponent - The custom component for rendering each model item.
 * @param {boolean} open - The state for controlling the open/close state of the model item.
 * @param {function} setOpen - The function to set the open state of the model item.
 * @param {function} deleteModel - The function to delete a model.
 * @param {function} updateModel - The function to update a model.
 * @param {Object} deletedModel - The deleted model object.
 * @param {function} setDeletedModel - The function to set the deleted model object.
 * @param {function} onEdit - The function to handle the edit action.
 * @param {function} onView - The function to handle the view action.
 * @param {Object} match - The match object from React Router.
 * @param {Object} history - The history object from React Router.
 * @param {number} page - The current page number.
 * @param {boolean} loading - The loading state.
 * @param {string} mode - The mode of the model list.
 * @param {boolean} In - The state for controlling the fade in effect.
 * @param {function} setIn - The function to set the fade in state.
 * @param {Object} rest - The rest of the props.
 * @returns {React.Component} The rendered list of model items.
 */
import React from "react";
import ModelListCardItem from "./ModelListCardItem";
import { compose, withState, lifecycle } from "recompose";
import { Paper, Grid, Grow, Fade } from "@material-ui/core";
import Empty from "../Empty/Empty";
const enhance = compose(
  withState("open", "setOpen", false),
  withState("deletedModel", "setDeletedModel", {}),
  withState("In", "setIn", false),
  lifecycle({
    componentDidMount() {
      setTimeout(() => {
        this.props.setIn(true);
      }, 200);
    },
  })
);
const ModelListItems = enhance(
  ({
    models,
    gridSizes,
    columnNumber,
    classes,
    ModelListItemComponent,
    open,
    setOpen,
    deleteModel,
    updateModel,
    deletedModel,
    setDeletedModel,
    onEdit,
    onView,
    match,
    history,
    page,
    loading,
    mode,
    In,
    setIn,
    ...rest
  }) => {
    if (models) {
      if (Array.isArray(models) && models.length > 0) {
        return models.map((model, index) => {
          return (
            // <Fade in={In} timeout={index * 200}>
              <Grid
                style={{
                  marginRight: "2em",
                }}
                key={index}
                xs={gridSizes ? gridSizes.xs : 12}
                sm={gridSizes ? gridSizes.sm : 12}
                md={gridSizes ? gridSizes.md : 12}
                lg={gridSizes ? gridSizes.lg : 12}
                xl={gridSizes ? gridSizes.xl : 12}
                item
              >
                <div className={classes.listContainer}>
                  {ModelListItemComponent ? (
                    <ModelListItemComponent
                      classes={classes}
                      match={match}
                      open={open}
                      setOpen={setOpen}
                      model={model}
                      updateModel={updateModel}
                      deleteModel={deleteModel}
                      setDeletedModel={setDeletedModel}
                      deletedModel={deletedModel}
                      history={history}
                      columnNumber={columnNumber}
                      onEdit={onEdit}
                      onView={onView}
                      page={page}
                      {...rest}
                    />
                  ) : (
                    <ModelListCardItem
                      classes={classes}
                      match={match}
                      open={open}
                      setOpen={setOpen}
                      model={model}
                      updateModel={updateModel}
                      deleteModel={deleteModel}
                      setDeletedModel={setDeletedModel}
                      deletedModel={deletedModel}
                      history={history}
                      columnNumber={columnNumber}
                      onEdit={onEdit}
                      onView={onView}
                      page={page}
                      mode={mode}
                      {...rest}
                    />
                  )}
                </div>
              </Grid>
            // </Fade>
          );
        });
      }
    }
    return <Empty />;
  }
);

export default ModelListItems;

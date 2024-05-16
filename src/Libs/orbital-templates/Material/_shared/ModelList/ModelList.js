/**
 * @file ModelList.js
 * @desc This file contains the implementation of the ModelList component.
 * The ModelList component is responsible for rendering a list of models,
 * allowing users to add, edit, delete, and view individual models.
 * It also provides pagination, search functionality, and various customization options.
 * The component is built using React and Material-UI.
 */
import React, {useState} from "react";
//Routing
import { Route, Switch, HashRouter as Router } from "react-router-dom";
import { styles } from "./ModelList.styles";
import { withStyles } from "@material-ui/core/styles";
import ModelListItems from "./ModelListItems";
import ModelFilterList from "./ModelFilterList";
//shared components
import theme from "theme";
import {
  Grid,
  Button,
  Paper,
  Backdrop,
  useMediaQuery,
} from "@material-ui/core";
import Pagination from "../Pagination/Pagination";
import Autocomplete from "../Autocomplete/Autocomplete";
import FloatingAddButton from "../FloatingAddButton/FloatingAddButton";
import ClientNotification from "../ClientNotification/ClientNotification";
import Loading from "../Loading/Loading";
import ModelAddPage from "./ModelAddPage";
import ModelEditPage from "./ModelEditPage";
import ModelViewPage from "./ModelViewPage";

const ModelList = ({
  modelArray,
  modelSchema,
  createModel,
  modelName,
  updateModel,
  deleteModel,
  searchModel,
  uploadMedia,
  setFilter,
  removeFilter,
  modelCount,
  loading,
  gallery,
  uploadGallery,
  addToGallery,
  removeFromGallery,
  addToMedia,
  removeFromMedia,
  deleteMedia,
  media,
  match,
  history,
  location,
  classes,
  form,
  notifications,
  saveNotification,
  removeNotification,
  ModelPreviewActions,
  ModelPreviewAction,
  ModelPreviewAttachment,
  modelKey,
  columnNumber,
  onSearch,
  onSearchSelect,
  page,
  rowsPerPage,
  setPage,
  setRowsPerPage,
  ModelListActions,
  ModelListItemComponent,
  noPagination,
  onChangePage,
  onAdd,
  onAddText,
  onDelete,
  onEdit,
  onEditSubmit,
  onCreate,
  onCreateSubmit,
  onView,
  justify,
  disableViewPage,
  disableEditPage,
  enableSearch,
  gridSizes,
  defaultView
}) => {
  const [viewOption, setViewOption] = useState(0);

  const onEditWrapper = (model) => {
    if (onEdit) {
      return onEdit(model);
    }
    history.push(`${match.path}/edit/${model._id}`);
  };

  const onDeleteWrapper = (model) => {
    if (onDelete) {
      return onDelete(model);
    }
    history.push(`${match.path}`);
  };

  const onAddWrapper = () => {
    if (onAdd) {
      return onAdd();
    }
    history.push(`${match.path}/add`);
  };

  const onCreateWrapper = (model) => {
    if (onCreate) {
      return onCreate(model);
    }
    model && onViewWrapper(model);
  };

  const onViewWrapper = (model) => {
    if (onView) {
      return onView(model);
    }
    history.push(`${match.path}/view/${model._id}`);
  };

  const isXS = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const Actions = {
    onEdit: onEditWrapper,
    onDelete: onDeleteWrapper,
    onCreate: onCreateWrapper,
    onView: onViewWrapper,
    onAdd: onAddWrapper,
  };

  let models = modelArray.data;

  return (
    <Router>
      <Switch>
        <Route
          path={`${match.path}add`}
          render={(props) => (
            <ModelAddPage
              {...props}
              form={form}
              modelSchema={modelSchema}
              createModel={createModel}
              onCreateSubmit={onCreateSubmit}
              modelName={modelName}
              history={history}
              location={location}
              notifications={notifications}
              removeNotification={removeNotification}
            />
          )}
        />
        {!disableEditPage && (
          <Route
            path={`${match.path}edit/:id`}
            render={(props) => (
              <ModelEditPage
                {...props}
                form={form}
                modelSchema={modelSchema}
                updateModel={updateModel}
                onEditSubmit={onEditSubmit}
                modelName={modelName}
                history={history}
                location={location}
                match={match}
                media={media}
                gallery={gallery}
                uploadMedia={uploadMedia}
                uploadGallery={uploadGallery}
                addToGallery={addToGallery}
                removeFromGallery={removeFromGallery}
                addToMedia={addToMedia}
                deleteMedia={deleteMedia}
                removeFromMedia={removeFromMedia}
                notifications={notifications}
                removeNotification={removeNotification}
              />
            )}
          />
        )}
        {!disableViewPage && (
          <Route
            path={`${match.path}view/:id`}
            render={(props) => (
              <ModelViewPage
                {...props}
                modelArray={modelArray}
                modelName={modelName}
                onEditWrapper={onEditWrapper}
                onDeleteWrapper={onDeleteWrapper}
                deleteModel={deleteModel}
                updateModel={updateModel}
                searchModel={searchModel}
                form={form}
                classes={classes}
                history={history}
                location={location}
                match={match}
                ModelPreviewActions={ModelPreviewActions}
                ModelPreviewAction={ModelPreviewAction}
                ModelPreviewAttachment={ModelPreviewAttachment}
                notifications={notifications}
                removeNotification={removeNotification}
              />
            )}
          />
        )}
        <Route
          path={`${match.path}`}
          render={(props) => (
            <>
              <Backdrop
                style={{
                  zIndex: 99,
                  color: "#fff",
                }}
                open={loading}
              >
                <Loading />
              </Backdrop>
              {enableSearch && (
                <Grid style={{ marginBottom: "1em" }} container justify="flex-end">
                  <Grid item xs={12}>
                    <Paper
                      style={{ padding: "1em", borderRadius: "50px" }}
                      className={classes.autocompleteContainer}
                    >
                      <Autocomplete
                        inputClassName={classes.autocomplete}
                        placeholder={"Search…"}
                        onSelect={(suggestion) => {
                          onSearchSelect || disableViewPage
                            ? onSearchSelect(suggestion)
                            : history.push(`${match.path}/view/${suggestion._id}`);
                        }}
                        loadSuggestions={(text) => {
                          let query = {
                            [modelKey]: { $regex: text },
                          };
                          if (onSearch) {
                            return onSearch(query);
                          }
                          return new Promise((resolve, reject) => {
                            searchModel(query).then((res) => {
                              if (res) {
                                return resolve(res.data);
                              }
                            });
                          });
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              )}
              {(ModelListActions && <ModelListActions {...Actions} />) || (
                <Button
                  color="secondary"
                  classes={classes.addButton}
                  onClick={onAddWrapper}
                  variant="contained"
                >
                  {onAddText ? onAddText : `Create ${modelName}`}
                </Button>
              )}
              {viewOption === 0 && (
                <Grid container justify={justify}>
                  {modelCount && <ModelFilterList form={form} modelCount={modelCount} />}
                  <Grid item md={12}>
                    {defaultView ? (
                      defaultView
                    ) : (
                      <Grid container justify={justify}>
                        <ModelListItems
                          models={models}
                          classes={classes}
                          gridSizes={gridSizes}
                          ModelListItemComponent={ModelListItemComponent}
                          deleteModel={deleteModel}
                          updateModel={updateModel}
                          columnNumber={columnNumber}
                          page={page}
                          history={history}
                          match={match}
                          onView={onViewWrapper}
                          onEdit={onEditWrapper}
                          loading={loading}
                        />
                      </Grid>
                    )}
                  </Grid>
                  <Grid container>
                    <Grid style={{ marginTop: "4em" }} item md={12}>
                      {!noPagination ? (
                        <Paper>
                          <Pagination
                            isSm={isSm}
                            component="div"
                            count={modelArray.count}
                            rowsPerPage={10}
                            page={page}
                            onChangePage={(p) => {
                              onChangePage(p);
                            }}
                          />
                        </Paper>
                      ) : (
                        <></>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <ClientNotification
                notifications={notifications}
                handleClose={(event, reason, notification) => {
                  removeNotification(notification);
                }}
              />
              <FloatingAddButton classes={classes} onClick={onAddWrapper} />
            </>
          )}
        />
      </Switch>
    </Router>
  );
};

export default withStyles(styles, { defaultTheme: theme })(ModelList);
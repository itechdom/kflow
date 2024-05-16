import React from "react";
import { Grid } from "@material-ui/core";
import ModelAdd from "../ModelAdd/ModelAdd";

const ModelAddPage = ({
  form,
  modelSchema,
  createModel,
  onCreateSubmit,
  modelName,
  history,
  location,
  match,
  notifications,
  removeNotification,
}) => {
  return (
    <Grid container justify="center">
      <Grid item xs={12}>
        <ModelAdd
          model={{}}
          form={form}
          modelSchema={modelSchema}
          onSave={(values) => {
            createModel(values, (model) => {
              console.log("MODEL", model);
              onCreateSubmit
                ? onCreateSubmit(model)
                : history.push(`${match.path}/view/${model._id}`);
            });
          }}
          onCancel={() => {
            history.goBack();
          }}
          modelName={modelName}
          location={location}
          match={match}
          history={history}
          notifications={notifications}
          removeNotification={removeNotification}
        />
      </Grid>
    </Grid>
  );
};

export default ModelAddPage;

const knowledgeSchema = require("@markab.io/orbital-api/MongoDb/models/knowledges");
const knowledgeApi = require("./Knowledge");
const lambdaModel = require("@markab.io/orbital-api/MongoDb/models/lambda");
const mongoose = require("mongoose");

const Api = ({
  config,
  userModel,
  settingsModel,
  formsModel,
  permissionsModel,
  kernelModel,
  notificationsModel
}) => {
  const knowledgeModel = mongoose.model("knowledges", knowledgeSchema);
  const defaultProps = {
    kernelModel,
    permissionsModel,
    settingsModel,
    formsModel,
    notificationsModel,
    lambdaModel,
  };
  let knowledgeApiRoutes = knowledgeApi({
    config,
    knowledgeModel,
    ...defaultProps,
  });
  return {
    knowledgeApiRoutes,
  };
};

module.exports = Api;

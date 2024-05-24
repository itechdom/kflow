import knowledgeSchema from '@markab.io/orbital-api/MongoDb/models/knowledges.js';
import knowledgeApi from './Knowledge.js';
import lambdaModel from '@markab.io/orbital-api/MongoDb/models/lambda.js';
import mongoose from 'mongoose';

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

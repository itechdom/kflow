import lambdaModel from '@markab.io/orbital-api/MongoDb/models/lambda.js';
import knowledgeApi from './Knowledge/index.js';

const Api = ({
  config,
  userModel,
  settingsModel,
  formsModel,
  permissionsModel,
  kernelModel,
  notificationsModel,
  knowledgeModel
}) => {
  const defaultProps = {
    kernelModel,
    permissionsModel,
    settingsModel,
    formsModel,
    notificationsModel,
    lambdaModel,
    knowledgeModel
  };
  let knowledgeApiRoutes = knowledgeApi({
    config,
    ...defaultProps,
  });
  return {
    knowledgeApiRoutes,
  };
};

export default Api;

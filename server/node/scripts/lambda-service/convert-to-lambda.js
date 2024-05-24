import lambdaModel from '@markab.io/orbital-api/MongoDb/models/lambda.js';
import lambdaService from '@markab.io/node/lambda-service/lambda-service-script.js';
import MongoDb from '@markab.io/orbital-api/MongoDb/index.js';
import config from 'config';
lambdaService({
  lambdaModel,
  APP_PATH: "./src/",
  MODELS_FOLDER: "./src/Orbital/Mongodb/models/",
  MongoDb,
  config,
});

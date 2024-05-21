'use strict';
const serverless = require('serverless-http');
const config = require('config');
const getAWSSecret = require('./getAWSSecret');
const { getExpressApp, getAllApis, registerAllRoutes } = require('./server');

const appConfig = config; // Customize this if you need different configurations

const initApp = async () => {
    // Fetch the AWS Secret and connect to MongoDB
    const DB_URI = await getAWSSecret();
    config.set('db.host', DB_URI);
    // Initialize Express app
    const { app, server } = getExpressApp(appConfig);

    const exceptions = { disableChat: false, disableRides: false };
    const apiRoutes = getAllApis({ app, server, exceptions });
    registerAllRoutes({ app, server, exceptions, ...apiRoutes });

    return app;
};

const handler = async (event, context) => {
    const app = await initApp();
    const serverlessHandler = serverless(app);
    return serverlessHandler(event, context);
};

module.exports.handler = handler;
'use strict';
const serverless = require('serverless-http');
const customConfig = require('./customConfig');
const { getExpressApp, getAllApis, registerAllRoutes } = require('./server');

const initApp = async () => {
    // Initialize customConfig to fetch DB_URI
    await customConfig.initialize();

    // Initialize Express app
    const { app, server } = getExpressApp(customConfig);

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

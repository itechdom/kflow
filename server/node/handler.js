'use strict';
const serverless = require('serverless-http');
const customConfig = require('./customConfig');
const { getExpressApp, getAllApis, registerAllRoutes } = require('./server');
const MongoDb = require('./Libs/orbital-api/MongoDb');

const initApp = async () => {
    // Initialize customConfig to fetch DB_URI
    await customConfig.initialize();

    // Initialize MongoDB connection
    await MongoDb({
        config: customConfig,
        onDBInit: (models, schemas) => {
            console.log('Database initialized with models:', Object.keys(models));
        },
        onError: (err) => {
            console.error('Database connection error:', err);
        },
        onDisconnect: () => {
            console.log('Database disconnected');
        },
        isServerless: true  // Set this to true for serverless environments
    });

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
'use strict';
const serverless = require('serverless-http');
const config = require('config');
const { getExpressApp, getAllApis, registerAllRoutes } = require('./server');

const appConfig = config; // Customize this if you need different configurations

const { app, server } = getExpressApp(appConfig);

const exceptions = { disableChat: false, disableRides: false };
const apiRoutes = getAllApis({ app, server, exceptions });
registerAllRoutes({ app, server, exceptions, ...apiRoutes });

module.exports.handler = serverless(app);
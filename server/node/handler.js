'use strict';
import serverless from 'serverless-http';
import customConfig from './customConfig.js';
import {  getExpressApp, getAllApis, registerAllRoutes  } from './server.js';
import {  connectToDb  } from './utils/utils.js';

const initApp = async () => {
    // Initialize customConfig to fetch DB_URI
    await customConfig.initialize();

    await connectToDb((con) => console.log("connected to db" + con));

    const { app, server } = await getExpressApp(customConfig, true);

    const exceptions = { disableChat: false, disableRides: false };
    const apiRoutes = await getAllApis({ app, server, exceptions });
    await registerAllRoutes({ app, server, exceptions, ...apiRoutes });

    return app;
};

const handler = async (event, context) => {
    const app = await initApp();
    const serverlessHandler = serverless(app);
    return serverlessHandler(event, context);
};

export default handler;

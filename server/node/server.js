// =================================================================
// get the packages we need ========================================
// =================================================================
import express from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import config from "config"; // get our config import(file)
import session from "express-session"; // we remove this import(later)
import userModel from "@markab.io/orbital-api/MongoDb/models/user.js";
import settingsModel from "@markab.io/orbital-api/MongoDb/models/settings.js";
import permissionsSchema from "@markab.io/orbital-api/MongoDb/models/permissions.js";
import kernelModel from "@markab.io/orbital-api/MongoDb/models/kernel.js";
import formsSchema from "@markab.io/orbital-api/MongoDb/models/forms.js";
import notificationsSchema from "@markab.io/orbital-api/MongoDb/models/notifications.js";
import Kb from "./src/knowledge-base/api.js";
import expressPrintRoutes from "express-print-routes";
import path from "path";
import cors from "cors";
import { connectToDb } from "./utils/utils.js";

const permissionsModel = mongoose.model("Permissions", permissionsSchema);
const notificationsModel = mongoose.model("Notification", notificationsSchema);
const formsModel = mongoose.model("Forms", formsSchema);

const getExpressApp = async (config, isServerless) => {
  // =================================================================
  // starting the server ================================================
  // =================================================================

  // =================================================================
  // App =============================================================
  // =================================================================
  const app = express();
  app.set("superSecret", config.secret); // secret variable
  if (!isServerless) {
    const port = config.get("server.port"); // used to create, sign, and verify tokens
    const ip = config.get("server.host");
    var server = http.createServer(app);
    server.listen(port);
    console.log(`Magic happens at ${ip}:${port}`);
  }
  // =================================================================
  // configuration ===================================================
  // =================================================================

  const whitelist = config.get("cors.whitelist");
  const corsOptions = {
    origin: function (origin, callback) {
      console.warn("SHALL YOU PASS?", origin, whitelist);
      if (!origin) {
        return callback(null, false);
      }
      if (whitelist.find((or) => origin.indexOf(or) !== -1)) {
        console.warn("YOU SHALL PASS", origin);
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
  };

  // required for passport session auth
  //TODO: store in amazon ssm and retrieve using getAWSSecret()
  app.use(
    session({
      secret: "thecatwentoverthefencebutfoundafoxsosheranaway",
      saveUninitialized: true,
      resave: true,
    })
  );

  //CORS
  app.options("*", cors(corsOptions)); // enable pre-flight request for DELETE request
  app.use(cors(corsOptions));
  //CORS
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  // use body parser so we can get info = POST and/or URL parameters
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
  // use morgan to log requests to the console
  app.use(morgan("dev"));
  return { server, app };
};

const getAllApis = ({
  server,
  app,
  exceptions: { disableChat, disableRides },
}) => {
  // Get all available end points
  const defaultProps = {
    permissionsModel,
    formsModel,
    settingsModel,
    kernelModel,
    notificationsModel,
    userModel,
    // mediaModel,
    config,
  };
  const { knowledgeApiRoutes } = Kb({
    ...defaultProps,
  });
  // const {
  //   authApiRoutes,
  //   userApiRoutes,
  //   jwtApiRoutes,
  //   aclApiRoutes,
  //   formsApiRoutes,
  //   settingsApiRoutes,
  //   kernelApiRoutes,
  //   notificationsApiRoutes,
  //   mediaApiRoutes,
  // } = orbitalApi({
  //   ...defaultProps,
  // });
  return {
    // authApiRoutes,
    // userApiRoutes,
    // jwtApiRoutes,
    // aclApiRoutes,
    // mediaApiRoutes,
    // formsApiRoutes,
    // settingsApiRoutes,
    // kernelApiRoutes,
    // notificationsApiRoutes,
    knowledgeApiRoutes,
    ...defaultProps,
  };
};

const registerAllRoutes = async ({
  app,
  server,
  exceptions,
  authApiRoutes,
  userApiRoutes,
  jwtApiRoutes,
  aclApiRoutes,
  formsApiRoutes,
  settingsApiRoutes,
  kernelApiRoutes,
  notificationsApiRoutes,
  knowledgeApiRoutes,
  ridesApiRoutes,
  mediaApiRoutes,
  ...defaultProps
}) => {
  // const { disableChat, disableRides, disableNotifications } = exceptions;
  // // Register all end points
  // // Markab routes
  // app.use("/", authApiRoutes);
  // app.use("/jwt", jwtApiRoutes);
  // app.use("/users", ...userApiRoutes);
  // app.use("/media", ...mediaApiRoutes);
  // app.use("/settings", ...settingsApiRoutes);
  // app.use("/acl", jwtApiRoutes, ...aclApiRoutes);
  // app.use("/forms", ...formsApiRoutes);
  // app.use("/kernel", ...kernelApiRoutes);
  // if (!disableNotifications) {
  //   app.use("/notifications", ...notificationsApiRoutes);
  // }
  // Markab kb
  app.use("/knowledge", ...knowledgeApiRoutes);
};

// =================================================================
// printing all routes to a file =========================================
// =================================================================
const printAllRoutes = (app) => {
  let filepath = path.join(__dirname, "./docs/routes.md");
  expressPrintRoutes(app, filepath);
};

// =================================================================
// Setting up the database =========================================
// =================================================================

const main = async ({ exceptions }) => {
  const { app, server } = await getExpressApp(config);
  await connectToDb((con) => console.log("connected to db" + con));
  const {
    // authApiRoutes,
    // userApiRoutes,
    // jwtApiRoutes,
    // aclApiRoutes,
    // formsApiRoutes,
    // settingsApiRoutes,
    // kernelApiRoutes,
    // notificationsApiRoutes,
    knowledgeApiRoutes,
    ...defaultProps
  } = getAllApis({ app, server, exceptions });
  await registerAllRoutes({
    app,
    server,
    exceptions,
    // authApiRoutes,
    // userApiRoutes,
    // jwtApiRoutes,
    // aclApiRoutes,
    // formsApiRoutes,
    // settingsApiRoutes,
    // kernelApiRoutes,
    // notificationsApiRoutes,
    knowledgeApiRoutes,
    ...defaultProps,
  });
  return { app, exceptions };
};

export { getAllApis, getExpressApp, registerAllRoutes, printAllRoutes, main };

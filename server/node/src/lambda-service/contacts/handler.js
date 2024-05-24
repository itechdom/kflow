import mongoose from 'mongoose';
import config from 'config';
let conn = null;
const uri = config.get("db.remote");
import serverless from 'serverless-http';
import express from 'express';
import contactsApi from './index.js';
const app = express();
import model from './contacts.js';
import formsSchema from './forms.js';
import permissionsSchema from './permissions.js';
let handler, contactsModel, permissionsModel;
exports.handler = async function(event, context) {
  console.log(uri);
  // Make sure to add this so you can re-use "conn" between function calls.
  // See https://www.mongodb.com/blog/post/serverless-development-with-nodejs-aws-lambda-mongodb-atlas
  context.callbackWaitsForEmptyEventLoop = false;
  // Because "conn" is in the global scope, Lambda may retain it between
  // function calls thanks to "callbackWaitsForEmptyEventLoop".
  // This means your Lambda function doesn't have to go through the
  // potentially expensive process of connecting to MongoDB every time.
  if (conn == null) {
    console.log("connecting to db ...");
    conn = await mongoose.createConnection(uri, {
      // Buffering means mongoose will queue up operations if it gets
      // disconnected = MongoDB and send them when it reconnects.
      // With serverless, better to fail fast if not connected.
      bufferCommands: false, // Disable mongoose buffering
      bufferMaxEntries: 0 // and MongoDB driver buffering
    });
    console.log("connected to db");
  }
  contactsModel = conn.model("Contacts", model);
  const formsModel = conn.model("Forms", formsSchema);
  permissionsModel = conn.model("Permissions", permissionsSchema);
  handler = serverless(
    app.use(
      contactsApi({
        contactsModel,
        formsModel,
        permissionsModel
      })
    )
  );
  const result = await handler(event, context);
  return result;
};

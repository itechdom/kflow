import express from 'express';
import {  executeDomain  } from '../utils/utils.js';

export const formsService = function formsService({
  Model,
  formsDomainLogic: { read },
}) {
  var apiRoutes = express.Router();

  apiRoutes.get("/forms", async function (req, res) {
    try {
      let { criteria, isPermitted, onResponse } = executeDomain(req, res, read);
      if (!isPermitted) {
        return res.status(409).send({
          message: `You are not authorized to read ${Model.modelName}s`,
        });
      }
  
      const data = await Model.findOne(criteria).sort("-date");
      if (onResponse) {
        onResponse(data, req, res);
      } else {
        res.status(200).send(data);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  });

  return apiRoutes;
};

export const registerForms = ({ key, fields, formsModel }) => {
  let lookUpKey = key;
  // clearPermissions(formsModel);
  setForms(lookUpKey, fields, formsModel);
};

const setForms = (lookUpKey, fields, formsModel, autoPopulateDB) => {
  if (autoPopulateDB) {
    formsModel.update(
      { key: lookUpKey },
      { fields },
      { multi: true, upsert: true },
      (err, user) => {
        if (err) {
          console.error(err);
        }
        console.info("forms set!");
      }
    );
  }
};

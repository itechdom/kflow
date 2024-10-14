//the crud service creates [create, read, update, del] endpoints for a mongoose model
import crudService from '../../../Libs/node/crud-service/crud-service.js';
import mediaService from '../../../Libs/node/media-service/media-service.js';
import vizService from '../../../Libs/node/viz-service/viz-service.js';
import gptService from '../../../Libs/node/gpt-service/gpt-service.js';
import {
  formsService,
  registerForms,
} from "../../../Libs/node/forms-service/forms-service.js";
import {
  registerAction
} from "../../../Libs/node/acl-service/acl-service.js";
const Knowledge = ({
  config,
  knowledgeModel,
  permissionsModel,
  lambdaModel,
  formsModel,
  autoPopulateDB=false,
}) => {
  let modelName = "knowledges";
  let crudDomainLogic = {
    create: (user, req) => {
      return {
        isPermitted: true,
        criteria: {},
      };
    },
    read: (req, res) => {
      const query = req.query;
      return {
        isPermitted:true,
        criteria: {
          query,
        },
        exclude: query && query._id ? [] : ["body"],
      };
    },
    update: (user, req) => {
      return {
        isPermitted: true,
        criteria: {},
      };
    },
    del: (user, req) => {
      return {
        isPermitted: true,
        criteria: {},
      };
    },
    search: (user, req) => {
      return {
        isPermitted: true,
        criteria: {},
        onResponse: (data, _, res) => {
          let formattedData = data.map((d) => {
            return { _id: d._id, title: d.title };
          });
          return res
            .status(200)
            .send({ data: formattedData, count: formattedData.length });
        },
      };
    },
  };
  const knowledgeApi = crudService({ Model: knowledgeModel, crudDomainLogic });

  let vizDomainLogic = {
    average: (user, req, res) => {
      //this should return a criteria
      return {};
    },
    min: (user, req, res) => {
      return {};
    },
    max: (user, req, res) => {
      return {};
    },
    sum: (user, req, res) => {
      return {};
    },
    count: (user, req, res) => {
      return {};
    },
    distinct: (user, req, res) => {
      return {};
    },
  };
  const vizApi = vizService({
    Model: knowledgeModel,
    domainLogic: vizDomainLogic,
  });

  const gptApi = gptService(config);
  //file upload api
  let mediaDomainLogic = {
    getMedia: (user, req, res) => {
      return {
        criteria: {
          tag: user._id,
          token: user.jwtToken,
          query: { _id: req.query.query },
        },
        isPermitted: true,
      };
    },
    saveMedia: (user, req, res) => {
      return {
        criteria: {
          token: user.jwtToken,
          query: { _id: req.query.query, fileName: req.query.fileName },
        },
        isPermitted: true,
      };
    },
  };
  const fileUploadApi = mediaService({
    fileName: "knowledges",
    modelName,
    mediaDomainLogic,
    Model: knowledgeModel,
    fileExtension: ".jpg",
  });

  //forms api
  let formsDomainLogic = {
    read: (knowledge) => {
      return { criteria: { key: `${modelName}` }, isPermitted: true };
    },
  };
  const formsApi = formsService({
    Model: formsModel,
    formsDomainLogic,
  });
  if (autoPopulateDB) {
    registerAction({
      key: `${modelName}`,
      domainLogic: crudDomainLogic,
      permissionsModel,
      defaultPermission: false,
    });
    registerAction({
      key: `${modelName}`,
      domainLogic: mediaDomainLogic,
      permissionsModel,
    });
    registerForms({
      key: `${modelName}`,
      fields: [
        {
          type: "text",
          name: "title",
          placeholder: "Knowledge Title",
          value: "",
          required: true,
        },
        {
          type: "array",
          name: "tags",
          placeholder: "Tags",
          value: [],
          required: false,
        },
      ],
      formsModel,
    });
  }

  return [knowledgeApi, fileUploadApi, vizApi, formsApi, gptApi];
};

export default Knowledge;

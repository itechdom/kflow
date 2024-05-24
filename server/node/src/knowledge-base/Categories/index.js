//the crud service creates [create, read, update, del] endpoints for a mongoose model
import crudService from '@markab.io/node/crud-service/crud-service.js';
import vizService from '@markab.io/node/viz-service/viz-service.js';
import {
  formsService,
  registerForms,
} from "@markab.io/node/forms-service/forms-service";
import {
  registerAction,
  isPermitted,
} from "@markab.io/node/acl-service/acl-service.js";
const Categories = ({
  categoriesModel,
  permissionsModel,
  formsModel,
  autoPopulateDB = false,
}) => {
  let modelName = "categories";
  let crudDomainLogic = {
    create: (user, req) => {
      //we need to include is permitted in here
      return {
        isPermitted: isPermitted({ key: `${modelName}_create`, user }),
        criteria: {},
      };
    },
    read: (user, req) => {
      return {
        isPermitted: isPermitted({ key: `${modelName}_read`, user }),
        criteria: {},
      };
    },
    update: (user, req) => {
      return {
        isPermitted: isPermitted({ key: `${modelName}_update`, user }),
        criteria: {},
      };
    },
    del: (user, req) => {
      return {
        isPermitted: isPermitted({ key: `${modelName}_delete`, user }),
        criteria: {},
      };
    },
    search: (user, req) => {
      return {
        isPermitted: isPermitted({ key: `${modelName}_search`, user }),
        criteria: {},
      };
    },
  };
  const categoriesApi = crudService({
    Model: categoriesModel,
    crudDomainLogic,
  });

  /* Zee:
    what is this for? 
 */
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
    Model: categoriesModel,
    domainLogic: vizDomainLogic,
  });

  //forms api
  let formsDomainLogic = {
    read: (user) => {
      return { criteria: { key: modelName }, isPermitted: true };
    },
  };
  const formsApi = formsService({
    Model: formsModel,
    formsDomainLogic,
  });

  if (autoPopulateDB) {
    registerAction({
      key: modelName,
      domainLogic: crudDomainLogic,
      permissionsModel,
      defaultPermission: false,
    });
    registerForms({
      key: modelName,
      fields: [
        {
          type: "text",
          name: "title",
          placeholder: "Category Title",
        },
      ],
      formsModel,
    });
  }

  return [categoriesApi, vizApi, formsApi];
};

module.exports = Categories;

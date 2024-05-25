import request from 'supertest';
import express from 'express';
import Knowledge from './Knowledge';
import { jest } from '@jest/globals';
import crudService from '@markab.io/node/crud-service/crud-service.js';
import mediaService from '@markab.io/node/media-service/media-service.js';
import vizService from '@markab.io/node/viz-service/viz-service.js';
import gptService from '@markab.io/node/gpt-service/gpt-service.js';
import {
  formsService,
  registerForms,
} from '@markab.io/node/forms-service/forms-service.js';
import {
  registerAction,
  isPermitted,
} from '@markab.io/node/acl-service/acl-service.js';

const mockKnowledgeModel = {
  modelName: 'Knowledge',
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockPermissionsModel = jest.fn();
const mockLambdaModel = jest.fn();
const mockFormsModel = jest.fn();

const config = {};

const setupApp = () => {
  const app = express();
  app.use(express.json());
  
  const [knowledgeApi, fileUploadApi, vizApi, formsApi, gptApi] = Knowledge({
    config,
    knowledgeModel: mockKnowledgeModel,
    permissionsModel: mockPermissionsModel,
    lambdaModel: mockLambdaModel,
    formsModel: mockFormsModel,
    autoPopulateDB: true,
  });

  app.use('/knowledge', knowledgeApi);
  app.use('/fileUpload', fileUploadApi);
  app.use('/viz', vizApi);
  app.use('/forms', formsApi);
  app.use('/gpt', gptApi);

  return app;
};

describe('Knowledge Module', () => {
  let app;

  beforeAll(() => {
    app = setupApp();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('CRUD Operations', () => {
    it('should create knowledge if permitted', async () => {
      isPermitted.mockReturnValue(true);
      mockKnowledgeModel.create.mockResolvedValue({ title: 'New Knowledge' });

      const res = await request(app)
        .post('/knowledge')
        .send({ model: { title: 'New Knowledge' } });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ title: 'New Knowledge' });
    });

    it('should read knowledge if permitted', async () => {
      isPermitted.mockReturnValue(true);
      mockKnowledgeModel.find.mockResolvedValue([{ title: 'Knowledge' }]);

      const res = await request(app).get('/knowledge');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ data: [{ title: 'Knowledge' }], count: 1 });
    });

    it('should update knowledge if permitted', async () => {
      isPermitted.mockReturnValue(true);
      mockKnowledgeModel.findOneAndUpdate.mockReturnValue({ exec: jest.fn().mockResolvedValue({ title: 'Updated Knowledge' }) });

      const res = await request(app)
        .put('/knowledge')
        .send({ model: { title: 'Updated Knowledge' } });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ title: 'Updated Knowledge' });
    });

    it('should delete knowledge if permitted', async () => {
      isPermitted.mockReturnValue(true);
      mockKnowledgeModel.deleteOne.mockReturnValue({ exec: jest.fn().mockResolvedValue({}) });

      const res = await request(app).delete('/knowledge/123');

      expect(res.status).toBe(200);
    });

    it('should search knowledge if permitted', async () => {
      isPermitted.mockReturnValue(true);
      mockKnowledgeModel.find.mockReturnValue({ exec: jest.fn().mockResolvedValue([{ _id: '1', title: 'Knowledge' }]) });

      const res = await request(app).post('/knowledge/search').send({ query: {} });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ data: [{ _id: '1', title: 'Knowledge' }], count: 1 });
    });
  });
});

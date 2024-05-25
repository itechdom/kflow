import request from "supertest";
import express from "express";
import Knowledge from "./Knowledge";
import { jest } from "@jest/globals";

// Mock Models
const mockExec = jest.fn();
const mockSelect = jest.fn().mockReturnValue({ exec: mockExec });
const mockPopulate = jest.fn().mockReturnValue({ select: mockSelect });
const mockSort = jest.fn().mockReturnValue({ populate: mockPopulate });
const mockFind = jest.fn().mockReturnValue({ sort: mockSort });
const mockFindOneAndUpdate = jest.fn().mockReturnValue({ exec: mockExec });
const mockDeleteOne = jest.fn().mockReturnValue({ exec: mockExec });
const mockRegisterAction = jest.fn();
const mockRegisterForms = jest.fn();

class MockModel {
  constructor(data) {
    Object.assign(this, data);
  }

  save = jest.fn().mockResolvedValue(this);
  static find = mockFind;
  static paginate = jest.fn();
  static countDocuments = jest.fn().mockReturnValue({ exec: mockExec });
  static joiValidate = jest.fn();
  static findOneAndUpdate = mockFindOneAndUpdate;
  static deleteOne = mockDeleteOne;
  static create = jest.fn().mockResolvedValue({ _id: '12345', title: 'Test Knowledge' }); // Mock the create method
}

const config = {};
const mockCrudDomainLogic = {
  create: jest.fn(),
  read: jest.fn(),
  update: jest.fn(),
  del: jest.fn(),
  search: jest.fn(),
};

const setupKnowledgeFunction = (autoPopulateDB = false) => {
  return Knowledge({
    config,
    knowledgeModel: MockModel,
    permissionsModel: MockModel,
    lambdaModel: MockModel,
    formsModel: MockModel,
    autoPopulateDB,
  });
};

const app = express();
app.use(express.json());
const [knowledgeApi, fileUploadApi, vizApi, formsApi, gptApi] = setupKnowledgeFunction(true);
app.use("/knowledge", knowledgeApi);
app.use("/media", fileUploadApi);
app.use("/viz", vizApi);
app.use("/forms", formsApi);
app.use("/gpt", gptApi);

describe("Knowledge Function", () => {
  describe("CRUD API", () => {
    it("should create a knowledge entry", async () => {
      mockCrudDomainLogic.create.mockReturnValueOnce({ isPermitted: true });
      MockModel.joiValidate.mockReturnValueOnce({ error: null });
      MockModel.create.mockResolvedValueOnce({ _id: '12345', title: 'Test Knowledge' });

      const res = await request(app)
        .post('/knowledge/create')
        .send({ model: { title: 'Test Knowledge' } });
      console.error("RES", res.body);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id', '12345');
    });
    it("should read knowledge entries", async () => {
      mockCrudDomainLogic.read.mockReturnValueOnce({ isPermitted: true, criteria: {} });
      mockExec.mockResolvedValueOnce([{ _id: '12345', title: 'Knowledge' }]);

      const res = await request(app)
        .get('/knowledge');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data[0]).toHaveProperty('title', 'Knowledge');
    });

    it("should update a knowledge entry", async () => {
      mockCrudDomainLogic.update.mockReturnValueOnce({ isPermitted: true });
      MockModel.joiValidate.mockReturnValueOnce({ error: null });
      mockFindOneAndUpdate.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue({ _id: '12345', title: 'Updated Title' }),
      });
      const res = await request(app)
        .put('/knowledge')
        .send({ title: 'Updated Title' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', 'Updated Title');
    });

    it("should delete a knowledge entry", async () => {
      mockCrudDomainLogic.del.mockReturnValueOnce({ isPermitted: true });
      mockDeleteOne.mockReturnValueOnce({
        exec: jest.fn().mockResolvedValue({}),
      });

      const res = await request(app)
        .delete('/knowledge/12345');

      expect(res.status).toBe(200);
    });
  });

  describe("Visualization API", () => {
    it("should perform average calculation", async () => {
      const res = await request(app)
        .post('/viz/average')
        .send({ field: 'value' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('result');
    });
  });

  describe("GPT API", () => {
    it("should return a GPT response", async () => {
      const res = await request(app)
        .post('/gpt')
        .send({ prompt: 'Test Prompt' });

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('response');
    });
  });

  describe("Media API", () => {
    it("should upload a media file", async () => {
      const res = await request(app)
        .post('/media/upload')
        .attach('file', Buffer.from('dummy file content'), 'test.jpg');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('fileUrl');
    });
  });

  describe("Forms API", () => {
    it("should return form schema", async () => {
      const res = await request(app)
        .get('/forms');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('schema');
    });
  });

  describe("Auto-Populate DB", () => {
    it("should register actions and forms when autoPopulateDB is true", () => {
      setupKnowledgeFunction(true);
      expect(mockRegisterAction).toHaveBeenCalled();
      expect(mockRegisterForms).toHaveBeenCalled();
    });
  });
});

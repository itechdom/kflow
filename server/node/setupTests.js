import mongoose from 'mongoose';
import {jest} from '@jest/globals';

// Mock the database URI for testing purposes
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/testdb';

beforeAll(async () => {
  // Connect to the database
});

afterAll(async () => {
  // Disconnect from the database
});

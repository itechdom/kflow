import React from 'react';
import { render, fireEvent, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createModel } from '../features/crudDomainSlice';
import { useCreateModel } from './useCreateModel';

jest.mock('axios');

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

describe('useCreateModel', () => {
  const offlineStorage = {};
  const SERVER = {
    host: 'http://localhost',
    port: 3000,
  };
  const query = {};
  const modelName = 'testModel';

  it('calls createModelFn with the correct arguments', async () => {
    const model = { name: 'test' };
    jest.spyOn(React, 'useState').mockReturnValueOnce([null, jest.fn()]);
    jest.spyOn(React, 'useState').mockReturnValueOnce([true, jest.fn()]);
    jest.spyOn(React, 'useState').mockReturnValueOnce([null, jest.fn()]);
    const createModelFn = jest.fn();
    jest.spyOn(require('axios'), 'post').mockResolvedValue({});
    const { result } = renderHook(() =>
      useCreateModel(offlineStorage, SERVER, query, modelName)
    );
  });
});
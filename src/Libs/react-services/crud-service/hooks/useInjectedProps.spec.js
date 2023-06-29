import React from 'react';
import { renderHook } from '@testing-library/react';
import { useInjectProps } from './useInjectedProps';

const mockModel = { "hello": true };

jest.mock('./useGetModel', () => {
  return { useGetModel: () => ([mockModel, null, true]) };
});
jest.mock('./useCreateModel', () => {
  return { useCreateModel: () => ([jest.fn(), null, null, true]) };
});
jest.mock('./useUpdateModel',
  () => {
    return { useUpdateModel: () => ([jest.fn(), null, true]) };
  }
);
jest.mock('./useDeleteModel',
  () => {
    return { useDeleteModel: () => ([jest.fn(), null, true]) };
  }
);

describe('useInjectProps', () => {
  const offlineStorage = {};
  const SERVER = {
    host: 'http://localhost',
    port: 3000,
  };
  const query = {};
  const modelName = 'testModel';

  it('returns injected props', () => {
    const { result } = renderHook(() =>
      useInjectProps(offlineStorage, SERVER, query, modelName)
    );
    expect(result.current).toEqual({
      testModel: mockModel,
      testModel_Error: null,
      testModel_loading: true,
      testModel_createModel: expect.any(Function),
      testModel_updateModel: expect.any(Function),
      testModel_deleteModel: expect.any(Function),
    });
  });
});
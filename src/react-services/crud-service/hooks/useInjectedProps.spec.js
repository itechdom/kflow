import React from 'react';
import { renderHook } from '@testing-library/react';
import { useInjectProps } from './useInjectedProps';

jest.mock('./useGetModel');
jest.mock('./useCreateModel');
jest.mock('./useUpdateModel');
jest.mock('./useDeleteModel');

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
      testModel: null,
      testModel_Error: null,
      testModel_loading: true,
      testModel_createModel: expect.any(Function),
      testModel_updateModel: expect.any(Function),
      testModel_deleteModel: expect.any(Function),
    });
  });
});
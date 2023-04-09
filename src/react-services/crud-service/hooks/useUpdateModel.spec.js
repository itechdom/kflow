import React from 'react';
import { renderHook } from '@testing-library/react';
import { useUpdateModel } from './useUpdateModel';

jest.mock('axios');

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

describe('useUpdateModel', () => {
  const offlineStorage = {};
  const SERVER = {
    host: 'http://localhost',
    port: 3000,
  };
  const query = {};
  const modelName = 'testModel';

  it('returns updateModelFn, error, and isLoading', () => {
    const { result } = renderHook(() =>
      useUpdateModel(offlineStorage, SERVER, query, modelName)
    );
    expect(result.current).toHaveLength(3);
    expect(typeof result.current[0]).toBe('function');
    expect(result.current[1]).toBe(null);
    expect(result.current[2]).toBe(true);
  });
});
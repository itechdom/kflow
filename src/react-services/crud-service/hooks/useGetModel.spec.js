import React from 'react';
import { renderHook } from '@testing-library/react';
import { useGetModel } from './useGetModel';

jest.mock('react-redux');

describe('useGetModel', () => {
  const offlineStorage = {};
  const SERVER = {
    host: 'http://localhost',
    port: 3000,
  };
  const query = {};
  const modelName = 'testModel';

  it('returns model, error, and isLoading', () => {
    const dispatch = jest.fn();
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
    jest.spyOn(React, 'useSelector').mockReturnValue(null);
    jest.spyOn(require('axios'), 'get').mockResolvedValue({ data: {} });
    const { result } = renderHook(() =>
      useGetModel(offlineStorage, SERVER, query, modelName)
    );
    expect(result.current).toHaveLength(3);
    expect(result.current[0]).toBe(null);
    expect(result.current[1]).toBe(null);
    expect(result.current[2]).toBe(false);
  });
});
import React from 'react';
import { renderHook } from '@testing-library/react';
import { useGetModel } from './useGetModel';

jest.mock('axios');

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

describe('useGetModel', () => {
  beforeEach(() => {
    const setError = jest.fn(x => { });
    const setIsLoading = jest.fn(x => { });

    React.useState = jest
      .fn()
      .mockImplementationOnce(x => [null, setError])
      .mockImplementationOnce(x => [false, setIsLoading])
  });
  const offlineStorage = {
    getItem: () => new Promise((resolve) => resolve({})),
  };
  const SERVER = {
    host: 'http://localhost',
    port: 3000,
  };
  const query = {};
  const modelName = 'testModel';

  it('returns model, error, and isLoading', () => {
    jest.spyOn(React, 'useEffect').mockImplementationOnce((f) => f());
    //error
    jest.spyOn(React, 'useState').mockReturnValueOnce([null, jest.fn()]);
    //isLoading
    jest.spyOn(React, 'useState').mockReturnValueOnce([false, jest.fn()]);
    jest.spyOn(require('axios'), 'get').mockResolvedValue({ data: {} });
    const { result } = renderHook(() =>
      useGetModel(offlineStorage, SERVER, query, modelName)
    );
    expect(result.current).toHaveLength(3);
    expect(result.current[0]).toBe(undefined);
    expect(result.current[1]).toBe(null);
    expect(result.current[2]).toBe(true);
  });
});
import React from 'react';
import { renderHook } from '@testing-library/react';
import { useDeleteModel } from './useDeleteModel';

jest.mock('axios');

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: jest.fn(),
}));

describe('useDeleteModel', () => {
    const offlineStorage = {};
    const SERVER = {
        host: 'http://localhost',
        port: 3000,
    };
    const query = {};
    const modelName = 'testModel';

    it('returns deleteModelFn, error, and isLoading', () => {
        jest.spyOn(React, 'useState').mockReturnValueOnce([null, jest.fn()]);
        jest.spyOn(React, 'useState').mockReturnValueOnce([true, jest.fn()]);
        jest.spyOn(require('axios'), 'delete').mockResolvedValue({});
        const { result } = renderHook(() =>
            useDeleteModel(offlineStorage, SERVER, query, modelName)
        );
        expect(result.current).toHaveLength(3);
        expect(result.current[0]).toBeInstanceOf(Function);
        expect(result.current[1]).toBe(null);
        expect(result.current[2]).toBe(true);
    });
});
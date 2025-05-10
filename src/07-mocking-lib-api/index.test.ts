// Uncomment the code below and write your tests
const mockGet = jest.fn();
jest.mock('axios', () => {
  return {
    create: jest.fn(),
  };
});

jest.mock('lodash', () => ({
  throttle: (fn: any) => fn,
}));

import axios from 'axios';
import { throttledGetDataFromApi } from './index';

beforeEach(() => {
  jest.clearAllMocks();
  mockGet.mockReset();
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    // Write your test here
    mockGet.mockResolvedValueOnce({ data: {} });
    await throttledGetDataFromApi('/posts/1');

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    mockGet.mockResolvedValueOnce({ data: {} });
    await throttledGetDataFromApi('/posts/123');
    expect(mockGet).toHaveBeenCalledWith('/posts/123');
  });

  test('should return response data', async () => {
    // Write your test here
    const fakeData = { id: 123, title: 'Test' };
    mockGet.mockResolvedValueOnce({ data: fakeData });
    const result = await throttledGetDataFromApi('/posts/123');
    expect(result).toEqual(fakeData);
  });
});

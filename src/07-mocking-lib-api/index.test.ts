// Uncomment the code below and write your tests
const mockGet = jest.fn();

const mockCreate = jest.fn(() => ({
  get: mockGet,
}));

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: mockGet,
  })),
}));

jest.mock('lodash', () => ({
  throttle: (fn: any) => fn,
}));

let throttledGetDataFromApi: (
  path: string,
) => Promise<{ id: number; title: string }>;

beforeEach(() => {
  jest.resetModules();
  throttledGetDataFromApi = require('./index').throttledGetDataFromApi;
});

describe('throttledGetDataFromApi', () => {
  test('should create instance with provided base url', async () => {
    // Write your test here
    mockGet.mockResolvedValueOnce({ data: {} });

    await throttledGetDataFromApi('/posts/1');

    expect(mockCreate).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
    mockGet.mockResolvedValueOnce({ data: {} });

    await throttledGetDataFromApi('/todos/1');

    expect(mockGet).toHaveBeenCalledWith('/todos/1');
  });

  test('should return response data', async () => {
    // Write your test here
    const fakeData = { id: 1, title: 'Test' };
    mockGet.mockResolvedValueOnce({ data: fakeData });

    const result = await throttledGetDataFromApi('/todos/1');

    expect(result).toEqual(fakeData);
  });
});

// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');


describe('throttledGetDataFromApi', () => {
  const mockGet = jest.fn();

  beforeAll(() => {
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    // Write your test here
    await throttledGetDataFromApi('/posts/1');
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    // Write your test here
  });

  test('should return response data', async () => {
    // Write your test here
  });
});

import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/check-email',
    method: 'get',
    response: () => {
      return {
        code: 200,
        data: null,
        message: '',
      };
    },
  },
] as MockMethod[];
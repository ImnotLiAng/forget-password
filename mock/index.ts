import { MockMethod } from 'vite-plugin-mock';

const baseRes = {
  code: 200,
  data: null,
  message: '',
}
export default [
  {
    url: '/api/check-email',
    method: 'get',
    response: ({ query }) => {
      const res = {
       ...baseRes
      }
      if (query.code !== '123456@qq.com') res.code = 401
      return res;
    },
  },
  {
    url: '/api/check-code',
    method: 'get',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    response: ({query}) => {
      const res = {
        ...baseRes
      }
      if (query.code !== '123456') res.code = 401
      return res;
    },
  },
  {
    url: '/api/resent-code',
    method: 'post',
    response: () => {
      return {...baseRes}
    }
  }
] as MockMethod[];
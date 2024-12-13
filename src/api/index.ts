import axios from 'axios';

interface responseDataType {
  code: number;
  message: string
}

export const checkEmail = (email: string) => {
  return axios.get<responseDataType>('/api/check-email', {
    params: { email }
  });
}

export const checkCode = (code: string) => {
  return axios.get<responseDataType>('/api/check-code', {
    params: { code }
  })
}

export const ResendCode = (email: string) => {
  return axios.post<responseDataType>('/api/resent-code', {
    data: { email }
  })
}

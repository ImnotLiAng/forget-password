import axios from 'axios';


export const checkEmail = (email: string) => {
  return axios.get<{
    code: number;
    message: string
  }>('/api/check-email', {
    params: { email }
  });
}

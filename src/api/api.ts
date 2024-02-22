import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  withCredentials: true,
});

export async function getRefreshToken() {
  const response = await api.post('/v1/api/auth/reissue');
  return response;
}

api.interceptors.response.use(
  (res) => res,
  // response 에러 처리
  async (error) => {
    const { config, response } = error;

    // 토큰 만료
    if (response.status === 401) {
      if (response.data.status === 'UNAUTHORIZED') {
        const refreshResponse = await getRefreshToken();

        if (response.status === 200) {
          const newToken = refreshResponse.data.token;
          localStorage.setItem('token', refreshResponse.data.token);
          // 기존 request 처리
          config.headers.Authorization = `Bearer ${newToken}`;
          return axios(config);
        } else {
          localStorage.removeItem('token');
          window.location.replace('/');
        }
      }
    }
    return Promise.reject(error);
  },
);

export default api;

import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  // response 에러 처리
  async (error) => {
    const { config, response } = error;

    // 토큰 만료
    if (response.status === 401) {
      if (
        response.data.status === 'UNAUTHORIZED' &&
        response.data.message === 'accessToken이 만료되었습니다.'
      ) {
        api
          .post('/v1/api/auth/reissue')
          .then((res) => {
            localStorage.setItem('token', res.data.accessToken);
            // 기존 request 처리
            config.headers.Authorization = `Bearer ${res.data.accessToken}`;
            return axios(config);
          })
          .catch(() => {
            localStorage.clear();
            window.location.replace('/');
          });
      }
    }
    return Promise.reject(error);
  },
);

export default api;

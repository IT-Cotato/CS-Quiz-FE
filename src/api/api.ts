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
    if (response.status === 401 && response.data.message === 'accessToken이 만료되었습니다.') {
      try {
        const response = await api.post('v1/api/auth/reissue');
        config.headers.Authorization = `Beraer ${response.data.accessToken}`;
        localStorage.setItem('tokne', response.data.accessToken);
        return api(config);
      } catch (err) {
        localStorage.clear();
        window.location.replace('/');
      }
    }
    return Promise.reject(error);
  },
);

export default api;

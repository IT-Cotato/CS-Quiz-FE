import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

api.interceptors.response.use(
  (res) => res,
  // response 에러 처리
  async (error) => {
    const { config, response } = error;

    // 토큰 만료
    if (response.data.code === 'T-001') {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const response = await api.post('/v1/api/auth/reissue');
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          localStorage.setItem('token', response.data.accessToken);

          // queue에 쌓인 요청들을 다시 보냄
          refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
            api
              .request(config)
              .then((response) => resolve(response))
              .catch((err) => reject(err));
          });
          refreshAndRetryQueue.length = 0;

          return api(config);
        } catch (err) {
          localStorage.clear();
          window.location.replace('/');
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config, resolve, reject });
      });
    }

    return Promise.reject(error);
  },
);

export default api;

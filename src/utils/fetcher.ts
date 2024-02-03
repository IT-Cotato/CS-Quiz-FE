import api from '@/api/api';

const fetcher = (url: string) =>
  api
    .get(url, {
      headers: {
        withCredentials: true,
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then((res) => res.data);

export default fetcher;

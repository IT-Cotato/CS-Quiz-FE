import api from '@/api/api';

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default fetcher;

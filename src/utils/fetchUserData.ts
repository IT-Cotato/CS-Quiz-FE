import useSWR from 'swr';
import fetcher from './fetcher';

/**
 * fetch user's name, role, and etc
 * @returns {Object}
 */
export default function fetchUserData() {
  const { data } = useSWR('/v1/api/member/info', fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
    dedupingInterval: 6000000, // 10분동안은 데이터가 변경되지 않는 한 재요청이 발생하지 않음
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (error.status === 400) return;
      if (retryCount >= 10) return;
    },
  });
  return { data };
}

import useSWR from 'swr';
import fetcher from './fetcher';
import type { MemberData } from '@/typing/db';
/**
 * fetch user's name, role, and etc
 * @returns {Object}
 */

interface FetchUserData {
  data: MemberData;
}

export default function fetchUserData(): FetchUserData {
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

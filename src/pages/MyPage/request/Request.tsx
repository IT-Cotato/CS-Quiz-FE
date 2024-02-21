import React, { useState } from 'react';
import RoleApproveLayout, { Button, ButtonContainer } from '@pages/MyPage/RoleApproveLayout';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { IApplyMember } from '@/typing/db';
import RequestContent from '@pages/MyPage/request/RequestContent';

const Request = () => {
  const { data: applyList } = useSWR<IApplyMember[]>('/v1/api/admin/applicants', fetcher);
  const { data: rejectList } = useSWR<IApplyMember[]>('/v1/api/admin/reject-applicants', fetcher);

  const [listMode, setListMode] = useState('apply');

  return (
    <RoleApproveLayout headerText="신입 감자 가입요청 확인/ 승인">
      <ButtonContainer>
        <Button
          onClick={() => setListMode('apply')}
          position="left"
          active={listMode === 'apply' ? 'active' : 'non-active'}
        >
          <p>대기자 정보</p>
        </Button>
        <Button
          onClick={() => setListMode('reject')}
          position="right"
          active={listMode === 'reject' ? 'active' : 'non-active'}
        >
          <p>거절 목록</p>
        </Button>
      </ButtonContainer>
      {listMode === 'apply'
        ? applyList?.map((member) => (
            <RequestContent key={member.id} mode={listMode} member={member} />
          ))
        : rejectList?.map((member) => (
            <RequestContent key={member.id} mode={listMode} member={member} />
          ))}
    </RoleApproveLayout>
  );
};

export default Request;

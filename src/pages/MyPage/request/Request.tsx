import React, { useState } from 'react';
import RoleApproveLayout, { Box, Button, ButtonContainer } from '@pages/MyPage/RoleApproveLayout';
import styled from 'styled-components';
import RequestDropBox from '@components/RequestDropBox';

const Request = () => {
  const [listMode, setListMode] = useState('wait');

  return (
    <RoleApproveLayout headerText="신입 감자 가입요청 확인/ 승인">
      <ButtonContainer>
        <Button
          onClick={() => setListMode('wait')}
          position="left"
          active={listMode === 'wait' ? 'active' : 'non-active'}
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
      <Box>
        <p>누군가</p>
        <DropBoxContainer>
          <RequestDropBox mode="position" width="92px" />
        </DropBoxContainer>
      </Box>
    </RoleApproveLayout>
  );
};

export default Request;

const DropBoxContainer = styled.div`
  display: flex;
  gap: 8px;
`;

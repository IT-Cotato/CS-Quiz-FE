import React, { useState } from 'react';
import RoleApproveLayout, { Box, Button, ButtonContainer } from '@pages/MyPage/RoleApproveLayout';
import styled from 'styled-components';

const RoleGrant = () => {
  const [listMode, setListMode] = useState('member');

  return (
    <RoleApproveLayout headerText="관리자 권한설정">
      <ButtonContainer>
        <Button
          onClick={() => setListMode('member')}
          position="left"
          active={listMode === 'member' ? 'active' : 'non-active'}
        >
          <p>부원 정보</p>
        </Button>
        <Button
          onClick={() => setListMode('om')}
          position="right"
          active={listMode === 'om' ? 'active' : 'non-active'}
        >
          <p>OM 기수</p>
        </Button>
      </ButtonContainer>
      <Box>
        <p>누군가</p>
        <p>버튼들</p>
      </Box>
    </RoleApproveLayout>
  );
};

export default RoleGrant;

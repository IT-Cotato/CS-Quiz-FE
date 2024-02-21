import React, { useCallback, useState } from 'react';
import RoleApproveLayout, { Button, ButtonContainer } from '@pages/MyPage/RoleApproveLayout';
import styled from 'styled-components';
import fetcher from '@utils/fetcher';
import { IEnrollMember } from '@/typing/db';
import RoleContent from '@pages/MyPage/roleGrant/RoleContent';
import useSWRImmutable from 'swr/immutable';
import api from '@/api/api';

const RoleGrant = () => {
  const { data: activeList, mutate: mutateActive } = useSWRImmutable<IEnrollMember[]>(
    '/v1/api/admin/active-members',
    fetcher,
  );
  const { data: omList, mutate: mutateOm } = useSWRImmutable<IEnrollMember[]>(
    '/v1/api/admin/old-members',
    fetcher,
  );

  const [listMode, setListMode] = useState('active');
  const [addOm, setAddOm] = useState<IEnrollMember[]>([]);

  const onChangeAddOm = useCallback(
    (member: IEnrollMember) => {
      const newAddOm = [...addOm];
      newAddOm.push(member);
      setAddOm(newAddOm);
    },
    [addOm],
  );

  const onChangeRemoveOm = useCallback(
    (member: IEnrollMember) => {
      const newAddOm = addOm.filter((item) => item !== member);
      setAddOm(newAddOm);
    },
    [addOm],
  );

  const onClickOm = useCallback(() => {
    const omMemberIds: number[] = [];
    addOm.forEach((om) => omMemberIds.push(om.memberId));
    api
      .patch('/v1/api/admin/active-members/to-old-members', {
        memberIds: omMemberIds,
      })
      .then(() => {
        mutateActive();
        mutateOm();
      })
      .catch((err) => {
        console.error(err);
        mutateActive();
        mutateOm();
      });
  }, [addOm]);

  return (
    <RoleApproveLayout headerText="관리자 권한설정">
      <ButtonWrapper>
        <ButtonContainer>
          <Button
            onClick={() => setListMode('active')}
            position="left"
            active={listMode === 'active' ? 'active' : 'non-active'}
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
        {listMode === 'active' && (
          <OmButton active={addOm.length === 0 ? 'non-active' : 'active'} onClick={onClickOm}>
            <p>OM으로 전환하기</p>
          </OmButton>
        )}
      </ButtonWrapper>
      {listMode === 'active'
        ? activeList?.map((member) => (
            <RoleContent
              key={member.memberId}
              mode={listMode}
              member={member}
              addOm={addOm}
              onChangeAddOm={onChangeAddOm}
              onChangeRemoveOm={onChangeRemoveOm}
            />
          ))
        : omList?.map((member) => (
            <RoleContent key={member.memberId} mode={listMode} member={member} />
          ))}
    </RoleApproveLayout>
  );
};

export default RoleGrant;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const OmButton = styled.button<{ active: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: ${(props) => (props.active === 'active' ? '#477FEB' : 'rgba(71, 127, 235, 0.40);')};
  cursor: pointer;

  > p {
    color: #fff;
    font-family: NanumSquareRound;
    font-size: 20px;
    font-weight: 800;
    line-height: 160%;
    text-transform: capitalize;
  }
`;

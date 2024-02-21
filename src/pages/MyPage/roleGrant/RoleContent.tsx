import { IEnrollMember, IRole } from '@/typing/db';
import React, { useCallback, useEffect, useState } from 'react';
import { Box } from '../RoleApproveLayout';
import RoleDropBox from '@components/RoleDropBox';
import { styled } from 'styled-components';
import { ReactComponent as SleepBlack } from '@assets/sleep_black.svg';
import { ReactComponent as SleepAcitve } from '@assets/sleep_active.svg';
import api from '@/api/api';
import fetcher from '@utils/fetcher';
import useSWRImmutable from 'swr/immutable';

interface Props {
  mode: string;
  member: IEnrollMember;
  addOm?: IEnrollMember[];
  onChangeAddOm?: (member: IEnrollMember) => void;
  onChangeRemoveOm?: (member: IEnrollMember) => void;
}

const RoleContent = ({ mode, member, addOm, onChangeAddOm, onChangeRemoveOm }: Props) => {
  const { mutate: mutateActive } = useSWRImmutable<IEnrollMember[]>(
    '/v1/api/admin/active-members',
    fetcher,
  );
  const { mutate: mutateOm } = useSWRImmutable<IEnrollMember[]>(
    '/v1/api/admin/old-members',
    fetcher,
  );

  const [role, setRole] = useState<IRole>();

  useEffect(() => {
    if (member.role === 'ADMIN') {
      setRole({ name: '운영진', color: '#477feb' });
    } else if (member.role === 'EDUCATION') {
      setRole({ name: '교육 팀원', color: '#259c2e' });
    } else if (member.role === 'MEMBER') {
      setRole({ name: '일반 부원', color: '#7b7b7b' });
    }
  }, [member]);

  const getMemberPositionStr = useCallback(() => {
    if (member.position === 'BE') {
      return '백엔드';
    } else if (member.position === 'FE') {
      return '프론트';
    } else if (member.position === 'DESIGN') {
      return '디자인';
    } else if (member.position === 'PM') {
      return '기획';
    }

    return '';
  }, [member]);

  const getMemberRole = useCallback((role: IRole) => {
    if (role.name === '운영진') {
      return 'ADMIN';
    } else if (role.name === '교육 팀원') {
      return 'EDUCATION';
    } else if (role.name === '일반 부원') {
      return 'MEMBER';
    }

    return '';
  }, []);

  const onChangeRole = useCallback(
    (selectedRole: IRole) => {
      api
        .patch('/v1/api/admin/active-members/role', {
          memberId: member.memberId,
          role: getMemberRole(selectedRole),
        })
        .then(() => {
          setRole(selectedRole);
          mutateActive();
        })
        .catch((err) => console.error(err));
    },
    [member],
  );

  const onClickAddOm = useCallback(() => {
    if (onChangeAddOm) onChangeAddOm(member);
  }, [addOm]);

  const onClickRemoveOm = useCallback(() => {
    if (onChangeRemoveOm) onChangeRemoveOm(member);
  }, [addOm]);

  const onClckRecoverMemberButton = useCallback(() => {
    api
      .patch('/v1/api/admin/old-members/role', {
        memberId: member.memberId,
      })
      .then(() => {
        mutateOm();
        mutateActive();
      })
      .catch((err) => console.error(err));
  }, [member]);

  return (
    <Box>
      <MemeberWrapper>
        {mode === 'active' &&
          (addOm?.includes(member) ? (
            <SleepAcitve onClick={onClickRemoveOm} />
          ) : (
            <SleepBlack onClick={onClickAddOm} />
          ))}
        <p>
          {member.generationNumber}기 {member.memberName} {getMemberPositionStr()}
        </p>
      </MemeberWrapper>
      {mode === 'active' ? (
        <RoleDropBox selectedRole={role} onChangeRole={onChangeRole} />
      ) : (
        <RecoveryMemberButton onClick={onClckRecoverMemberButton}>
          <p>부원으로 전환</p>
        </RecoveryMemberButton>
      )}
    </Box>
  );
};

export default RoleContent;

const MemeberWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  > svg {
    cursor: pointer;
  }

  > p {
    color: #202020;
    text-align: center;
    font-family: NanumSquareRound;
    font-size: 20px;
    font-weight: 800;
    text-transform: capitalize;
    margin: 8px 0;
  }
`;

const RecoveryMemberButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 152px;
  height: 40px;
  border: none;
  border-radius: 8px;
  background: #477feb;
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

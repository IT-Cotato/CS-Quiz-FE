import React, { useCallback, useState } from 'react';
import { Box } from '@pages/MyPage/RoleApproveLayout';
import { IApplyMember, IGeneration } from '@/typing/db';
import RequestDropBox from '@components/RequestDropBox';
import { styled } from 'styled-components';
import ApprovePopup from '@pages/MyPage/request/RequestPopup';

interface Props {
  mode: string;
  member: IApplyMember;
}

const RequestContent = ({ mode, member }: Props) => {
  const [generation, setGeneration] = useState<IGeneration>();
  const [position, setPosition] = useState('');
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState('');

  const onChangeGeneration = useCallback((selectedGeneration: IGeneration) => {
    setGeneration(selectedGeneration);
  }, []);

  const onChangePostion = useCallback((selectedPosition: string) => {
    setPosition(selectedPosition);
  }, []);

  const onClickApproveButton = useCallback(() => {
    setPopupMode('approve');
    setPopupOpen(true);
  }, []);

  const onClickRejectButton = useCallback(() => {
    setPopupMode('reject');
    setPopupOpen(true);
  }, []);

  const onClickReapproveButton = useCallback(() => {
    setPopupMode('reapprove');
    setPopupOpen(true);
  }, []);

  return (
    <>
      <Box>
        <p>{member.name}</p>
        <SettingContainer>
          <RequestDropBox
            mode="generation"
            width="80px"
            selectedGeneration={generation}
            onChangeGeneration={onChangeGeneration}
          />
          <RequestDropBox
            mode="position"
            width="120px"
            selectedPosition={position}
            onChangePosition={onChangePostion}
          />
          {mode === 'apply' ? (
            <>
              <RequestButton onClick={onClickApproveButton} background="#85C88A">
                <p>승인</p>
              </RequestButton>
              <RequestButton onClick={onClickRejectButton} background="#EB5353">
                <p>거절</p>
              </RequestButton>
            </>
          ) : (
            <RequestButton onClick={onClickReapproveButton} background="#85C88A">
              <p>재승인</p>
            </RequestButton>
          )}
        </SettingContainer>
      </Box>
      <ApprovePopup
        mode={popupMode}
        member={member}
        generation={generation}
        position={position}
        isOpen={popupOpen}
        setIsOpen={setPopupOpen}
      />
    </>
  );
};

export default RequestContent;

const SettingContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const RequestButton = styled.button<{ background: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 36px;
  border: none;
  border-radius: 10px;
  background: ${(props) => props.background};
  cursor: pointer;

  > p {
    color: #fff;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-weight: 700;
    text-transform: capitalize;
  }
`;

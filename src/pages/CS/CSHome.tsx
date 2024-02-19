import React, { useCallback, useState } from 'react';
import { styled } from 'styled-components';
import CSContent from '@pages/CS/CSContent';
import { ReactComponent as SettingIcon } from '@assets/setting_icon.svg';
import { ReactComponent as AddIcon } from '@assets/add_icon.svg';
import GenerationSelect from '@components/GenerationSelect';
import CSModal from '@pages/CS/CSModal';
import { IEducation, IGeneration } from '@/typing/db';
import api from '@/api/api';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { useNavigate } from 'react-router-dom';

const CSHome = () => {
  const { data: user, error } = useSWR('/v1/api/member/info', fetcher);

  const [educations, setEducations] = useState<undefined | IEducation[]>();
  const [isCSModalOpen, setIsCSModalOpen] = useState(false);
  const [modifyEducation, setModifyEducation] = useState<undefined | IEducation>();
  const [selectedGeneration, setSelectedGeneration] = useState<undefined | IGeneration>();

  const navigate = useNavigate();

  const onChangeGeneration = useCallback(
    (generation?: IGeneration) => {
      setSelectedGeneration(generation);

      if (generation) {
        api
          .get('/v1/api/education', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            params: {
              generationId: generation.generationId,
            },
          })
          .then((res) => setEducations(res.data))
          .catch((err) => console.error(err));
      }
    },
    [selectedGeneration],
  );

  const onClickAddButton = useCallback(() => {
    setModifyEducation(undefined);
    setIsCSModalOpen(true);
  }, []);

  const handleModifyButton = useCallback((session: IEducation) => {
    setModifyEducation(session);
    setIsCSModalOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsCSModalOpen(false);
  }, []);

  if (error || user?.role === 'GENERAL') {
    navigate('/');
  }

  return (
    <>
      <CSWrapper>
        <CSHeader>CS 문제풀이</CSHeader>
        <CSSetting>
          <GenerationSelect
            onChangeGeneration={onChangeGeneration}
            selectedGeneration={selectedGeneration}
          />
          {user?.role === 'ADMIN' && (
            <ButtonWrapper>
              <AddIcon onClick={onClickAddButton} />
            </ButtonWrapper>
          )}
        </CSSetting>
        <CSContentsContainer>
          {!educations ? (
            <CSReady>
              <SettingIcon />
              <p>CS 문제풀이 준비중입니다.</p>
            </CSReady>
          ) : (
            educations.map((education) => (
              <CSContent
                key={education.educationId}
                education={education}
                handleModifyButton={handleModifyButton}
                generation={selectedGeneration}
              />
            ))
          )}
        </CSContentsContainer>
      </CSWrapper>
      <CSModal isOpen={isCSModalOpen} onCloseModal={onCloseModal} educatoin={modifyEducation} />
    </>
  );
};

export default CSHome;

const CSWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

const CSHeader = styled.h1`
  margin: 144px 0 100px;

  color: #1d1d1d;
  font-family: NanumSquareRound;
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
`;

const CSSetting = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  margin-bottom: 12px;
`;

const ButtonWrapper = styled.div`
  > svg {
    margin-left: 8px;
    width: 32px;
    height: 32px;
    cursor: pointer;
  }
`;

const CSContentsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  align-content: start;
  width: 70%;
  height: 1000px;
  margin-top: 28px;

  @media only screen and (max-width: 957px) {
    justify-content: center;
  }
`;

const CSReady = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 160px;

  p {
    color: #9a9a9a;
    font-family: NanumSquareRound;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

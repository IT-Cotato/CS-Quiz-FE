import api from '@/api/api';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Tooltip } from 'react-tooltip';
import fetchUserData from '@utils/fetchUserData';

const CSStart = () => {
  const [educationStatus, setEducationStatus] = useState<'BEFORE' | 'ONGOING' | 'FINISHED'>(
    'BEFORE',
  );
  const { data: userData } = fetchUserData();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const generationNumber = params.get('generationNumber');
  const educationNumber = params.get('educationNumber');
  const educationId = params.get('educationId');
  const location = useLocation();
  const subject = location?.state?.subject;
  const search = location.search;

  /**
   * fetch education status ->
   * `BEFORE` : 아직 시작되지 않음
   * `ONGOING` : 진행중
   * `FINISHED` : 종료됨
   */
  const fetchEducationStatus = async () => {
    const response = await api
      .get(`/v1/api/education/status?educationId=${educationId}`)
      .then((res) => res.data.status);
    setEducationStatus(response);
  };

  useEffect(() => {
    fetchEducationStatus();
  }, []);

  if (userData?.role === null) {
    navigate('/signin');
  }

  /**
   *
   */
  const handleClickStartButton = () => {
    navigate('/cs/solving');
  };

  /**
   *
   */
  const handleClickUploadButton = () => {
    navigate('/cs/upload' + search, {
      state: {
        subject: subject,
      },
    });
  };

  /**
   *
   */
  const handleClickManageButton = () => {
    navigate('/cs/manage' + search);
  };

  /**
   *
   */
  const renderBackgroundFigures = () => {
    return (
      <>
        <Puzzle1 src="https://velog.velcdn.com/images/ea_st_ring/post/a4439877-e883-4352-b80f-6c630361d544/image.svg" />
        <Puzzle2 src="https://velog.velcdn.com/images/ea_st_ring/post/b26877af-3c64-4165-9562-4eda93180b5b/image.svg" />
        <Sphere src="https://velog.velcdn.com/images/ea_st_ring/post/41451983-1133-44d4-820a-a1170ce25397/image.svg" />
        <Sphere2 src="https://velog.velcdn.com/images/ea_st_ring/post/5bc443b9-cad4-4001-b05f-334e3429728c/image.svg" />
      </>
    );
  };

  /**
   *
   */
  const renderTitleBox = () => {
    return (
      <TitleBox>
        <h3>COTATO</h3>
        <h1>CS QUIZ</h1>
        <p>{`${generationNumber}기/ ${educationNumber}차 세션`}</p>
        <span>{subject}</span>
      </TitleBox>
    );
  };

  /**
   *
   */
  const renderButtons = () => {
    return (
      <NavBox>
        {educationStatus !== 'ONGOING' && (
          <Tooltip
            id="start_button_tooltip"
            style={{ position: 'absolute', zIndex: 1000 }}
            place="top"
            content="문제풀이 시작 전입니다."
          />
        )}
        <StartButton
          data-tooltip-id="start_button_tooltip"
          disabled={educationStatus !== 'ONGOING'}
          onClick={handleClickStartButton}
        >
          <p>문제풀이 시작하기</p>
        </StartButton>
        <OtherButton
          onClick={() => {
            window.location.href = '/cs';
          }}
        >
          <p>이전세션 선택하기</p>
        </OtherButton>
        {['ADMIN', 'EDUCATION'].includes(userData?.role as string) ? (
          <>
            {educationStatus === 'ONGOING' && (
              <Tooltip
                id="upload_button_tooltip"
                style={{ position: 'absolute', zIndex: 1000 }}
                place="top"
                content="현재 문제풀이가 진행중입니다."
              />
            )}
            <UploadButton
              data-tooltip-id="upload_button_tooltip"
              disabled={educationStatus === 'ONGOING'}
              onClick={handleClickUploadButton}
            >
              <p>문제 업로드</p>
            </UploadButton>

            <ManageButton onClick={handleClickManageButton}>
              <p>문제풀이 관리</p>
            </ManageButton>
          </>
        ) : null}
      </NavBox>
    );
  };

  return (
    <Background>
      {renderBackgroundFigures()}
      {renderTitleBox()}
      {renderButtons()}
    </Background>
  );
};

const Background = styled.div`
  background: rgb(191, 209, 253);
  background: linear-gradient(180deg, rgba(191, 209, 253, 0.5) 50%, rgba(255, 220, 205, 1) 100%);
  width: 100%;
  min-height: 100vh !important;
  max-height: 110vh;
  height: 180vh;
  box-sizing: border-box;
  padding: 70px 100px 0px 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    padding: 30px 0px 0 0px;
  }
`;

const Puzzle1 = styled.img`
  position: absolute;
  width: 400px;
  height: 400px;
  top: 0px;
  left: 0px;
  z-index: 1;
  animation: float 2s ease-in-out infinite;
  @keyframes float {
    0% {
      transform: perspective(800px) translateY(0px);
    }
    50% {
      transform: perspective(800px) translateY(20px);
    }
    100% {
      transform: perspective(800px) translateY(0px);
    }
  }
`;

const Puzzle2 = styled.img`
  position: absolute;
  width: 500px;
  height: 500px;
  top: 500px;
  right: 50px;
  z-index: 1;
  @keyframes rotate {
    0% {
      transform: perspective(800px) rotateZ(0deg) translateY(0px);
    }
    50% {
      transform: perspective(800px) rotateX(5deg) rotateY(10deg) rotateZ(10deg) translateY(-80px);
    }
    100% {
      transform: perspective(800px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateY(0px);
    }
  }
  animation: rotate 10s linear infinite;
`;

const Sphere = styled.img`
  position: absolute;
  width: 300px;
  height: 300px;
  top: 100px;
  right: 40px;
  z-index: 1;
  animation: rotate 6s ease-in-out infinite;
  @keyframes rotate {
    0% {
      transform: perspective(800px) rotateZ(0deg) translateY(0px);
    }
    50% {
      transform: perspective(800px) rotateY(10deg) rotateZ(-15deg) translateY(40px);
    }
    100% {
      transform: perspective(800px) rotateZ(0deg) translateY(0px);
    }
  }
`;

const Sphere2 = styled.img`
  position: absolute;
  width: 450px;
  height: 450px;
  top: 500px;
  left: -150px;
  z-index: 1;
  animation: rotate 6s ease-in-out infinite;
  @keyframes rotate {
    0% {
      transform: perspective(800px) rotateZ(0deg) translateY(0px);
    }
    50% {
      transform: perspective(800px) rotateY(10deg) rotateZ(-15deg) translateY(40px);
    }
    100% {
      transform: perspective(800px) rotateZ(0deg) translateY(0px);
    }
  }
`;

const TitleBox = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  color: #fff;
  z-index: 10;
  h3 {
    color: #313131;
    text-align: center;
    font-family: 'Noto Sans';
    font-size: 38px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    letter-spacing: 4.56px;
    margin-bottom: 0;
  }
  h1 {
    color: #111;
    -webkit-text-stroke-width: 0.5;
    -webkit-text-stroke-color: #000;
    font-family: Pretendard;
    font-size: 72px;
    font-weight: 600;
    margin: 8px 0 0 0;
  }
  p {
    color: #111;
    font-family: Inter;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 4px;
  }
  span {
    color: #111;
    font-family: Inter;
    font-size: 24px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
  margin-bottom: 36px;

  @media screen and (max-width: 768px) {
    h1 {
      font-size: 48px;
    }
    h3 {
      font-size: 20px;
    }
  }
`;

const NavBox = styled.div`
  width: fit-content;
  height: 300px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 15px;
  background-color: transparent;
  padding: 0px 40px;
  margin-bottom: 24px;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: NanumSquareRound;
    font-size: 18px;
    width: 410px;
    height: 56px;
    border-radius: 20px;
    border: none;
    transition: 0.2s;
    z-index: 10;
  }

  button {
    margin-top: 24px;
  }

  button:hover {
    cursor: pointer;
    transform: scale(1.01);
  }

  @media screen and (max-width: 768px) {
    padding: 20px 0;
  }
`;

const StartButton = styled.button`
  color: #fdfdfd;
  background-color: black;
  font-family: Inter;
  font-size: 32px;
  font-weight: 500;
  border-radius: 20px;
  img {
    width: 26px;
  }
  &:disabled {
    background: #8a8a8a;
    color: #e0e0e0;
    border: #e4e4e4 !important;
  }
`;

const OtherButton = styled.button`
  border-radius: 20px;
  background: #dfdfdf;
  color: #000;
`;

const UploadButton = styled.button`
  color: #000;
  border-radius: 20px;
  border: 4px solid #7da1f4;
  background: #fff;
  font-size: 32px;
  border-radius: 20px;
  border: 2px solid #7da1f4 !important;
  background: #fff;
  height: 54px !important;
  &:disabled {
    background: #fff;
    color: #e0e0e0;
    border: #e4e4e4 !important;
  }
`;

const ManageButton = styled.button`
  color: #000;
  border-radius: 20px;
  border: 4px solid #7da1f4;
  background: #fff;
  font-size: 32px;
  border-radius: 20px;
  border: 2px solid #7da1f4 !important;
  background: #fff;
  height: 54px !important;
`;

export default CSStart;

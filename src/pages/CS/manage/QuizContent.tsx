import React, { useCallback, useState } from 'react';
import { css, styled } from 'styled-components';
import ToggleButton from '@components/ToggleButton';
import { ReactComponent as ArrowBack } from '@assets/arrow_back.svg';
import { useNavigate } from 'react-router-dom';
import { IQuizAdmin } from '@/typing/db';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import api from '@/api/api';
import WaitPopup from '@pages/CS/manage/WaitPopup';
import { ToastContainer, toast } from 'react-toastify';

interface Props {
  quiz: IQuizAdmin;
  educationId: string | null;
  educationStatus?: string;
  quizStatus: string;
  quizNineStart: string;
}

const QuizContent = ({ quiz, educationId, educationStatus, quizStatus, quizNineStart }: Props) => {
  const { mutate } = useSWR(`/v1/api/quiz/cs-admin/all?educationId=${educationId}`, fetcher);

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const navigate = useNavigate();

  const onClickQuestionButton = useCallback(() => {
    navigate(`quizscorer?quizId=${quiz.quizId}`);
  }, [quiz]);

  const onClickApproach = useCallback(() => {
    if (educationStatus === 'CLOSED') {
      toast.error('교육을 시작해주세요.');
      return;
    }

    if (quizNineStart === 'QUIZ_ON') {
      toast.error('9번 문제풀이를 종료해주시요.');
      return;
    }

    let path = '';
    if (quiz.status === 'QUIZ_OFF') {
      path = '/v1/api/socket/access';
    } else if (quiz.status === 'QUIZ_ON') {
      path = '/v1/api/socket/deny';
    }

    api
      .patch(path, { quizId: quiz.quizId })
      .then(() => {
        mutate();
      })
      .catch((err) => {
        console.error(err);
        mutate();
      });
  }, [quiz, educationStatus, quizNineStart]);

  const onClickQuizStart = useCallback(() => {
    if (educationStatus === 'CLOSED') {
      toast.error('교육을 시작해주세요.');
      return;
    }

    if (quizStatus === 'QUIZ_OFF') {
      toast.error('문제 접근을 허용해주세요.');
      return;
    }

    let path = '';
    if (quiz.start === 'QUIZ_OFF') {
      path = '/v1/api/socket/start';
      setIsPopupOpen(true);
    } else if (quiz.start === 'QUIZ_ON') {
      path = '/v1/api/socket/stop';
    }

    api
      .patch(path, { quizId: quiz.quizId })
      .then(() => {
        setIsPopupOpen(false);
        mutate();
      })
      .catch((err) => {
        console.error(err);
        setIsPopupOpen(false);
        mutate();
      });
  }, [quiz.start, educationStatus, quizStatus]);

  return (
    <>
      <ContentBox>
        <TitleWrapper>
          <QuizNumber>문제 {quiz.quizNumber}</QuizNumber>
          <QuestionWrapper>
            <p>{quiz.question}</p>
            <FrontButton width={20} height={20} onClick={onClickQuestionButton} />
          </QuestionWrapper>
        </TitleWrapper>
        <ToggleWrapper>
          <p>접근</p>
          <ToggleButton toggled={quiz.status === 'QUIZ_ON'} onClick={onClickApproach} />
        </ToggleWrapper>
        <ToggleWrapper>
          <p>문제풀이 시작</p>
          <ToggleButton toggled={quiz.start === 'QUIZ_ON'} onClick={onClickQuizStart} />
        </ToggleWrapper>
      </ContentBox>
      <WaitPopup isOpen={isPopupOpen} />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
};

export default QuizContent;

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 180px;
  background: #fff;
  border-radius: 8px;
  margin: 16px 0 28px;
`;

const fontStyle = css`
  color: #000;
  font-family: Inter;
  font-size: 16px;
  font-weight: 500;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 95%;
  height: 36%;
`;

const QuizNumber = styled.p`
  width: 100px;
  padding-left: 16px;
  ${fontStyle}
  color: #477feb;
  font-size: 20px;
`;

const QuestionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 100px);
  height: 100%;

  > p {
    width: 90%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${fontStyle}
    font-size: 20px;
  }
`;

const FrontButton = styled(ArrowBack)`
  transform: scaleX(-1);
  margin-right: 24px;
  cursor: pointer;
`;

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  height: 33%;
  border-top: 1px solid rgba(0, 0, 0, 0.3);
  box-sizing: content-box;

  > p {
    margin-left: 100px;
    ${fontStyle}
  }
`;

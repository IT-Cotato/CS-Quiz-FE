import React, { useCallback, useState } from 'react';
import { IQuizContent } from '@pages/CS/CSManage/CSManage';
import { css, styled } from 'styled-components';
import ToggleButton from '@components/ToggleButton';
import { ReactComponent as ArrowBack } from '@assets/arrow_back.svg';

interface Props {
  quiz: IQuizContent;
}

const QuizContent = ({ quiz }: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isApproach, setIsApproach] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isQuizStart, setQuizStart] = useState(false);

  const onClickQuestionButton = useCallback(() => {
    console.log('question click');
  }, []);

  const onClickApproach = useCallback(() => {
    console.log('quiz approach');
  }, []);

  const onClickQuizStart = useCallback(() => {
    console.log('quiz start');
  }, []);

  return (
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
        <ToggleButton toggled={isApproach} onClick={onClickApproach} />
      </ToggleWrapper>
      <ToggleWrapper>
        <p>문제풀이 시작</p>
        <ToggleButton toggled={isQuizStart} onClick={onClickQuizStart} />
      </ToggleWrapper>
    </ContentBox>
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
  margin: 32px 0;
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
  width: 100px;
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

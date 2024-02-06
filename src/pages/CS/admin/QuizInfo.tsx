import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Multiples, ShortQuizzes } from '@/typing/db';

type QuizType = Multiples | ShortQuizzes;

type Props = {
  quiz: QuizType[];
  setQuiz: React.Dispatch<React.SetStateAction<QuizType[]>>;
  selected: number;
};

const QuizInfo = ({ quiz, setQuiz, selected }: Props) => {
  // 타입 가드
  const isMultiples = (quiz: Multiples | ShortQuizzes): quiz is Multiples => {
    return (quiz as Multiples)?.choices[0].isAnswer !== undefined;
  };
  /**
   * 객관식, 주관식 버튼 클릭 시, quiz_type 변경함
   */
  const onClickType = useCallback(
    (type: string) => {
      if (type === 'choice' && isMultiples(quiz[selected])) return;
      if (type === 'short' && !isMultiples(quiz[selected])) return;
      setQuiz((prev) => {
        const newPrev = [...prev];
        const copySelected = newPrev[selected];
        if (isMultiples(copySelected)) {
          // changeType 함수를 통해 quiz_type을 short로 변경
          newPrev[selected] = changeType(
            type,
            copySelected.number,
            copySelected.image,
            copySelected.previewUrl || null,
          );
        } else {
          newPrev[selected] = changeType(
            type,
            copySelected.number,
            copySelected.image,
            copySelected.previewUrl || null,
          );
        }
        return [...newPrev];
      });
    },
    [selected, quiz],
  );

  /**
   * quiz_type을 안전하게 변경하기 위한 함수
   */
  const changeType = useCallback(
    (type: string, number: number, image: File | null, previewUrl: string | null) => {
      // 들어온 type이 choice일 경우, choice를 제외한 나머지를 복사
      if (type === 'choice') {
        return {
          number,
          question: '제목',
          choices: [
            {
              number: 1,
              content: '',
              isAnswer: 'ANSWER' as const,
            },
            {
              number: 2,
              content: '',
              isAnswer: 'NO_ANSWER' as const,
            },
            {
              number: 3,
              content: '',
              isAnswer: 'NO_ANSWER' as const,
            },
            {
              number: 4,
              content: '',
              isAnswer: 'NO_ANSWER' as const,
            },
          ],
          image: image,
          previewUrl: previewUrl || null,
        } as Multiples;
      } else {
        return {
          number,
          question: '제목',
          image: image,
          previewUrl: previewUrl || null,
          choices: [{ answer: '' }],
        } as ShortQuizzes;
      }
    },
    [selected, quiz],
  );

  const checkUpload = useCallback(() => {
    console.log(quiz);
    // question이 있는지 검사
    // 객관식 choice에 ANSWER가 있는지, content가 전부 있는지 검사
    // 주관식 choice에 answer가 있는지 검사
    quiz.some((quiz) => {
      if (quiz.question === '') {
        window.alert(`${quiz.number}번 문제를 입력해주세요.`);
        return true;
      }
      if (isMultiples(quiz)) {
        quiz.choices.some((choice) => {
          if (choice.content === '') {
            window.alert(`${quiz.number}번 문제 ${choice.number}번 보기를 입력해주세요.`);
            return true;
          }
        });
        if (quiz.choices.filter((choice) => choice.isAnswer === 'ANSWER').length === 0) {
          window.alert(`${quiz.number}번 문제 정답을 선택해주세요.`);
          return true;
        }
      } else {
        quiz.choices.some((choice) => {
          if (choice.answer === '') {
            window.alert(`${quiz.number}번 문제 정답을 입력해주세요.`);
            return true;
          }
        });
      }
    });
  }, [quiz]);

  return (
    <Wrapper>
      <DesktopSection>
        <p>문제 형식</p>
        <DeskTopOption>
          <button
            id="choice"
            style={
              isMultiples(quiz[selected])
                ? { background: '#C1C1C1', color: 'white' }
                : { background: '#fff', color: 'black' }
            }
            onClick={() => {
              onClickType('choice');
            }}
          >
            객관식
          </button>
          <button
            id="short"
            style={
              !isMultiples(quiz[selected])
                ? { background: '#C1C1C1', color: 'white' }
                : { background: '#fff', color: 'black' }
            }
            onClick={() => {
              onClickType('short');
            }}
          >
            주관식
          </button>
        </DeskTopOption>
        <p>정답</p>
        <AnswerBox>
          {isMultiples(quiz[selected])
            ? (quiz[selected] as Multiples).choices
                .filter((choice) => choice.isAnswer === 'ANSWER')
                .map((choice, index) => (
                  <div key={index}>
                    <img src="https://velog.velcdn.com/images/ea_st_ring/post/555ec60e-4c31-48e7-80d1-ec3cb60350d2/image.svg" />
                    {choice.number}번 : {choice.content}
                  </div>
                ))
            : (quiz[selected] as ShortQuizzes).choices.map((choice, index) => (
                <div key={index}>
                  <img src="https://velog.velcdn.com/images/ea_st_ring/post/555ec60e-4c31-48e7-80d1-ec3cb60350d2/image.svg" />
                  {choice.answer}
                </div>
              ))}
        </AnswerBox>
      </DesktopSection>
      <MobileSection>
        <MobileOption>
          <select name="type" id="type" onChange={(e) => onClickType(e.target.value)}>
            <option value="choice">객관식</option>
            <option value="short">주관식</option>
          </select>
        </MobileOption>
        <NavBox>
          <SaveButton onClick={checkUpload}>저장</SaveButton>
          <ExitButton>나가기</ExitButton>
        </NavBox>
      </MobileSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: rightbox;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  p {
    width: 100%;
    align-self: flex-start;
  }
  div {
    display: flex;
    margin-bottom: 24px;
    button {
      width: 100px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 5px;
      border: 2px solid #c1c1c1;
      background: #fff;
      cursor: pointer;
    }
    button + button {
      margin-left: 12px;
    }
  }
  @media screen and (max-width: 768px) {
    display: flex;
    width: 100%;
    background: #f4f4f4;
    padding: 20px;
  }
`;

const DesktopSection = styled.div`
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    display: none !important;
  }
`;

const DeskTopOption = styled.div`
  div {
    display: flex;
    margin-bottom: 24px;
    button {
      width: 100px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 5px;
      border: 2px solid #c1c1c1;
      background: #fff;
      cursor: pointer;
    }
    button + button {
      margin-left: 12px;
    }
  }
`;

const AnswerBox = styled.div`
  div {
    width: 216px;
    height: 120px;
    flex-shrink: 0;
    border-radius: 5px;
    border: 2px solid #cfcfcf;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 8px;
    margin-bottom: 0px;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
  flex-direction: column;
  div + div {
    margin-top: 8px;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const MobileOption = styled.div`
  display: none;
  select {
    display: none;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: flex-end;
    select {
      display: block;
      width: 100px;
      height: 40px;
      border-radius: 5px;
      border: none;
      margin-bottom: 24px;
      text-align: center;
      background: #fff;
      cursor: pointer;
      box-shadow: 4px 4px 5px -2px rgba(212, 212, 212, 0.75);
      -webkit-box-shadow: 4px 4px 5px -2px rgba(212, 212, 212, 0.75);
      -moz-box-shadow: 4px 4px 5px -2px rgba(212, 212, 212, 0.75);
      &:focus {
        outline: none;
      }
    }
  }
`;

const NavBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  button {
    width: 100px;
    height: 40px;
    border-radius: 5px;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    button {
      width: 140px !important;
    }
  }
`;

const SaveButton = styled.button`
  border: none !important;
  background-color: #477feb !important;
  color: white;
  cursor: pointer;
`;

const ExitButton = styled.button`
  background: #ededed !important;
  border: none !important;
  @media screen and (max-width: 768px) {
    margin-left: 0 !important;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 4px 4px 5px -2px rgba(212, 212, 212, 0.75);
    -webkit-box-shadow: 4px 4px 5px -2px rgba(212, 212, 212, 0.75);
    -moz-box-shadow: 4px 4px 5px -2px rgba(212, 212, 212, 0.75);
  }
`;

export default QuizInfo;

import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ShortProps } from '@/typing/db';

type Props = {
  quiz: ShortProps[];
  setQuiz: React.Dispatch<React.SetStateAction<ShortProps[]>>;
  selected: number;
};

const QuizInfo = ({ quiz, setQuiz, selected }: Props) => {
  /**
   * 객관식, 주관식 버튼 클릭 시, quiz_type 변경함
   */
  const onClickType = useCallback(
    (type: string) => {
      if (quiz[selected - 1].quiz_type === type) return;
      setQuiz((prev) => {
        const newPrev = [...prev];
        const copySelected = newPrev[selected - 1];
        if (type === 'short') {
          // changeType 함수를 통해 quiz_type을 short로 변경
          newPrev[selected - 1] = changeType(
            type,
            copySelected.quiz_id,
            copySelected.quiz_image_file,
            copySelected.quiz_preview_url || null,
          );
        } else {
          newPrev[selected - 1] = changeType(
            type,
            copySelected.quiz_id,
            copySelected.quiz_image_file,
            copySelected.quiz_preview_url || null,
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
    (type: string, id: number, image: File | null, preview_url: string | null) => {
      // 들어온 type이 choice일 경우, choice를 제외한 나머지를 복사
      if (type === 'choice') {
        return {
          quiz_id: id,
          quiz_title: '제목',
          quiz_content: '내용',
          quiz_type: 'choice',
          quiz_answer: [
            {
              choice_num: 1,
              choice_content: '',
            },
          ],
          choices: [
            {
              choice_id: 1,
              choice_content: '',
            },
            {
              choice_id: 2,
              choice_content: '',
            },
            {
              choice_id: 3,
              choice_content: '',
            },
            {
              choice_id: 4,
              choice_content: '',
            },
          ],
          quiz_image_file: image,
          quiz_preview_url: preview_url || null,
        };
      } else {
        return {
          quiz_id: id,
          quiz_title: '제목',
          quiz_content: '내용',
          quiz_type: 'short',
          quiz_answer: [
            {
              choice_content: '',
            },
          ],
          quiz_image_file: image,
          quiz_preview_url: preview_url || null,
        };
      }
    },
    [selected, quiz],
  );

  return (
    <Wrapper>
      <DesktopSection>
        <p>문제 형식</p>
        <DeskTopOption>
          <button
            id="choice"
            style={
              quiz[selected - 1]?.quiz_type === 'choice'
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
              quiz[selected - 1]?.quiz_type === 'short'
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
          {quiz[selected - 1].quiz_type === 'choice' ? (
            <div>
              <img src="https://velog.velcdn.com/images/ea_st_ring/post/555ec60e-4c31-48e7-80d1-ec3cb60350d2/image.svg" />
              {quiz[selected - 1].quiz_answer[0].choice_content}
            </div>
          ) : (
            (quiz[selected - 1] as ShortProps).quiz_answer.map(
              (answer: { choice_content: string }, index: number) => (
                <div key={index}>
                  <img src="https://velog.velcdn.com/images/ea_st_ring/post/555ec60e-4c31-48e7-80d1-ec3cb60350d2/image.svg" />
                  {answer.choice_content}
                </div>
              ),
            )
          )}
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
          <SaveButton>저장</SaveButton>
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

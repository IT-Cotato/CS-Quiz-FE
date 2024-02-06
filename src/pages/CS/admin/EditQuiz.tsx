import React, { ChangeEvent, DragEvent, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Multiples, ShortQuizzes } from '@/typing/db';

type Props = {
  quiz: (Multiples | ShortQuizzes)[];
  selected: number;
  setQuiz: React.Dispatch<React.SetStateAction<(Multiples | ShortQuizzes)[]>>;
};

const EditQuiz = ({ quiz, selected, setQuiz }: Props) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const choices = 4;
  const addShortAnswer = useCallback(() => {
    setQuiz((prev) => {
      const newPrev = [...prev];
      const copySelected = newPrev[selected];
      if (!isMultiples(copySelected)) {
        // 주관식 quiz_answer를 하나 추가
        copySelected.choices.push({
          answer: '',
        });
      }
      return [...newPrev];
    });
  }, [selected, quiz]);

  const onDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      // 여러 장을 업로드할 시에는 불가능하다고 알림
      if (e.dataTransfer.items) {
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          if (e.dataTransfer.items[i].kind === 'file') {
            const file = e.dataTransfer.items[i].getAsFile();
            if (file) {
              const newPrev = [...quiz];
              newPrev[selected].image = file;
              newPrev[selected].previewUrl = URL.createObjectURL(file);
              setQuiz(newPrev);
            }
          }
        }
      }
    },
    [selected, quiz],
  );

  /**
   * input checkBox 상태 관리를 위한 함수
   */
  const checkOnlyOne = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      // choices 배열에 있으면 추가, 없으면 삭제
      setQuiz((prev) => {
        const next = [...prev];
        const idx = Number(e.target.id) - 1;
        const prevAnswer = (next[selected] as Multiples).choices[idx].isAnswer;
        if (prevAnswer === 'NO_ANSWER') {
          (next[selected] as Multiples).choices[idx].isAnswer = 'ANSWER';
        } else {
          (next[selected] as Multiples).choices[idx].isAnswer = 'NO_ANSWER';
        }
        return [...next];
      });
    },
    [selected, quiz, choices],
  );

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.items.length > 1 || e.dataTransfer.files.length > 1) {
      window.alert('이미지는 한 장만 업로드 가능합니다.');
    }
  }, []);

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPrev = [...quiz];
      newPrev[selected].image = e.target.files[0];
      newPrev[selected].previewUrl = URL.createObjectURL(e.target.files[0]);
      setQuiz(newPrev);
      console.log(newPrev);
    }
  }, []);

  // 타입 가드
  const isMultiples = (quiz: Multiples | ShortQuizzes): quiz is Multiples => {
    return (quiz as Multiples).choices[0].isAnswer !== undefined;
  };

  const onChangeTitle = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setQuiz((prev) => {
        const newPrev = [...prev];
        newPrev[selected].question = e.target.value;
        return [...newPrev];
      });
    },
    [selected],
  );

  /**
   * 객관식 input 상태 관리 함수
   */
  const onChangeChoices = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>, id: string) => {
      setQuiz((prev) => {
        const newPrev = [...prev];
        const copySelected = newPrev[selected];
        if (isMultiples(copySelected)) {
          copySelected.choices[Number(id) - 1].content = e.target.value;
          //   if (copySelected.quiz_answer[0].choice_num === Number(id)) {
          //     copySelected.quiz_answer[0].choice_content = e.target.value;
          //   }
          // } else {
          //   copySelected.quiz_answer[0].choice_content = e.target.value;
          // }
        }
        return [...newPrev];
      });
    },
    [selected],
  );

  const onChangeShorts = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string) => {
      setQuiz((prev) => {
        const newPrev = [...prev];
        const copySelected = newPrev[selected];
        if (!isMultiples(copySelected)) {
          copySelected.choices[Number(id) - 1].answer = e.target.value;
        }
        return [...newPrev];
      });
    },
    [selected],
  );

  /**
   * 주관식 답안 삭제 함수
   */
  const deleteShortAnswer = useCallback(
    (id: number) => {
      if (quiz[selected].choices.length === 1) {
        window.alert('주관식 답안은 최소 1개 이상이어야 합니다.');
        return;
      }
      setQuiz((prev) => {
        const newPrev = [...prev];
        const copySelected = newPrev[selected];
        if (!isMultiples(copySelected)) {
          copySelected.choices.splice(id, 1);
        }
        return [...newPrev];
      });
    },
    [selected],
  );

  // 컴포넌트 언마운트 시 preview_url을 제거
  useEffect(() => {
    return () => {
      quiz.forEach((quiz) => {
        if (quiz.previewUrl) {
          URL.revokeObjectURL(quiz.previewUrl);
        }
      });
    };
  }, []);
  return (
    <Wrapper>
      <>
        <MakeQuestionDiv>
          <textarea
            onChange={onChangeTitle}
            value={quiz[selected]?.question || ''}
            placeholder="문제 제목을 입력해주세요."
          />
        </MakeQuestionDiv>
        <UploadDiv
          onDrop={onDrop}
          onDragOver={onDragOver}
          image={quiz[selected]?.previewUrl || null}
          onClick={() => {
            // 클릭 시에도 업로드되도록 처리하기
            // fileInputRef.current?.click();
          }}
        >
          {quiz[selected].previewUrl ? null : (
            <>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <img src="https://velog.velcdn.com/images/ea_st_ring/post/5bc62320-dd59-497f-9741-79945c54de6a/image.svg" />
              <p>컴퓨터에서 이미지를 드래그 및 가져오기</p>
            </>
          )}
        </UploadDiv>
        {isMultiples(quiz[selected]) ? (
          <ChoiceDiv>
            {Array.from(Array(choices)).map((_, index) => (
              <Choice key={index}>
                <textarea
                  placeholder={`답안 ${index + 1}`}
                  onChange={(e) => {
                    onChangeChoices(e, `${index + 1}`);
                  }}
                  value={
                    isMultiples(quiz[selected])
                      ? (quiz[selected] as Multiples).choices[index]?.content
                      : ''
                  }
                  id={`${index + 1}`}
                />
                <input
                  type="checkbox"
                  id={`${index + 1}`}
                  onChange={(e) => {
                    checkOnlyOne(e);
                  }}
                  checked={(quiz[selected] as Multiples).choices[index]?.isAnswer === 'ANSWER'}
                />
              </Choice>
            ))}
          </ChoiceDiv>
        ) : (
          <Short>
            {(quiz[selected] as ShortQuizzes).choices.map((choice, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder={`답안 ${index + 1}`}
                  onChange={(e) => {
                    onChangeShorts(e, `${index + 1}`);
                  }}
                  value={choice.answer}
                />
                <img
                  onClick={() => {
                    deleteShortAnswer(index);
                  }}
                  src="https://velog.velcdn.com/images/ea_st_ring/post/d5f4409f-39c9-43bd-bb35-c6d4fa8774be/image.svg"
                />
              </div>
            ))}
            <button
              onClick={() => {
                addShortAnswer();
              }}
            >
              <img src="https://velog.velcdn.com/images/ea_st_ring/post/02c4b979-5f46-4a3f-a319-1d9b10796b11/image.svg" />
              답안 추가
            </button>
          </Short>
        )}
      </>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  grid-area: centerbox;
  width: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: #f4f4f4;
  @media screen and (max-width: 768px) {
    justify-content: center;
    align-items: center;
    width: 100vw;
    padding: 20px;
  }
`;

const MakeQuestionDiv = styled.div`
  min-width: 578px;
  height: 95px;
  margin-top: 16px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  textarea {
    width: 100%;
    height: 100%;
    color: #000;
    font-family: NanumSquareRound;
    font-size: 16px;
    padding: 8px;
    font-style: normal;
    font-weight: 400;
    outline: none;
    border: none;
    resize: none;
    &::placeholder {
      text-align: center;
      vertical-align: middle;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const UploadDiv = styled.div<any>`
  width: 346px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-shrink: 0;
  border-radius: 5px;
  border: ${(props) => (props.image ? 'none' : '3px dashed #6f99f2')};
  background-image: ${(props) =>
    props.image ? `url(${props.image})` : `rgba(255, 255, 255, 0.2)`};
  background-size: 100%;
  background-position: center;
  margin-top: 12px;
  p {
    margin-top: 24px;
    color: #757575;
    font-family: Inter;
    font-size: 14px;
    font-weight: 400;
  }
  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    -user-drag: none;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 350px;
    background-color: white;
    border: none;
  }
`;

const ChoiceDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 8px;
  width: 100%;
  margin-top: 24px;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
  }
`;

const Choice = styled.div`
  width: 100%;
  height: 160px;
  border-radius: 5px;
  padding: 10px 0px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  textarea {
    width: 80%;
    height: 100%;
    text-align: start;
    resize: none;
    border-radius: 5px;
    border: none;
    background: #fff;
    padding: 0 16px;
    font-family: 'NanumSquareRound';
    font-size: 16px;
    font-weight: 400;
    color: #757575;
  }
  textarea:focus {
    outline: none;
  }
  input:last-child {
    width: 20%;
    height: 24px;
    border-radius: 5px;
    border: none;
    background: #fff;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 400;
    margin: 0;
    color: #757575;
  }

  input:focus {
    outline: none;
  }
  @media screen and (max-width: 768px) {
    margin: auto;
    width: 100%;
    height: 100px;
  }
`;

const Short = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
  div {
    display: flex;
    border-radius: 5px;
    background: #fff;
    box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
    width: 534px;
    height: 57px;
    justify-content: space-between;
    align-items: center;
  }
  img {
    width: 32px;
    height: 32px;
    margin-right: 16px;
    cursor: pointer;
  }
  input {
    width: 450px;
    height: 100%;
    border: none;
    padding: 0 24px;
  }
  input:focus {
    outline: none;
  }
  div + div {
    margin-top: 16px;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 534px;
    height: 57px;
    border-radius: 5px;
    background: #fff;
    box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
    border: none;
    margin-top: 16px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      background: #f4f4f4;
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 4px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    div {
      width: 100%;
    }
    button {
      width: 100%;
    }
  }
`;

export default EditQuiz;

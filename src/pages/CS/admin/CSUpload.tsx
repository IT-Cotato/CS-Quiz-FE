import React, { ChangeEvent, DragEvent, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ArrowBack } from '@/assets/arrow_back.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// TODO: 컴포넌트 분리

type Item = {
  isselected?: string;
};

interface ChoiceProps {
  quiz_id: number;
  quiz_title: string;
  quiz_content: string;
  quiz_type: string;
  quiz_answer: {
    choice_num: number;
    choice_content: string;
  }[];
  choices: {
    choice_id: number;
    choice_content: string;
  }[];
  quiz_image_file: File | null;
  quiz_preview_url: string | null;
}

interface ShortProps {
  quiz_id: number;
  quiz_title: string;
  quiz_content: string;
  quiz_type: string;
  quiz_answer: {
    choice_content: string;
  }[];
  quiz_image_file: File | null;
  quiz_preview_url: string | null;
}

type QuizType = ChoiceProps | ShortProps;

const CSUpload = () => {
  const location = useLocation();
  const search = location.search;
  const generation = search.split('&')[0].split('=')[1];
  const week = search.split('&')[1].split('=')[1];

  // 전체 슬라이드를 담기 위한 state
  const [item, setItem] = useState<QuizType[]>([
    {
      quiz_id: 1,
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
      quiz_image_file: null,
      quiz_preview_url: '',
    },
  ]);

  // 현재 선택된 슬라이드를 나타내기 위한 state
  const [selected, setSelected] = useState(0); // selected가 0인 경우에는 주제, 1 이상인 경우에는 슬라이드의 문제 번호를 나타냄

  const addItem = useCallback(() => {
    setItem((prev) => [
      ...prev,
      {
        quiz_id: prev.length + 1,
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
        quiz_image_file: null,
        quiz_preview_url: '',
      },
    ]);
  }, [selected]);

  const choices = 4;

  /**
   * input checkBox 상태 관리를 위한 함수
   */
  const checkOnlyOne = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setItem((prev) => {
          const newPrev = [...prev];
          const copySelected = newPrev[selected - 1];
          if (isChoiceProps(copySelected)) {
            copySelected.quiz_answer[0].choice_num = Number(e.target.id);
            copySelected.quiz_answer[0].choice_content =
              copySelected.choices[copySelected.quiz_answer[0].choice_num - 1].choice_content;
          }
          return [...newPrev];
        });
      }
    },
    [selected, item, choices],
  );

  const deleteItem = useCallback(() => {
    const result = window.confirm('정말 삭제하시겠습니까?');
    if (!result) return;

    setItem((prev) => {
      // selected인 item을 삭제 후, id를 재정렬
      return prev
        .filter((item) => item.quiz_id !== selected)
        .map((item, index) => ({ ...item, quiz_id: index + 1 }));
    });
  }, [selected]);

  /**
   * 객관식, 주관식 버튼 클릭 시, quiz_type 변경
   */
  const onClickType = useCallback(
    (type: string) => {
      if (item[selected - 1].quiz_type === type) return;
      setItem((prev) => {
        const newPrev = [...prev];
        const copySelected = newPrev[selected - 1];
        if (type === 'short') {
          // changeType 함수를 통해 quiz_type을 short로 변경
          newPrev[selected - 1] = changeType(
            type,
            copySelected.quiz_id,
            copySelected.quiz_image_file,
            copySelected.quiz_preview_url,
          );
        } else {
          newPrev[selected - 1] = changeType(
            type,
            copySelected.quiz_id,
            copySelected.quiz_image_file,
            copySelected.quiz_preview_url,
          );
        }
        console.log(copySelected);
        return [...newPrev];
      });
    },
    [selected, item],
  );

  /**
   * quiz_type을 안전하게 변경하기 위한 함수
   */
  const changeType = useCallback(
    (type: string, id: number, image: File | null, preview_url: string | null) => {
      // 들어온 type이 choice일 경우, choice를 제외한 나머지를 복사
      console.log(type);
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
          quiz_preview_url: preview_url,
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
          quiz_preview_url: preview_url,
        };
      }
    },
    [selected, item],
  );

  const addShortAnswer = useCallback(() => {
    setItem((prev) => {
      const newPrev = [...prev];
      const copySelected = newPrev[selected - 1];
      if (!isChoiceProps(copySelected)) {
        // quiz_answer를 하나 추가
        copySelected.quiz_answer.push({
          choice_content: '',
        });
      }
      return [...newPrev];
    });
  }, [selected, item]);

  const handleDragEnd = useCallback(
    (result: any) => {
      if (!result.destination) {
        return;
      }

      const items = Array.from(item);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      // id 재정렬
      const itemsWithNewIds = items.map((item, index) => ({
        ...item,
        quiz_id: index + 1,
      }));
      setItem(itemsWithNewIds);
      setSelected(result.destination.index + 1);
    },
    [item],
  );

  const onDrop = useCallback(
    (e: DragEvent<HTMLElement>) => {
      e.preventDefault();
      // 여러 장을 업로드할 시에는 불가능하다고 알림
      if (e.dataTransfer.items) {
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
          if (e.dataTransfer.items[i].kind === 'file') {
            const file = e.dataTransfer.items[i].getAsFile();
            if (file) {
              const newPrev = [...item];
              newPrev[selected - 1].quiz_image_file = file;
              newPrev[selected - 1].quiz_preview_url = URL.createObjectURL(file);
              setItem(newPrev);
            }
          }
        }
      }
    },
    [selected, item],
  );

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (e.dataTransfer.items.length > 1 || e.dataTransfer.files.length > 1) {
      window.alert('이미지는 한 장만 업로드 가능합니다.');
    }
  }, []);

  // 타입 가드
  const isChoiceProps = (item: ChoiceProps | ShortProps): item is ChoiceProps => {
    return (item as ChoiceProps).choices !== undefined;
  };

  /**
   * 객관식 input 상태 관리 함수
   */
  const onChangeChoices = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string) => {
      setItem((prev) => {
        const newPrev = [...prev];
        const copySelected = newPrev[selected - 1];
        if (isChoiceProps(copySelected)) {
          copySelected.choices[Number(id) - 1].choice_content = e.target.value;
          if (copySelected.quiz_answer[0].choice_num === Number(id)) {
            copySelected.quiz_answer[0].choice_content = e.target.value;
          }
        } else {
          copySelected.quiz_answer[0].choice_content = e.target.value;
        }
        console.log(newPrev);
        return [...newPrev];
      });
    },
    [selected, item],
  );

  const onChangeShorts = useCallback(
    (e: ChangeEvent<HTMLInputElement>, id: string) => {
      setItem((prev) => {
        const newPrev = [...prev];
        const copySelected = newPrev[selected - 1];
        if (!isChoiceProps(copySelected)) {
          copySelected.quiz_answer[Number(id) - 1].choice_content = e.target.value;
        }
        return [...newPrev];
      });
    },
    [selected, item],
  );

  /**
   * 주관식 답안 삭제 함수
   */
  const deleteShortAnswer = useCallback(
    (id: number) => {
      setItem((prev) => {
        const newPrev = [...prev];
        const copySelected = newPrev[selected - 1];
        console.log(id);
        if (!isChoiceProps(copySelected)) {
          copySelected.quiz_answer.splice(id, 1);
        }
        return [...newPrev];
      });
    },
    [selected, item],
  );

  // Drag and Drop 컨테이너
  const DndContainer = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {item.map((item, index) => (
                <Draggable
                  key={`draggable-${item.quiz_id}`}
                  draggableId={`draggable-${item.quiz_id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Item
                        key={item.quiz_id}
                        isselected={selected === item.quiz_id ? 'true' : 'false'}
                        onClick={() => {
                          setSelected(item.quiz_id);
                        }}
                      >
                        {item.quiz_id}
                      </Item>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    );
  };

  return (
    <>
      <Wrapper>
        <TitleBox>
          <BackButton />
          <h1>CS 문제업로드</h1>
          <p>{`${generation}기 / ${week}차 세션`}</p>
        </TitleBox>
        <Section>
          <LeftBox>
            <Item
              isselected={selected === 0 ? 'true' : 'false'}
              onClick={() => {
                setSelected(0);
              }}
              style={{ marginBottom: '0px' }}
            >
              주제
            </Item>
            <DndContainer />
            <button
              style={{ background: '#477FEB', color: 'white' }}
              onClick={() => {
                if (item.length >= 10) {
                  window.alert('슬라이드는 최대 10개까지만 추가할 수 있습니다.');
                  return;
                }
                addItem();
              }}
            >
              슬라이드 추가
            </button>
            <button
              style={{ background: '#D2D2D2' }}
              onClick={() => {
                if (selected === 0) {
                  window.alert('슬라이드를 선택해주세요.');
                  return;
                }
                if (item.length === 1) {
                  window.alert('슬라이드가 1개 이상이어야 합니다.');
                  return;
                }
                deleteItem();
              }}
            >
              슬라이드 삭제
            </button>
          </LeftBox>

          <CenterBox>
            {selected === 0 ? (
              <div>주제</div>
            ) : (
              <>
                <MakeQuestionDiv>
                  <p>여기를 눌러 문제를 만들어 보세요.</p>
                </MakeQuestionDiv>
                <UploadDiv
                  onDrop={onDrop}
                  onDragOver={onDragOver}
                  image={item[selected - 1].quiz_preview_url || null}
                >
                  {item[selected - 1].quiz_preview_url ? null : (
                    <>
                      <img src="https://velog.velcdn.com/images/ea_st_ring/post/5bc62320-dd59-497f-9741-79945c54de6a/image.svg" />
                      <p>컴퓨터에서 이미지를 드래그 및 가져오기</p>
                    </>
                  )}
                </UploadDiv>
                {item[selected - 1].quiz_type === 'choice' ? (
                  <ChoiceDiv>
                    {Array.from(Array(choices)).map((_, index) => (
                      <Choice key={index}>
                        <input
                          type="text"
                          placeholder={`답안 ${index + 1}`}
                          onChange={(e) => {
                            onChangeChoices(e, `${index + 1}`);
                          }}
                          value={
                            isChoiceProps(item[selected - 1])
                              ? (item[selected - 1] as ChoiceProps).choices[index].choice_content
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
                          checked={
                            (item[selected - 1] as ChoiceProps).quiz_answer[0].choice_num ===
                            index + 1
                          }
                        />
                      </Choice>
                    ))}
                  </ChoiceDiv>
                ) : (
                  <Short>
                    {(item[selected - 1] as ShortProps).quiz_answer.map((answer, index) => (
                      <div key={index}>
                        <input
                          type="text"
                          placeholder={`답안 ${index + 1}`}
                          onChange={(e) => {
                            onChangeShorts(e, `${index + 1}`);
                          }}
                          value={answer.choice_content}
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
                        console.log(item[selected - 1]);
                      }}
                    >
                      답안 추가
                    </button>
                  </Short>
                )}
              </>
            )}
          </CenterBox>

          <RightBox>
            {selected !== 0 && (
              <>
                <p>문제 형식</p>
                <div>
                  <button
                    id="choice"
                    style={
                      item[selected - 1]?.quiz_type === 'choice'
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
                      item[selected - 1]?.quiz_type === 'short'
                        ? { background: '#C1C1C1', color: 'white' }
                        : { background: '#fff', color: 'black' }
                    }
                    onClick={() => {
                      onClickType('short');
                    }}
                  >
                    주관식
                  </button>
                </div>
                <p>정답</p>
                <AnswerBox>
                  {item[selected - 1].quiz_type === 'choice' ? (
                    <div>
                      <img src="https://velog.velcdn.com/images/ea_st_ring/post/555ec60e-4c31-48e7-80d1-ec3cb60350d2/image.svg" />
                      {(item[selected - 1] as ChoiceProps).quiz_answer[0].choice_num} :{' '}
                      {item[selected - 1].quiz_answer[0].choice_content}
                    </div>
                  ) : (
                    (item[selected - 1] as ShortProps).quiz_answer.map((answer, index) => (
                      <div key={index}>
                        <img src="https://velog.velcdn.com/images/ea_st_ring/post/555ec60e-4c31-48e7-80d1-ec3cb60350d2/image.svg" />
                        {answer.choice_content}
                      </div>
                    ))
                  )}
                </AnswerBox>
              </>
            )}
          </RightBox>
        </Section>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding: 20px 120px;
  margin-bottom: 40px;
`;

const BackButton = styled(ArrowBack)`
  width: 25px;
  height: 25px;
  align-self: center;
  margin: 0px 0 0 0px;
  cursor: pointer;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 40px 0px;
  h1 {
    font-size: 32px;
    margin-right: 16px;
  }
  p {
    font-size: 16px;
    font-weight: 700;
  }
`;

const Section = styled.div`
  min-width: 100%;
  height: 125vh;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: 'leftbox centerbox rightbox';
  grid-gap: 0;
  flex-direction: row;
  box-shadow:
    -2px 1px 10px 1px rgba(0, 0, 0, 0.15),
    2px 4px 10px 0px rgba(0, 0, 0, 0.15);
`;

const LeftBox = styled.div`
  grid-area: leftbox;
  width: 280px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 40px;
  button {
    width: 200px;
    height: 48px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    background: ${(props: any) => (props.isselected === 'true' ? '#C4D7FF' : '#E4ECFD')};
    & + button {
      margin-top: 16px;
    }
    box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.15);
  }
`;

const List = styled.div`
  flex-direction: column;
  height: fit-content !important;
`;

const Item = styled.div<Item>`
  width: 200px;
  height: 48px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  background: ${(props: any) => (props.isselected === 'true' ? '#C4D7FF' : '#E4ECFD')};
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.15);
  margin: 16px 0;
  transition: 0.2s;
`;

const CenterBox = styled.div`
  grid-area: centerbox;
  width: 658px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: #f4f4f4;
`;

const MakeQuestionDiv = styled.div`
  width: 578px;
  height: 95px;
  margin-top: 16px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
  p {
    color: #757575;
    font-family: NanumSquareRound;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
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
`;

const ChoiceDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 8px;
  width: 100%;
  margin-top: 24px;
`;

const Choice = styled.div`
  width: 284px;
  height: 57px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: space-around;
  align-items: center;
  input:first-child {
    width: 80%;
    height: 50%;
    border-radius: 5px;
    border: none;
    background: #fff;
    padding: 0 16px;
    font-size: 16px;
    font-weight: 400;
    color: #757575;
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
    color: #757575;
  }

  input:focus {
    outline: none;
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
    width: 534px;
    height: 57px;
    border-radius: 5px;
    background: transparent;
    opacity: 0.8;
    box-shadow: 2px 4px 10px 0px rgba(0, 0, 0, 0.25);
    border: 2px dashed #7aff52;
    margin-top: 16px;
    cursor: pointer;
  }
`;

const RightBox = styled.div`
  grid-area: rightbox;
  width: 280px;
  height: 100%;
  display: flex;
  flex-direction: column;
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
`;

const AnswerBox = styled.div`
  div {
    width: 216px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 5px;
    border: 2px solid #cfcfcf;
    background: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 8px;
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
`;

export default CSUpload;

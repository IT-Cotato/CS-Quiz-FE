import React, { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as ArrowBack } from '@/assets/arrow_back.svg';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type Item = {
  isselected?: string;
};

const CSUpload = () => {
  const location = useLocation();
  const search = location.search;
  const generation = search.split('&')[0].split('=')[1];
  const week = search.split('&')[1].split('=')[1];

  const [item, setItem] = useState([
    {
      id: 1,
      title: '제목',
      content: '내용',
    },
  ]);

  const [selected, setSelected] = useState(0);

  const addItem = useCallback(() => {
    setItem((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: '제목',
        content: '내용',
      },
    ]);
  }, []);

  const deleteItem = useCallback(() => {
    const result = window.confirm('정말 삭제하시겠습니까?');
    if (!result) return;

    setItem((prev) => {
      // selected인 item을 삭제 후, id를 재정렬
      return prev
        .filter((item) => item.id !== selected)
        .map((item, index) => ({ ...item, id: index + 1 }));
    });
  }, [selected]);

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
        id: index + 1,
      }));
      setItem(itemsWithNewIds);
      setSelected(result.destination.index + 1);
    },
    [item],
  );

  const DndContainer = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {item.map((item, index) => (
                <Draggable
                  key={`draggable-${item.id}`}
                  draggableId={`draggable-${item.id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Item
                        key={item.id}
                        isselected={selected === item.id ? 'true' : 'false'}
                        onClick={() => {
                          setSelected(item.id);
                        }}
                      >
                        {item.id}
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
      <BackButton width={80} height={80}></BackButton>
      <Wrapper>
        <TitleBox>
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
          <CenterBox></CenterBox>
          <RightBox></RightBox>
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
  padding: 20px 180px;
`;

const BackButton = styled(ArrowBack)`
  width: 40px;
  height: 40px;
  align-self: flex-start;
  margin: 80px 0 0 60px;
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
  width: 100%;
  height: 120vh;
  display: grid;
  grid-template-columns: 1fr 2.5fr 1fr;
  grid-template-areas: 'leftbox centerbox rightbox';
  grid-gap: 0;
  flex-direction: row;
  box-shadow:
    -2px 1px 10px 1px rgba(0, 0, 0, 0.15),
    2px 4px 10px 0px rgba(0, 0, 0, 0.15);
`;

const LeftBox = styled.div`
  grid-area: leftbox;
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 40px;
  button {
    width: 192px;
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
  width: 192px;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;
  background: #f4f4f4;
`;

const RightBox = styled.div`
  grid-area: rightbox;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

export default CSUpload;

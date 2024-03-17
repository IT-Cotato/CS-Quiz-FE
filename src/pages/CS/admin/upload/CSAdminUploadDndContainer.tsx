import React, { useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { Multiples, ShortQuizzes } from '@/typing/db';

//
//
//

type Item = {
  $isselected?: string;
};
type QuizType = Multiples | ShortQuizzes;

//
//
//

/**
 * 드래그 앤 드랍 컨테이너 컴포넌트
 * @param item : 문제를 담은 배열
 * @param setItem : 문제를 담은 배열을 변경하는 함수
 * @param setSelected : 선택된 문제의 id를 변경하는 함수
 * @param selected : 선택된 문제의 id
 * @returns
 */
const CSAdminUploadDndContainer = (
  item: QuizType[],
  setItem: React.Dispatch<React.SetStateAction<QuizType[]>>,
  setSelected: React.Dispatch<React.SetStateAction<number>>,
  selected: number,
) => {
  /**
   *
   */
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
        number: index + 1,
      }));
      setItem(itemsWithNewIds);
      setSelected(result.destination.index);
    },
    [item],
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {item.map((item, index) => (
              <Draggable
                key={`draggable-${item.number}`}
                draggableId={`draggable-${item.number}`}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Item
                      key={item.number}
                      $isselected={selected + 1 === item.number ? 'true' : 'false'}
                      onClick={() => {
                        setSelected(item.number - 1);
                      }}
                    >
                      {item.number}
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
  background: ${(props: any) => (props.$isselected === 'true' ? '#C4D7FF' : '#E4ECFD')};
  box-shadow: 0px 4px 5px 0px rgba(0, 0, 0, 0.15);
  margin: 16px 0;
  transition: 0.2s;
`;

export default CSAdminUploadDndContainer;

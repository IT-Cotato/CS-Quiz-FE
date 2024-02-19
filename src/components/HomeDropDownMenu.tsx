import React, { useCallback, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import styled from 'styled-components';
import arrowDown from '@assets/arrow_down.svg';

const HomeDropDownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  // MemberMenus 요소를 추가하면 css가 자동으로 적용됩니다.
  const MemberMenus = ['세션 기록', 'CS 문제풀이', '마이페이지'];

  const onClickMenu = useCallback(() => {
    toast.info('코테이토 멤버 전용 서비스입니다!');
  }, []);

  return (
    <Container>
      <Menu $isopen={isOpen.toString()} $menu_len={MemberMenus.length}>
        <Button>
          <p
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Members Only
          </p>
          <img
            onClick={() => setIsOpen(!isOpen)}
            src="https://velog.velcdn.com/images/ea_st_ring/post/07e3996c-25f9-4fc3-a73c-27452cd47a0e/image.svg"
            style={isOpen ? { transform: 'rotateX(180deg)' } : { transform: 'rotateX(0deg)' }}
          />
        </Button>
        {isOpen && (
          <Links>
            {MemberMenus.map((menu, idx) => (
              <p key={idx} onClick={onClickMenu}>
                {menu}
              </p>
            ))}
          </Links>
        )}
      </Menu>
      <ToastContainer position="top-center" autoClose={2000} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  text-align: center;
  min-height: fit-content;
  position: relative;
  margin-top: -10px;
`;

const Menu = styled.div<{ $isopen: string; $menu_len: number }>`
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  /* margin-top: ${(props) =>
    props.$isopen === 'true' ? `${103 + (props.$menu_len - 3) * 36}px` : '0px'}; */
  color: #fff;
  font-size: 1.2rem;
  font-weight: 500;
  position: relative;
  width: 212px;
  height: ${(props) =>
    props.$isopen === 'true'
      ? `${160 + (props.$menu_len - 3) * 36}px !important`
      : '50px !important'};
  height: fit-content;
  border: 1px solid #fff;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;
  p {
    margin: 0;
    font-weight: 400;
  }
  img {
    width: 20px;
    margin-left: 10px;
    transition: all 0.3s ease-in-out;
  }
  @media screen and (max-width: 960px) {
    display: none;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  position: absolute;
  transition: all 0.2s ease-in-out; // header의 움직임과 동일하게
  top: 0px;
  cursor: pointer;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  margin-top: 40px;
  animation: dimIn 0.6s ease-in-out;
  p {
    margin: 0;
    color: #fff;
    font-family: NanumSquareRound;
    font-size: 20px;
    cursor: pointer;
    width: 95%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p:hover {
    border-radius: 22px;
    background: linear-gradient(180deg, #6e6cfe 0%, rgba(189, 219, 255, 0.69) 100%);
    color: #fff;
  }
  p + p {
    margin-top: 8px;
  }

  @keyframes dimIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default HomeDropDownMenu;

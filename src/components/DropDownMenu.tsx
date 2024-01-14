import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import arrowDown from '@assets/arrow_down.svg';

type Props = {
  isTop: string;
};

const DropDownMenu = ({ isTop }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  // MemberMenus 요소를 추가하면 css가 자동으로 적용됩니다.
  const MemberMenus = ['세션 기록', 'CS 문제풀이', '마이페이지'];

  const onClickMenu = useCallback(() => {
    window.alert('코테이토의 멤버만 이용할 수 있는 서비스입니다.');
  }, []);

  return (
    <Container>
      <Menu isopen={isOpen.toString()} menu_len={MemberMenus.length}>
        <Button is_top={isTop}>
          <p
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Members Only
          </p>
          <img
            onClick={() => setIsOpen(!isOpen)}
            src={arrowDown}
            style={isOpen ? { transform: 'rotateX(180deg)' } : { transform: 'rotateX(0deg)' }}
          />
        </Button>
        {isOpen && (
          <Links>
            {MemberMenus.map((menu, idx) => (
              <p
                key={idx}
                style={idx === MemberMenus.length - 1 ? { borderRadius: '0 0 40px 40px' } : {}}
                onClick={onClickMenu}
              >
                {menu}
              </p>
            ))}
          </Links>
        )}
      </Menu>
    </Container>
  );
};

export default DropDownMenu;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-left: -100px;
  height: 300px;
`;

const Menu = styled.div<{ isopen: string; menu_len: number }>`
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin-top: ${(props) =>
    props.isopen === 'true' ? `${102 + (props.menu_len - 3) * 36}px` : '0px'};
  color: #93c6fe;
  font-size: 1.2rem;
  font-weight: 500;
  width: 212px;
  height: ${(props) => (props.isopen === 'true' ? `${150 + (props.menu_len - 3) * 36}px` : '50px')};
  border: 3px solid #93c6fe;
  border-radius: 40px;
  transition: all 0.3s ease-in-out;
  p {
    margin: 0;
    font-weight: 600;
  }
  img {
    width: 20px;
    margin-left: 10px;
    transition: all 0.3s ease-in-out;
  }
`;

const Button = styled.div<{ is_top: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  position: absolute;
  transition: all 0.2s ease-in-out; // header의 움직임과 동일하게
  top: ${(props) => (props.is_top === 'true' ? '10px' : '6px')};
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
  animation: fadeIn 0.6s ease-in-out;
  p {
    margin: 0;
    color: #93c6fe;
    font-family: NanumSquareRound;
    font-size: 20px;
    cursor: pointer;
    width: 100%;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p:hover {
    background-color: #93c6fe;
    color: #fff;
  }
  p + p {
    margin-top: 4px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

import React, { useCallback, useEffect, useState } from 'react';
import fetcher from '@utils/fetcher';
import { styled } from 'styled-components';
import useSWR from 'swr';
import { FlexBox, MyPageHeader, MyPageWrapper } from '@pages/MyPage/MyInfo';
import { ReactComponent as LightTheme } from '@assets/light_theme.svg';
import { ReactComponent as DarkTheme } from '@assets/dark_theme.svg';
import GenerationModal from '@pages/MyPage/setting/GenerationModal';

const Setting = () => {
  const { data: user } = useSWR('/v1/api/member/info', fetcher);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onClickQuitButton = useCallback(() => {
    alert('탈퇴하지 마세요ㅠㅠㅠ');
  }, []);

  const onClickThemeButton = useCallback(() => {
    alert('저는 개인적으로 라이트테마가 더 좋은거 같습니당');
  }, []);

  return (
    <FlexBox>
      <MyPageWrapper>
        <MyPageHeader>
          <h1>서비스 설정</h1>
        </MyPageHeader>
        {user?.role === 'ADMIN' && (
          <ButtonContainer>
            <p>기수를 추가하기</p>
            <Button background="#477FEB" onClick={() => setModalOpen(true)}>
              <p>추가하기</p>
            </Button>
          </ButtonContainer>
        )}
        <ButtonContainer>
          <p>회원을 탈퇴하시겠습니까?</p>
          <Button background="#EB5353" onClick={onClickQuitButton}>
            <p>회원 탈퇴</p>
          </Button>
        </ButtonContainer>
        <ButtonContainer>
          <p>테마</p>
          <ThemeButtonWrapper>
            <ThemeButton
              background="#1E1E1E"
              border="#1e1e1e"
              color="#fff"
              onClick={onClickThemeButton}
            >
              <LightTheme />
              <p>&nbsp; &nbsp;라이트</p>
            </ThemeButton>
            <ThemeButton
              background="#fff"
              border="#E8E8E8"
              color="#BBBBBB"
              onClick={onClickThemeButton}
            >
              <DarkTheme />
              <p>&nbsp; &nbsp;다크</p>
            </ThemeButton>
          </ThemeButtonWrapper>
        </ButtonContainer>
      </MyPageWrapper>
      <GenerationModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </FlexBox>
  );
};

export default Setting;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 28px 36px;
  box-sizing: border-box;
  margin: 0 0 40px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 4px 40px 0px rgba(0, 0, 0, 0.05);

  @media screen and (max-width: 768px) {
    margin: 0 0 28px;
    padding: 12px;
  }

  > p {
    color: #1e1e1e;
    font-family: NanumSquareRound;
    font-size: 20px;
    font-weight: 400;
    line-height: 160%;
    margin: 0;

    @media screen and (max-width: 768px) {
      font-size: 16px;
      margin-left: 12px;
    }
  }
`;

const Button = styled.button<{ background: string }>`
  border-radius: 8px;
  border: 1.5px solid #e8e8e8;
  background: ${(props) => props.background};
  padding: 8px 24px;

  @media screen and (max-width: 768px) {
    padding: 8px 20px;
  }

  > p {
    color: #fff;
    font-family: NanumSquareRound;
    font-size: 16px;
    font-weight: 400;
    line-height: 160%;
    margin: 0;

    @media screen and (max-width: 768px) {
      font-size: 14px;
    }
  }
`;

const ThemeButtonWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

interface ThemeButtonProps {
  background: string;
  border: string;
  color: string;
}
const ThemeButton = styled.button<ThemeButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 52px;
  border-radius: 100px;
  border: 1px solid ${(props) => props.border};
  background: ${(props) => props.background};

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 40px;
  }

  > p {
    color: ${(props) => props.color};
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 400;
    line-height: 160%;
    text-transform: capitalize;

    @media screen and (max-width: 768px) {
      font-size: 12px;
    }
  }
`;

import React, { ChangeEvent, DragEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { css, styled } from 'styled-components';
import close_icon from '@assets/close_icon.svg';
import undefined_img from '@assets/undefined_img.svg';
import ToggleButton from '@components/ToggleButton';

/*
수정해야 하는 부분

페이지 전체 height가 작아지면 모달 위에가 짤리는 부분이 있음

이미지 업로드에서 기본 아이콘에서 사진 업로드 되는 잠깐 사이에 기본 아이콘 사이즈가 100%로 되어버림

이미지를 업로드 하는 과정에서 drag zone에 이미지가 안들어가면 브라우저에서 그냥 이미지를 불러오기 해서 이거를 막을수 있을까
*/

/*
논의 사항

모달 백그라운드 투명도 어떻게 할지
블러 처리를 줄지, 그냥 투명으로 할지

모달을 끄는 방법은 상단 우측 x버튼을 눌러서만?
그러면 추가하다가 끄기 전에 아라트로 알려줘야 하는지 

글자 입력시에 대한 폰트 속성도 피그마에서 필요
placehorder랑 value랑 font 설정 -> color랑 weight 정도
현재는 value에 대해서는 font-color가 검은색
근데 검은색 주니간 토글 옆에 글씨들하고 통일성이 안맞음
이거는 토글 옆 글씨를 건들여 주면 해결 가능할 듯

이미지 박스 오른쪽 위에 x버튼은 사진 삭제하는 용도??
그리고 이미지를 업로드 하는 방식은 드래그만 하는지, 아니면 파일 선택도 되게 만들지
이미지는 하나만 허용? 하나만 허용한다면, 만약 두개 이상 업로드 하는경우 어떻게 예외처리 할지

이미지 드래그 하는동안 이미지가 드래그 되는거를 표시해줄지

토글 hover에 효과를 줄지

업로드나 삭제 이후 어떤 화면 보여줘야 할지

백엔드랑 이미지 파일 어떤 타입으로 주고받을지
*/

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  mode: string;
}

const SessionModal = ({ isOpen, onCloseModal, mode }: Props) => {
  const [img, setImg] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [itNews, setItNews] = useState(false);
  const [csEdu, setCsEdu] = useState(false);
  const [networking, setNetworking] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (mode === 'modify') {
      // 기존에 있던 데이터 가져오기
    }
  }, [mode]);

  const cleanInputState = useCallback(() => {
    setImg(null);
    setTitle('');
    setItNews(false);
    setCsEdu(false);
    setNetworking(false);
    setDescription('');
  }, []);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  }, []);

  const onChangeItNews = useCallback(() => {
    setItNews(!itNews);
  }, [itNews]);

  const onChangeCsEdu = useCallback(() => {
    setCsEdu(!csEdu);
  }, [csEdu]);

  const onChangeNetworking = useCallback(() => {
    setNetworking(!networking);
  }, [networking]);

  const onChangeDescription = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  }, []);

  const onClickButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (mode === 'add') {
        // 업로드 요청
        console.log('upload');
      } else {
        // 삭제 요청
        console.log('delete');
      }

      // 제출 이후 모달을 끄는 동작 필요
    },
    [mode, title, itNews, csEdu, networking, description],
  );

  const onDrop = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(e.dataTransfer.items);

    if (e.dataTransfer.items) {
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          if (file) {
            console.log('... file[' + i + '].name = ' + file.name);
            setImg(file);
          }
        }
      }
    } else {
      for (let i = 0; i < e.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + e.dataTransfer.files[i].name);
        setImg(e.dataTransfer.files[i]);
      }
    }
  }, []);

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e);
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        overlay: {
          // background-color 기본값
          backgroundColor: ' rgba(255, 255, 255, 0.75)',
          overflow: 'auto',
        },
        content: {
          width: '740px',
          height: '800px',
          marginTop: '10%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '15px',
          boxShadow: '0px 4px 15px 0px rgba(0, 0, 0, 0.15)',
          display: 'flex',
          justifyContent: 'center',
        },
      }}
      onAfterClose={cleanInputState}
    >
      <ModalWrapper>
        <CloseButton>
          <img src={close_icon} alt="close-button" onClick={onCloseModal} />
        </CloseButton>
        <Header>
          <h3>{mode === 'add' ? '세션 추가' : '세션 수정'}</h3>
        </Header>
        <BoxContainer>
          <ImageBox onDrop={onDrop} onDragOver={onDragOver}>
            <UploadImg
              src={img ? URL.createObjectURL(img) : undefined_img}
              alt="upload-img"
              uploaded={img ? 'upload' : 'undefined'}
            />
            {!img && <p>이미지를 드래그해서 추가</p>}
          </ImageBox>
          <TitleBox>
            <textarea value={title} onChange={onChangeTitle} placeholder="제목을 입력하세요" />
          </TitleBox>
          <ButtonBox>
            <p>it 뉴스</p>
            <ToggleButton toggled={itNews} onClick={onChangeItNews} />
            <p>CS 교육</p>
            <ToggleButton toggled={csEdu} onClick={onChangeCsEdu} />
            <p>네트워킹</p>
            <ToggleButton toggled={networking} onClick={onChangeNetworking} />
          </ButtonBox>
          <DescriptionBox>
            <textarea
              value={description}
              onChange={onChangeDescription}
              placeholder="내용을 입력하세요."
            />
          </DescriptionBox>
        </BoxContainer>
        <ButtonContainer>
          <DeleteButton type="button" onClick={onClickButton}>
            삭제
          </DeleteButton>
          <UploadButton type="button" onClick={onClickButton}>
            업로드
          </UploadButton>
        </ButtonContainer>
      </ModalWrapper>
    </ReactModal>
  );
};

export default SessionModal;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CloseButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;

  > img {
    width: 57px;
    height: 56px;
    cursor: pointer;
  }
`;

const fontStyle = css`
  color: #a1a1a1a1;
  font-family: NanumSquareRound;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px;

  > h3 {
    ${fontStyle}
    color: #000;
    font-size: 24px;
  }
`;

const BoxContainer = styled.div`
  margin: 0 auto;
  width: 500px;
`;

const Box = styled.div`
  display: flex;
  width: 500px;
  border-radius: 10px;
  background: #f1f1f1;
  margin-top: 10px;
`;

const ImageBox = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 280px;
  width: 496px;
  margin-bottom: 24px;
  border: 2px dashed #a9a9a9;

  > p {
    ${fontStyle}
    color: #898787;
    margin: 4px;
  }
`;

interface UploadImgProps {
  uploaded: string;
}
const UploadImg = styled.img<UploadImgProps>`
  border-radius: 10px;
  ${(props) =>
    props.uploaded === 'upload'
      ? css`
          width: 100%;
          height: 100%;
        `
      : css`
          width: 120px;
          height: 120px;
          margin-top: 80px;
        `}
`;

const TitleBox = styled(Box)`
  height: 59px;

  textarea {
    width: 100%;
    height: auto;
    background-color: transparent;
    border: none;
    resize: none;
    padding: 20px;
    ${fontStyle}
    // 값 입력 폰트 색은 검은색 괜춘?
    color: #000;

    &::placeholder {
      color: #a1a1a1;
    }

    &:focus {
      outline: none;
    }
  }
`;

const ButtonBox = styled(Box)`
  align-items: center;
  height: 59px;

  > p {
    ${fontStyle}
    color: var(--text-1, #7b7b7b);
    padding: 5px 0;
    margin-left: 20px;
  }
`;

const DescriptionBox = styled(TitleBox)`
  height: 110px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 500px;
  margin: 28px auto;
`;

const Button = styled.button`
  width: 95px;
  height: 39px;
  margin-left: 8px;
  border-radius: 5px;
`;

const DeleteButton = styled(Button)`
  background: #fff;
  border: 2px solid #c6c6c6;
  ${fontStyle}
  color: #5C5C5C;
`;

const UploadButton = styled(Button)`
  background: #477feb;
  border: none;
  ${fontStyle}
  color: #FFF;
`;

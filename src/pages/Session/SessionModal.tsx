import React, { ChangeEvent, DragEvent, MouseEvent, useCallback, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { css, styled } from 'styled-components';
import { ReactComponent as CloseIcon } from '@assets/close_icon.svg';
import { ReactComponent as UndefinedImg } from '@assets/undefined_img.svg';
import { ReactComponent as UploadIcon } from '@assets/upload_icon.svg';
import ToggleButton from '@components/ToggleButton';

/*
수정해야 하는 부분

페이지 전체 height가 작아지면 모달 위에가 짤리는 부분이 있음

이미지를 업로드 하는 과정에서 drag zone에 이미지가 안들어가면 브라우저에서 그냥 이미지를 불러오기 해서 이거를 막을수 있을까
*/

/*
논의 사항

허용 파일 (png, jpeg, jpg)
*/

interface Props {
  isOpen: boolean;
  onCloseModal: () => void;
  mode: string;
}

const SessionModal = ({ isOpen, onCloseModal, mode }: Props) => {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [itNews, setItNews] = useState(true);
  const [csEdu, setCsEdu] = useState(true);
  const [networking, setNetworking] = useState(false);
  const [description, setDescription] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [dragError, setDragError] = useState(false);

  useEffect(() => {
    if (mode === 'modify') {
      // 기존에 있던 데이터 가져오기
    }
  }, [mode]);

  const cleanInputState = useCallback(() => {
    setImage(null);
    setTitle('');
    setItNews(true);
    setCsEdu(true);
    setNetworking(false);
    setDescription('');
  }, []);

  const onCloseImage = useCallback(() => {
    setImage(null);
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

  const onClickDeleteButton = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('delete');
    // 삭제 이후 모달을 끄는 동작 필요
  }, []);

  const onClickAddButton = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (mode === 'add') {
        // 업로드 요청
        console.log('upload');
      } else {
        // 수정 요청
        console.log('modify');
      }

      // 제출 이후 모달을 끄는 동작 필요
    },
    [mode, title, itNews, csEdu, networking, description],
  );

  const onDrop = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(e.dataTransfer.items);

    if (e.dataTransfer.items) {
      if (e.dataTransfer.items.length > 1) {
        console.log('file dropped over 1');
      } else {
        if (e.dataTransfer.items[0].kind === 'file') {
          const file = e.dataTransfer.items[0].getAsFile();
          if (file) {
            setImage(file);
          }
        }
      }
    } else {
      if (e.dataTransfer.files.length > 1) {
        console.log('file dropped over 1');
      } else {
        setImage(e.dataTransfer.files[0]);
      }
    }

    setDragOver(false);
  }, []);

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.dataTransfer.items);
    setDragOver(true);

    if (e.dataTransfer.items.length > 1 || e.dataTransfer.files.length > 1) {
      setDragError(true);
    } else {
      setDragError(false);
    }
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e);
    setDragOver(false);
    setDragError(false);
  }, []);

  const onClickImageUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  }, []);

  return (
    <ReactModal
      isOpen={isOpen}
      style={{
        overlay: {
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
        <ModalCloseButton>
          <CloseIcon width="57" height="56" fill="#686868" onClick={onCloseModal} />
        </ModalCloseButton>
        <Header>
          <h3>{mode === 'add' ? '세션 추가' : '세션 수정'}</h3>
        </Header>
        <BoxContainer>
          <ImageBox
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            image={image}
            dragging={dragOver ? (dragError ? 'error' : 'drag') : 'drop'}
          >
            <ButtonWrapper>
              <label htmlFor="upload-image">
                <UploadIcon stroke={dragOver ? '#CECCCC' : '#7B7B7B'} />
              </label>
              <input
                type="file"
                id="upload-image"
                accept="image/jpg, image/png, image/jpeg"
                style={{ display: 'none' }}
                onChange={onClickImageUpload}
              />
              <CloseIcon
                width="33"
                height="32"
                fill={dragOver ? '#CECCCC' : '#686868'}
                onClick={onCloseImage}
              />
            </ButtonWrapper>
            {!image && (
              <UndefinedImage dragging={dragOver ? 'drag' : 'drop'}>
                <UndefinedImg fill={dragOver ? '#CECCCC' : '#a8a8a8a8'} />
                <p>이미지를 드래그해서 추가</p>
              </UndefinedImage>
            )}
          </ImageBox>
          <TitleBox>
            <textarea value={title} onChange={onChangeTitle} placeholder="제목을 입력하세요" />
          </TitleBox>
          <ToggleButtonBox>
            <p>it 뉴스</p>
            <ToggleButton toggled={itNews} onClick={onChangeItNews} />
            <p>CS 교육</p>
            <ToggleButton toggled={csEdu} onClick={onChangeCsEdu} />
            <p>네트워킹</p>
            <ToggleButton toggled={networking} onClick={onChangeNetworking} />
          </ToggleButtonBox>
          <DescriptionBox>
            <textarea
              value={description}
              onChange={onChangeDescription}
              placeholder="내용을 입력하세요."
            />
          </DescriptionBox>
        </BoxContainer>
        <ButtonContainer>
          {mode === 'modify' && (
            <DeleteButton type="button" onClick={onClickDeleteButton}>
              세션 삭제
            </DeleteButton>
          )}
          <UploadButton type="button" onClick={onClickAddButton}>
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

const ModalCloseButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  cursor: pointer;
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

interface ImageBoxProps {
  image: File | null;
  dragging: string;
}
const ImageBox = styled(Box)<ImageBoxProps>`
  display: flex;
  justify-content: end;
  align-items: baseline;
  position: relative;
  width: 280px;
  height: 280px;
  margin-bottom: 20px;
  border: 2px dashed #a9a9a9;

  background-image: ${(props) =>
    props.image ? `url(${URL.createObjectURL(props.image)})` : `none`};
  background-size: 100% 100%;

  border: ${(props) => props.dragging === 'drag' && '2px solid #93C6FE'};
  border: ${(props) => props.dragging === 'error' && '2px solid #EB5353'};
`;

const ButtonWrapper = styled.div`
  margin-top: 8px;
  margin-right: 8px;

  svg {
    cursor: pointer;
  }
`;

const UndefinedImage = styled.div<{ dragging: string }>`
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  top: 80px;

  > p {
    ${fontStyle}
    color: ${(props) => (props.dragging === 'drag' ? '#CECCCC' : '#898787')};
    margin: 4px;
  }
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

const ToggleButtonBox = styled(Box)`
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
  background: #eb5353;
  border: 2px solid #c6c6c6;
  ${fontStyle}
  color: #fff;
`;

const UploadButton = styled(Button)`
  background: #477feb;
  border: none;
  ${fontStyle}
  color: #FFF;
`;

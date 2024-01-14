import React, { useCallback, useState, DragEvent, ChangeEvent } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as UndefinedImg } from '@assets/undefined_img.svg';
import { ReactComponent as UploadIcon } from '@assets/upload_icon.svg';
import { ReactComponent as CloseIcon } from '@assets/close_icon.svg';

interface Props {
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<File | null>>;
  setIsPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageBox = ({ image, setImage, setIsPopUpOpen }: Props) => {
  const [dragOver, setDragOver] = useState(false);
  const [dragError, setDragError] = useState(false);

  const onCloseImage = useCallback(() => {
    setImage(null);
  }, []);

  const onDrop = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    console.log(e.dataTransfer.items);

    if (e.dataTransfer.items) {
      if (e.dataTransfer.items.length > 1) {
        console.log('file dropped over 1');
        setIsPopUpOpen(true);
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
        setIsPopUpOpen(true);
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
    <ImageWrapper
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
    </ImageWrapper>
  );
};

export default React.memo(ImageBox);

const ImageWrapper = styled.div<{ image: File | null; dragging: string }>`
  display: flex;
  justify-content: end;
  align-items: baseline;
  position: relative;
  width: 280px;
  height: 280px;
  margin-bottom: 20px;
  border: 2px dashed #a9a9a9;
  border-radius: 10px;
  background-color: #f1f1f1f1;
  margin-top: 10px;

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
    font-family: NanumSquareRound;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    color: ${(props) => (props.dragging === 'drag' ? '#CECCCC' : '#898787')};
    margin: 4px;
  }
`;

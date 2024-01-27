import React, { useCallback, useState, DragEvent, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { ReactComponent as UndefinedImg } from '@assets/undefined_img.svg';
import { ReactComponent as UploadIcon } from '@assets/upload_icon.svg';
import { ReactComponent as CloseIcon } from '@assets/close_icon.svg';

interface Props {
  image: Blob | null;
  setImage: React.Dispatch<React.SetStateAction<Blob | null>>;
  setIsPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ImageBox = ({ image, setImage, setIsPopUpOpen }: Props) => {
  const [imageUrl, setImageUrl] = useState('none');
  const [dragOver, setDragOver] = useState(false);
  const [dragError, setDragError] = useState(false);

  useEffect(() => {
    return () => {
      if (imageUrl !== 'none') {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const onCloseImage = useCallback(() => {
    if (imageUrl !== 'none') {
      URL.revokeObjectURL(imageUrl);
    }

    setImage(null);
    setImageUrl('none');
  }, []);

  const uploadImage = useCallback(
    (file: Blob | null) => {
      if (!file) {
        return;
      }

      if (imageUrl !== 'none') {
        URL.revokeObjectURL(imageUrl);
      }

      setImage(file);
      setImageUrl(URL.createObjectURL(file));
    },
    [imageUrl],
  );

  const onDrop = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();

    if (e.dataTransfer.items) {
      if (e.dataTransfer.items.length > 1) {
        setIsPopUpOpen(true);
      } else if (e.dataTransfer.items[0].kind === 'file') {
        uploadImage(e.dataTransfer.items[0].getAsFile());
      }
    } else {
      if (e.dataTransfer.files.length > 1) {
        setIsPopUpOpen(true);
      } else {
        uploadImage(e.dataTransfer.files[0]);
      }
    }

    setDragOver(false);
  }, []);

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);

    if (e.dataTransfer.items.length > 1 || e.dataTransfer.files.length > 1) {
      setDragError(true);
    } else {
      setDragError(false);
    }
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    setDragError(false);
  }, []);

  const onClickImageUpload = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      uploadImage(e.target.files[0]);
    }
  }, []);

  return (
    <ImageWrapper
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      image={image}
      imageurl={imageUrl}
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

interface ImageWrapperProps {
  image: Blob | null;
  dragging: string;
  imageurl: string;
}

const ImageWrapper = styled.div<ImageWrapperProps>`
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

  background-image: ${(props) => `url(${props.imageurl})`};
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

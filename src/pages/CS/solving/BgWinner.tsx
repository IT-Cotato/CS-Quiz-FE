import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import background from '@assets/bg_kingking.svg';
import mobile from '@assets/bg_kingking_mobile.svg';
import api from '@/api/api';

type Winner = {
  memberId: number;
  memberName: string;
  backFourNumber: string;
};

interface BgWinnerProps {
  quizId: number | null;
}

const BgWinner: React.FC<BgWinnerProps> = ({ quizId }) => {
  const [winner, setWinner] = useState<Winner>();
  const [educationId, setEducationId] = useState<number>(0);

  useEffect(() => {
    const handleWinner = async () => {
      const eduId = await fetchEducationId();
      fetchWinner(eduId);
    };
    handleWinner();
  }, []);

  const fetchEducationId = async (): Promise<number> => {
    let fetchedEducationId: number = 0;
    await api
      .get('/v1/api/education/from', {
        params: {
          quizId: quizId,
        },
      })
      .then((res) => {
        fetchedEducationId = res.data.educationId;
        setEducationId(fetchedEducationId);
        console.log(educationId);
      })
      .catch((err) => {
        console.log(err);
      });
    return fetchedEducationId;
  };

  const fetchWinner = async (educationId: number) => {
    await api
      .get('/v1/api/education/result/winner', {
        params: {
          educationId: educationId,
        },
      })
      .then((res) => {
        setWinner(res.data);
        console.log(winner);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <h3>퀴즈 우승자</h3>
      <p>축하합니다!</p>
      <div className="box">
        {winner?.memberName}({winner?.backFourNumber})
      </div>
    </Wrapper>
  );
};

export default BgWinner;

const Wrapper = styled.div`
  background: url(${background});
  background-size: cover;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  h3 {
    color: #000;
    font-family: NanumSquareRound;
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
  }
  p {
    color: #222;
    font-family: NanumSquareRound;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 20px;
    text-align: center;
  }
  .box {
    background-color: #fff;
    width: 380px;
    margin-top: 20px;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: #000;
    font-size: 1.6rem;
    font-weight: 600;
  }
  div {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
  animation: scale_up 1s ease-in-out;
  @keyframes scale_up {
    0% {
      transform: scale(0);
    }
    90% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @media screen and (max-width: 392px) {
    background: url(${mobile});
    /* padding-top: 180px; */
    .box {
      width: 300px;
      font-size: 1.4rem;
    }
  }
`;

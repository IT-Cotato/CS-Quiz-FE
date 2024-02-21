import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import background from '@assets/bg_kingking.svg';
import api from '@/api/api';

type KingMembers = {
  memberId: number;
  memberName: string;
  backFourNumber: string;
};

interface BgKingKingProps {
  quizId: number | null;
}

const BgKingKing: React.FC<BgKingKingProps> = ({ quizId }) => {
  const [kingMembers, setKingMembers] = useState<KingMembers[]>([]);
  const [educationId, setEducationId] = useState<number>(0);

  useEffect(() => {
    const handleKingKing = async () => {
      const educationId = await fetchEducationId();
      fetchKing(educationId);
    };
    handleKingKing();
  }, []);

  const fetchEducationId = async () => {
    await api
      .get('/v1/api/education/from', {
        params: {
          quizId: quizId,
        },
      })
      .then((res) => {
        setEducationId(res.data.educationId);
        console.log(educationId);
      })
      .catch((err) => {
        console.log(err);
      });
    return educationId;
  };

  const fetchKing = async (educationId: any) => {
    await api
      .get('/v1/api/education/result/kings', {
        params: {
          educationId: educationId,
        },
      })
      .then((res) => {
        console.log(res);
        setKingMembers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      <h3>최다 득점자</h3>
      {kingMembers.length > 1 ? (
        <p>킹킹 문제를 풀어주세요!</p>
      ) : (
        <p>킹킹 문제는 보너스! &nbsp;다 함께 풀어봐요~</p>
      )}
      <div>
        {kingMembers.map((member) => (
          <>
            {member.memberName}({member.backFourNumber})
          </>
        ))}
      </div>
    </Wrapper>
  );
};

export default BgKingKing;

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
  div {
    background-color: #fff;
    width: 380px;
    margin-top: 20px;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    color: #000;
    font-size: 1.6rem;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
`;

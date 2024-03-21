import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Multiples, ShortQuizzes } from '@/typing/db';
import axios from 'axios';
import CSAdminUploadLayout from './CSAdminUploadLayout';
import CSAdminUploadContent from './CSAdminUploadContent';
import fetchUserData from '@utils/fetchUserData';

type QuizType = Multiples | ShortQuizzes;

const CSAdminUpload = () => {
  // 현재 선택된 슬라이드를 나타내기 위한 state
  const [selected, setSelected] = useState(0);
  // 전체 슬라이드를 담기 위한 state
  const [quiz, setQuiz] = useState<QuizType[]>([
    {
      number: 1,
      question: '',
      choices: [
        {
          number: 1,
          content: '',
          isAnswer: 'ANSWER',
        },
        {
          number: 2,
          content: '',
          isAnswer: 'NO_ANSWER',
        },
        {
          number: 3,
          content: '',
          isAnswer: 'NO_ANSWER',
        },
        {
          number: 4,
          content: '',
          isAnswer: 'NO_ANSWER',
        },
      ],
      image: null,
      previewUrl: null,
    },
  ]);
  const { data: userData } = fetchUserData();
  const [params] = useSearchParams();
  const educationId = Number(params.get('educationId'));
  const educationNumber = params.get('educationNumber') || '';
  const generationNumber = params.get('generationNumber') || '';

  /**
   * fetch quiz list data if it exists
   */
  const fetchQuizData = async () => {
    await axios
      .get(process.env.REACT_APP_BASE_URL + '/v1/api/quiz/all', {
        params: {
          educationId: educationId,
        },
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
      .then((res) => {
        const quizDataList = [...res.data.multiples].concat(res.data.shortQuizzes);
        quizDataList.sort((a: QuizType, b: QuizType) => a.number - b.number);
        if (quizDataList.length === 0) {
          return;
        }
        setQuiz(quizDataList);
      });
  };

  //
  // fetch quiz data when component is mounted
  //
  useEffect(() => {
    fetchQuizData();
  }, []);

  //
  // prevent user from leaving the page
  //
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  //
  // TODO: utilize role check function
  //
  setTimeout(() => {
    if (!['ADMIN', 'EDUCATION'].includes(userData?.role as string)) {
      window.location.href = '/';
    }
  }, 500);

  return (
    <CSAdminUploadLayout generationNumber={generationNumber} educationNumber={educationNumber}>
      <CSAdminUploadContent
        quiz={quiz}
        setQuiz={setQuiz}
        selected={selected}
        setSelected={setSelected}
        educationId={educationId}
      />
    </CSAdminUploadLayout>
  );
};

export default CSAdminUpload;

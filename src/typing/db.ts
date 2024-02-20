export interface Multiples {
  number: number;
  question: string;
  choices: {
    number: number;
    content: string;
    isAnswer: 'ANSWER' | 'NO_ANSWER';
  }[];
  image: File | null;
  previewUrl: string | null;
}

export interface ShortQuizzes {
  number: number;
  question: string;
  shortAnswers: {
    answer: string;
  }[];
  image: File | null;
  previewUrl: string | null;
}

export interface IGeneration {
  generationId: number;
  generationNumber: string;
}

export interface ICsOnSession {
  sessionId: number;
  sessionNumber: number;
}

export interface ISession {
  sessionId: number;
  sessionNumber: number;
  description: string;
  photoUrl: string;
  generationId: number;
  csEducation: string;
  itIssue: string;
  networking: string;
}

export interface IEducation {
  educationId: number;
  subject: string;
  educationNumber: number;
  sessionNumber: number;
}

export interface Multiples {
  number: number;
  question: string;
  choices: {
    number: number;
    content: string;
    isAnswer: 'ANSWER' | 'NO_ANSWER';
  }[];
  image: File | null;
  previewUrl: string | null;
}

export interface ShortQuizzes {
  number: number;
  question: string;
  shortAnswers: {
    answer: string;
  }[];
  image: File | null;
  previewUrl: string | null;
}

export type TQuiz = (Multiples | ShortQuizzes) & {
  approaach: boolean;
  start: boolean;
};

export interface IQuizAdmin {
  quizId: number;
  question: string;
  quizNumber: number;
  status: string;
  start: string;
}

export interface IQuizAdminScorer {
  quizId: number;
  quizType: string;
  quizNumber: number;
  question: string;
  answer: string[];
}

export interface IQuizAdminSubmit {
  memberId: number;
  memberName: string;
  backFourNumber: string;
  reply: string;
}

export interface IQuizAdminScorer {
  memberId: number;
  memberName: string;
  backFourNumber: string;
}

export interface IQuizAllScorer {
  quizId: number;
  quizNumber: number;
  scorerId: number;
  scorerName: string;
  backFourNumber: string;
}

export interface IKingMember {
  memberId: number;
  memberName: string;
  backFourNumber: string;
}

export interface IApplyMember {
  memberId: number;
  memberName: string;
  backFourNumber: string;
}

export interface IEnrollMember {
  id: number;
  name: string;
  position: string;
  generationNumber: number;
}

export interface IMyPageInfo {
  memberId: number;
  email: string;
  name: string;
  generationNumber: number;
  memberPosition: string;
  phoneNumber: string;
}

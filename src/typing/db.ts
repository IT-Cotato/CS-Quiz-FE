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
  generationName: string;
}

export interface ISession {
  id: number;
  number: number;
  description: string;
  photoUrl: string;
  csEducation: string;
  itIssue: string;
  networking: string;
  generationg: {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    isRecruit: boolean;
    modifiedAt: string;
  };
}

export interface IEducation {
  educationId: number;
  subject: string;
  educationNumber: number;
}

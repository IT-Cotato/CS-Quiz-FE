export interface ChoiceProps {
  quiz_id: number;
  quiz_title: string;
  quiz_content: string;
  quiz_type: string;
  quiz_answer: {
    choice_num: number;
    choice_content: string;
  }[];
  choices: {
    choice_id: number;
    choice_content: string;
  }[];
  quiz_image_file: File | null;
  quiz_preview_url: string | null;
}

export interface ShortProps {
  quiz_id: number;
  quiz_title: string;
  quiz_content: string;
  quiz_type: string;
  quiz_answer: {
    choice_content: string;
  }[];
  quiz_image_file: File | null;
  quiz_preview_url: string | null;
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

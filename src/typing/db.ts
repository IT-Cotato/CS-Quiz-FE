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

export interface Question {
  question: string;
  options: string[];
  correct: number;
}

export interface Quiz {
  _id: string;
  title: string;
  subject: string;
  difficulty: string;
  stack: string;
  questions: Question[];
  completed?: boolean;
  score?: number;
}

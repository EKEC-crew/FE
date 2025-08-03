export interface CrewInfo {
  name: string;
  recruitMessage: string;
  description: string;
  maxCapacity: number;
  category: number;
  age: number;
  gender: number;
  region: number;
  activities: number[];
  styles: number[];
  admin: number;
}

export interface ServerQuestion {
  question: string;
  type: 0 | 1;
  choices?: string[];
  etc?: 0 | 1;
  required: 0 | 1;
}

export interface QuestionData {
  id: number;
  type: "checkbox" | "long";
  question: string;
  options: string[];
  required: boolean;
  hasEtc?: boolean;
}

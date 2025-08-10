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

export interface Crew {
  id: number;
  name: string;
  description: string;
  introduction: string;
  capacity: number;
  noticeCount: number;
  postCount: number;
  bannerImage: string;
  ageLimit: number;
  genderLimit: number;
  ownerName: string;
  crewCategory: string;
  crewActivity: string[];
  crewStyle: string[];
  regionSido: string;
  regionGu: string;
}

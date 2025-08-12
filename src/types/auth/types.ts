export interface ResponseSign {
  resultType: "SUCCESS" | "FAIL";
  error?: {
    errorCode: string;
    reason: string;
    data: {
      id: number;
      email: string;
    };
  };
  data?: {
    id: number;
    email: string;
    name: string;
    nickname: string;
    profileImage: string | null;
    isCompleted: boolean;
  };
}

export interface RequestSign {
  email: string;
  password: string;
}

export interface ResponseRefresh {
  resultType: "FAIL" | "SUCCESS";
  error?: {
    errorCode: string;
    reason: string;
    data: null;
  };
  data?: {
    id: number;
    email: string;
    name: string;
    nickname: string;
    profileImage: string;
    isCompleted: boolean;
  };
}

export interface ResponseCreateProfile {
  resultType: "FAIL" | "SUCCESS";
  error?: {
    errorCode: "I001";
    reason: string;
    data: {
      name: string;
      nickname: string;
      gender: 0 | 1 | 2;
      phone: string;
      birthday: {
        year: number;
        month: number;
        day: number;
      };
      defaultImage: false;
    };
  };
  data?: {
    name: string;
    nickname: string;
    gender: 0 | 1 | 2;
    phone: string;
    birthday: {
      year: number;
      month: number;
      day: number;
    };
    defaultImage: false;
  };
}

export interface RequestCreateProfile {
  profileImage: File | null;
  defaultImage: boolean;
  name: string;
  nickname: string;
  gender: 0 | 1 | 2; // 남자 0, 여자 1, 밝히고싶지않음 2
  phone: string;
  birthday: {
    year: number;
    month: number;
    day: number;
  };
}

export interface ResponseSignOut {
  resultType: "FAIL" | "SUCCESS";
  error: {
    errorCode: string;
    reason: string;
    data: null;
  };
  data: null;
}

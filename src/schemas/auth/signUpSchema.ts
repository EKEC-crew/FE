import { z } from "zod";

// 에러 메시지
const VALIDATION_MESSAGES = {
  EMAIL: "올바른 이메일 형식이 아닙니다",
  PASSWORD_LENGTH: "7자 이상 12자 이하의 글자 수를 맞춰주세요",
  PASSWORD_SPECIAL_CHAR: "특수문자(!@#$%^&* 등)를 포함해주세요",
  PASSWORD_LANGUAGE: "영어 외의 다른 언어를 사용할 수 없어요",
  PASSWORD_MATCH: "비밀번호가 일치하지 않습니다.",
} as const;

// 검증 규칙
const VALIDATION_RULES = {
  email: {
    test: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    message: VALIDATION_MESSAGES.EMAIL,
  },
  passwordLength: {
    test: (password: string) => password.length >= 7 && password.length <= 12,
    message: VALIDATION_MESSAGES.PASSWORD_LENGTH,
  },
  passwordSpecialChar: {
    test: (password: string) => /[.!@#$%^&*]/.test(password),
    message: VALIDATION_MESSAGES.PASSWORD_SPECIAL_CHAR,
  },
  passwordLanguage: {
    test: (password: string) => /^[A-Za-z0-9.!@#$%^&*]*$/.test(password),
    message: VALIDATION_MESSAGES.PASSWORD_LANGUAGE,
  },
} as const;

const passwordValidation = z.string().superRefine((password, ctx) => {
  // 비밀번호 규칙들을 순회하며 검증
  Object.entries(VALIDATION_RULES)
    .filter(([key]) => key.startsWith("password"))
    .forEach(([, rule]) => {
      if (!rule.test(password)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: rule.message,
        });
      }
    });
});

export const signUpSchema = z
  .object({
    email: z.string().email({ message: VALIDATION_MESSAGES.EMAIL }),
    password: passwordValidation,
    passwordCheck: z.string(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: VALIDATION_MESSAGES.PASSWORD_MATCH,
    path: ["passwordCheck"],
  });

// 통합 검증 함수
export const getValidationErrors = (
  type: "email" | "password" | "passwordMatch",
  value: string,
  compareValue?: string
) => {
  const errors: string[] = [];

  switch (type) {
    case "email":
      if (!VALIDATION_RULES.email.test(value)) {
        errors.push(VALIDATION_RULES.email.message);
      }
      break;

    case "password":
      Object.entries(VALIDATION_RULES)
        .filter(([key]) => key.startsWith("password"))
        .forEach(([, rule]) => {
          if (!rule.test(value)) {
            errors.push(rule.message);
          }
        });
      break;

    case "passwordMatch":
      if (compareValue && value !== compareValue) {
        errors.push(VALIDATION_MESSAGES.PASSWORD_MATCH);
      }
      break;
  }

  return errors;
};

export type SignUpFormValues = z.infer<typeof signUpSchema>;

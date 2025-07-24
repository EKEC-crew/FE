import { z } from "zod";

const passwordValidation = z.string().superRefine((password, ctx) => {
  if (password.length > 0 && !/^[A-Za-z0-9.!@#$%^&*]+$/.test(password)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "영어 외의 다른 언어를 사용할 수 없어요",
    });
    return;
  }

  if (password.length < 7 || password.length > 12) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "7자 이상 12자 이하의 글자 수를 맞춰주세요",
    });
  }

  if (!/[.!@#$%^&*]/.test(password)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "특수문자(!@#$%^&* 등)를 포함해주세요",
    });
  }
});

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다" }),
    password: passwordValidation,
    passwordCheck: z.string(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

// 유틸리티 함수
export const validatePassword = (password: string) => {
  const result = passwordValidation.safeParse(password);
  return {
    isValid: result.success,
    errors: result.success ? [] : result.error.errors.map((e) => e.message),
  };
};

export type SignUpFormValues = z.infer<typeof signUpSchema>;

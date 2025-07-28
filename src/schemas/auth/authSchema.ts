import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다" }),
    password: z.string().superRefine((password, ctx) => {
      const errors = [];

      if (password.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "비밀번호를 입력해주세요",
        });
        return;
      }

      if (!/^[A-Za-z0-9.!@#$%^&*]+$/.test(password)) {
        errors.push("영어 외의 다른 언어를 사용할 수 없어요");
      }

      if (password.length < 7 || password.length > 12) {
        errors.push("7자 이상 12자 이하의 글자 수를 맞춰주세요");
      }

      if (!/[.!@#$%^&*]/.test(password)) {
        errors.push("특수문자(!@#$%^&* 등)를 포함해주세요");
      }

      if (errors.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errors.join("\n"),
        });
      }
    }),
    passwordCheck: z.string(),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

export const signInSchema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다" }),
  password: z.string().min(1),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type SignInFormValues = z.infer<typeof signInSchema>;

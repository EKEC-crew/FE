import { z } from "zod";

export const editProfileSchema = z
  .object({
    name: z.string().min(1, "이름을 입력해주세요."),
    nickname: z.string().nullable(),

    // phone & carrier
    phone: z
      .string()
      .regex(/^010\d{8}$/, "010으로 시작하는 11자리 숫자를 입력해주세요."),
    carrier: z.string().min(1, "통신사를 선택해주세요."),

    // 🔹 비밀번호는 필수 입력
    password: z.string(),
    passwordConfirm: z.string(),
  })
  // 닉네임 검증
  .refine((data) => data.nickname === null || data.nickname.length >= 2, {
    message: "닉네임을 입력하거나 건너뛰기를 선택해주세요.",
    path: ["nickname"],
  })
  // 비밀번호 + 비밀번호 확인 검증
  .superRefine((data, ctx) => {
    const { password, passwordConfirm } = data;

    // 1. 영어/숫자/특수문자 외 문자 사용 금지
    if (!/^[A-Za-z0-9.!@#$%^&*]*$/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "영어 외의 다른 언어를 사용할 수 없어요",
      });
      return;
    }

    // 2. 길이 체크
    if (password.length < 7 || password.length > 12) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "7자 이상 12자 이하의 글자 수를 맞춰주세요",
      });
      return;
    }

    // 3. 특수문자 포함 여부
    if (!/[.!@#$%^&*]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["password"],
        message: "특수문자(!@#$%^&* 등)를 포함해주세요",
      });
      return;
    }

    // 4. 비밀번호 확인 일치 여부
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["passwordConfirm"],
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
  });

export type EditProfileFormValues = z.infer<typeof editProfileSchema>;

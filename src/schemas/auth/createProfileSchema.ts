import z from "zod";

export const createProfileSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  nickname: z
    .string()
    .min(3, "닉네임은 3글자 이상이어야 합니다.")
    .regex(/^[가-힣]{3,}$/, "닉네임은 한글 3글자 이상만 가능합니다."),
  gender: z.enum(["male", "female", "not-defined"], {
    errorMap: () => ({ message: "성별을 선택해주세요." }),
  }),
  birthDate: z
    .string()
    .min(1, "생년월일을 선택해주세요.")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "생년월일을 모두 선택해주세요."),
});

export type CreateProfileFormValues = z.infer<typeof createProfileSchema>;

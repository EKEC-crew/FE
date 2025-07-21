import z from "zod";

export const createProfileSchema = z
  .object({
    name: z.string().min(1, "이름을 입력해주세요."),
    nickname: z.string().nullable(),
    gender: z.enum(["male", "female", "not-defined"], {
      errorMap: () => ({ message: "성별을 선택해주세요." }),
    }),
    birthDate: z
      .string()
      .min(1, "생년월일을 선택해주세요.")
      .regex(/^\d{4}-\d{2}-\d{2}$/, "생년월일을 모두 선택해주세요."),
  })
  .refine(
    (data) => {
      if (data.nickname === null) return true;
      if (
        data.nickname &&
        data.nickname.length >= 3 &&
        /^[가-힣]{3,}$/.test(data.nickname)
      )
        return true;
      return false;
    },
    {
      message: "닉네임을 입력하거나 건너뛰기를 선택해주세요.",
      path: ["nickname"],
    }
  );

export type CreateProfileFormValues = z.infer<typeof createProfileSchema>;

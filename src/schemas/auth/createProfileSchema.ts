import z from "zod";

export const createProfileSchema = z.object({
  nickname: z.string().min(2).max(100).nonempty("닉네임은 필수입니다."),
});

export type CreateProfileFormValues = z.infer<typeof createProfileSchema>;

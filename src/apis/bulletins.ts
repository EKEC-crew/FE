import { privateAPI } from "./axios";
import type {
  RequestCreatePostDto,
  ResponseCreatePostDto,
  RequestUpdatePostDto,
} from "../types/bulletin/types";

// 게시글 생성 API
export const createBulletinApi = async (
  crewId: string,
  data: RequestCreatePostDto
): Promise<ResponseCreatePostDto> => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("content", data.content);
  formData.append("userId", data.userId.toString());
  formData.append("type", data.type || "regular");
  formData.append("isRequired", String(data.isRequired ?? true));
  formData.append("allowComment", String(data.allowComment ?? true));
  formData.append(
    "allowPrivateComment",
    String(data.allowPrivateComment ?? true)
  );
  formData.append("allowShare", String(data.allowShare ?? true));

  (data.images || []).forEach((image) => {
    formData.append("images", image);
  });

  const response = await privateAPI.post(`/crew/${crewId}/post/`, formData, {
    headers: {
      "Content-Type": undefined,
    },
  });

  return response.data;
};

// 게시글 수정 API
export const updateBulletinApi = async (
  crewId: string,
  postId: string,
  data: RequestUpdatePostDto
) => {
  console.log("🚀 updateBulletinApi 호출:", {
    crewId,
    postId,
    data,
  });

  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("content", data.content);

  // 기존 이미지 ID들 추가
  console.log("📷 기존 이미지 IDs:", data.existingImageIds);
  (data.existingImageIds || []).forEach((id) => {
    formData.append("existingImageIds", id.toString());
  });

  // 새 이미지들 추가
  console.log("🖼️ 새 이미지들:", data.images);
  (data.images || []).forEach((image) => {
    formData.append("images", image);
  });

  const response = await privateAPI.put(
    `/crew/${crewId}/post/${postId}`,
    formData,
    {
      headers: {
        "Content-Type": undefined,
      },
    }
  );

  return response.data;
};

// 게시글 삭제 API
export const deleteBulletinApi = async (crewId: string, postId: string) => {
  const response = await privateAPI.delete(`/crew/${crewId}/post/${postId}`);
  return response.data;
};

// 게시글 좋아요 API (필요시 사용)
export const toggleBulletinLikeApi = async (crewId: string, postId: string) => {
  const response = await privateAPI.post(`/crew/${crewId}/post/${postId}/like`);
  return response.data;
};

import { privateAPI } from "./axios";

// 게시글 수정 API
export const updateBulletinApi = async (
  crewId: string,
  postId: string,
  data: {
    title: string;
    content: string;
    images?: File[];
    existingImageIds?: number[];
  }
) => {
  const formData = new FormData();
  
  formData.append("title", data.title);
  formData.append("content", data.content);
  
  // 기존 이미지 ID들 추가
  if (data.existingImageIds) {
    data.existingImageIds.forEach(id => {
      formData.append("existingImageIds", id.toString());
    });
  }
  
  // 새 이미지들 추가
  if (data.images) {
    data.images.forEach(image => {
      formData.append("images", image);
    });
  }

  const response = await privateAPI.put(
    `/api/crew/${crewId}/post/${postId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  
  return response.data;
};

// 게시글 삭제 API
export const deleteBulletinApi = async (crewId: string, postId: string) => {
  const response = await privateAPI.delete(`/api/crew/${crewId}/post/${postId}`);
  return response.data;
};

// 게시글 좋아요 API (필요시 사용)
export const toggleBulletinLikeApi = async (crewId: string, postId: string) => {
  const response = await privateAPI.post(`/api/crew/${crewId}/post/${postId}/like`);
  return response.data;
};

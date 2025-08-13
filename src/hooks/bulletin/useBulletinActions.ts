import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createBulletinApi,
  updateBulletinApi,
  deleteBulletinApi,
} from "../../apis/bulletins";
import { useNavigate } from "react-router-dom";
import type {
  RequestCreatePostDto,
  RequestUpdatePostDto,
} from "../../types/bulletin/types";

// 게시글 생성 훅
export const useCreateBulletin = (crewId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RequestCreatePostDto) => createBulletinApi(crewId, data),
    onSuccess: () => {
      // 게시글 목록 재조회
      queryClient.invalidateQueries({
        queryKey: ["bulletinList", crewId],
      });
      alert("게시글이 성공적으로 등록되었습니다.");
      navigate(`/crew/${crewId}/bulletin`);
    },
    onError: (error) => {
      console.error("게시글 생성 실패:", error);
      alert("게시글 등록에 실패했습니다. 다시 시도해주세요.");
    },
  });
};

// 게시글 수정 훅
export const useUpdateBulletin = (crewId: string, postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RequestUpdatePostDto) =>
      updateBulletinApi(crewId, postId, data),
    onSuccess: () => {
      // 게시글 상세 정보 재조회
      queryClient.invalidateQueries({
        queryKey: ["bulletinDetail", crewId, postId],
      });
      // 게시글 목록도 재조회
      queryClient.invalidateQueries({
        queryKey: ["bulletins", crewId],
      });
    },
    onError: (error) => {
      console.error("게시글 수정 실패:", error);
      alert("게시글 수정에 실패했습니다. 다시 시도해주세요.");
    },
  });
};

// 게시글 삭제 훅
export const useDeleteBulletin = (crewId: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (postId: string) => deleteBulletinApi(crewId, postId),
    onSuccess: () => {
      // 게시글 목록 재조회
      queryClient.invalidateQueries({
        queryKey: ["bulletins", crewId],
      });
      // 게시글 목록 페이지로 이동
      navigate(`/crew/${crewId}/bulletin`);
    },
    onError: (error) => {
      console.error("게시글 삭제 실패:", error);
      alert("게시글 삭제에 실패했습니다. 다시 시도해주세요.");
    },
  });
};

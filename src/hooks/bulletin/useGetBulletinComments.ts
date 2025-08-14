import { useQuery } from "@tanstack/react-query";
import { getBulletinCommentsApi } from "../../apis/bulletins";

export const useGetBulletinComments = (
  crewId: string,
  postId: string,
  page: number = 1,
  size: number = 10
) => {
  return useQuery({
    queryKey: ["bulletinComments", crewId, postId, page, size],
    queryFn: () => getBulletinCommentsApi(crewId, postId, page, size),
    staleTime: 30000,
    gcTime: 300000,
  });
};

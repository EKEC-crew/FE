import { useQuery } from "@tanstack/react-query";
import { API } from "../../apis/axios";

export interface RawBulletin {
  postId: number;
  title: string;
  createdAt: string;
  nickname: string;
  images: { imageId: number; imageName: string }[];
}

export interface Bulletin {
  id: number;
  title: string;
  date: string;
  author: string;
  hasAttachment: boolean;
}

export function useBulletins(crewId?: string) {
  const { data: raw = [], isLoading } = useQuery<RawBulletin[], Error>({
    queryKey: ["bulletinList", crewId],
    queryFn: async () => {
      const res = await API.get<{ success: RawBulletin[] }>(
        `/crew/${crewId}/bulletin`
      );
      return res.data.success;
    },
    enabled: Boolean(crewId),
  });

  const bulletins: Bulletin[] = raw.map((x) => ({
    id: x.postId,
    title: x.title,
    date: x.createdAt.split("T")[0],
    author: x.nickname,
    hasAttachment: x.images.length > 0,
  }));

  return { bulletins, isLoading };
}

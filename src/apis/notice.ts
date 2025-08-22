import type { Notice } from "@/types/notice/types";

export async function fetchNoticeList(crewId: string, page: number, size: number) {
  const res = await fetch(`/api/crews/${crewId}/notices?page=${page}&size=${size}`, {
    credentials: "include",
  });
  const json = await res.json();
  return json.data.map((n: any) => ({
    id: n.id,
    title: n.title,
    type: n.type,
    createdAt: n.createdAt, 
    isLiked: n.isLiked,
    author: n.author,
  })) as Notice[];
}

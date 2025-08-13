// src/hooks/useReveal.ts
import { useInView } from "react-intersection-observer";
import { useState, useMemo, useEffect } from "react";

type Option = { pageSize?: number };
export function useInfinite<T>(
  allItems: T[] = [],
  { pageSize = 10 }: Option = {}
) {
  const { ref, inView } = useInView({ rootMargin: "200px" });
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [allItems]);

  useEffect(() => {
    if (inView && page * pageSize < allItems.length) {
      setPage((p) => p + 1);
    }
  }, [inView, page, pageSize, allItems.length]);

  const visible = useMemo(
    () => allItems.slice(0, page * pageSize),
    [allItems, page, pageSize]
  );

  const hasMore = allItems.length > visible.length;

  return { ref, visible, hasMore };
}

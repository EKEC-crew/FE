import { useEffect, useRef } from "react";

type BoolRef = { current: boolean };

export function useUrlSync({
  hydrated,
  locationSearch,
  navigate,
  qs,
  isInternalRef,
}: {
  hydrated: boolean;
  locationSearch: string;
  navigate: (path: string, opts: { replace: boolean }) => void;
  qs: string;
  isInternalRef: BoolRef;
}) {
  const lastQS = useRef("");

  useEffect(() => {
    if (!hydrated) return;

    const current = locationSearch.startsWith("?")
      ? locationSearch.slice(1)
      : locationSearch;

    if (qs === current) {
      lastQS.current = qs;
      return;
    }
    // gnb면 수용만
    if (!isInternalRef.current) {
      lastQS.current = current;
      return;
    }
    // 내부 변경 -> url 갱신
    isInternalRef.current = false;
    if (qs !== lastQS.current) {
      lastQS.current = qs;
      navigate(`/crewListPage?${qs}`, { replace: true });
    }
  }, [hydrated, qs, locationSearch, navigate]);
}

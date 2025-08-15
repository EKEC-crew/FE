import { useCallback, useState } from "react";

export default function useComboboxFocus() {
  const [hasFocus, setHasFocus] = useState(false);

  const onFocusCapture = useCallback(() => setHasFocus(true), []);
  const onBlurCapture = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (!next || !e.currentTarget.contains(next)) setHasFocus(false);
  }, []);

  return { hasFocus, onFocusCapture, onBlurCapture, setHasFocus };
}

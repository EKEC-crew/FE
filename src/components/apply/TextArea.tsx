import { useRef, useEffect } from "react";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({ value, rows = 1, ...rest }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.height = "auto";
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={rows}
      value={value}
      className="w-full border-b border-b-[#C5C6CB] p-3 resize-none overflow-hidden"
      {...rest}
    />
  );
}

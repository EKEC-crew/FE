import Textarea from "../TextArea";

type Props = {
  order: number;
  question: string;
  required: boolean;
  value: string;
  onTextInput: (value: string) => void;
};

export default function LongTextQuestion({
  order,
  question,
  required,
  value,
  onTextInput,
}: Props) {
  return (
    <div className="bg-[#F7F7FB] rounded-xl py-6 px-10">
      <p className="text-[22px] font-semibold mb-3">
        {order}. {question}
        {required && <span className="text-red-500"> *</span>}
      </p>

      <Textarea
        rows={1}
        placeholder="답변을 입력해주세요"
        value={value ?? ""}
        onInput={(e) =>
          onTextInput((e.currentTarget as HTMLTextAreaElement).value)
        }
      />
    </div>
  );
}

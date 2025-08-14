type Props = {
  order: number;
  question: string;
  required?: boolean;
};

export default function QuestionHeader({ order, question, required }: Props) {
  return (
    <p className="text-[22px] font-semibold mb-3">
      {order}. {question}
      {required ? <span className="text-red-500"> *</span> : null}
    </p>
  );
}

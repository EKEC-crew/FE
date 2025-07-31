import CategoryGradientButtonBg from "./CategoryGradientButton";

const categoryWidth: Record<string, number> = {
  //카테고리 : 버튼의 width
  사교: 48,
  여행: 48,
  음식: 48,
  스터디: 62,
  액티비티: 76,
  자기계발: 76,
  "운동/영상": 81,
  "음악/악기": 81,
  "문화/공연": 81,
  "사진/영상": 81,
  스포츠관람: 90,
  스포츠직관: 90,
  "미술/취미": 81,
};

export default function CategoryBgImgs({ category }: { category: string }) {
  const width = categoryWidth[category];
  const height = 26;

  return (
    <CategoryGradientButtonBg width={width} height={height} text={category} />
  );
}

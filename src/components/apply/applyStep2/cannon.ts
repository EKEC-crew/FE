// 문자열 정규화(Zero-width, trim 등)
const canon = (v: unknown) =>
  String(v ?? "")
    .normalize("NFC")
    .replace(/\u200B/g, "")
    .trim();

export default canon;

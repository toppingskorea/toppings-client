export const ellipsisTextByLength = (text: string, length: number) =>
  `${text.slice(0, length)} ${text.length > length ? "..." : ""} `;

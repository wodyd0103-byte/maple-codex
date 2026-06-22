export type Rarity = "일반" | "레어" | "에픽" | "유니크" | "레전드리";

export type Category = "무기" | "방어구" | "장신구" | "소비" | "몬스터" | "펫";

export type SortKey = "이름" | "레벨" | "희귀도";

export interface Stat {
  label: string;
  value: string;
}

export interface CodexEntry {
  id: number;
  name: string;
  category: Category;
  rarity: Rarity;
  level: number;
  /** maplestory.io 원격 아이콘 URL. 로드 실패 시 fallbackIcon 으로 대체된다. */
  icon: string;
  desc: string;
  stats: Stat[];
}

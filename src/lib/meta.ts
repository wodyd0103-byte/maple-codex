import type { Category, Rarity } from "../types";

/** 희귀도별 색상/광량/정렬 순서 메타데이터. */
export const RARITY: Record<Rarity, { color: string; glow: string; order: number }> = {
  일반: { color: "#9ca3af", glow: "rgba(156,163,175,0.35)", order: 0 },
  레어: { color: "#38bdf8", glow: "rgba(56,189,248,0.45)", order: 1 },
  에픽: { color: "#a78bfa", glow: "rgba(167,139,250,0.5)", order: 2 },
  유니크: { color: "#fbbf24", glow: "rgba(251,191,36,0.5)", order: 3 },
  레전드리: { color: "#34d399", glow: "rgba(52,211,153,0.55)", order: 4 },
};

/** 카테고리별 표시 이모지. */
export const CATEGORY: Record<Category, { emoji: string }> = {
  무기: { emoji: "⚔️" },
  방어구: { emoji: "🛡️" },
  장신구: { emoji: "💍" },
  소비: { emoji: "🧪" },
  몬스터: { emoji: "👾" },
  펫: { emoji: "🐾" },
};

export const CATEGORIES = Object.keys(CATEGORY) as Category[];
export const RARITIES = (Object.keys(RARITY) as Rarity[]).sort(
  (a, b) => RARITY[a].order - RARITY[b].order,
);

/**
 * 원격 아이콘 로드 실패 시 사용할 인라인 SVG 아이콘을 생성한다.
 * 외부 CDN 의존 없이도 카드가 항상 의도된 모습으로 보이도록 보장한다.
 */
export function fallbackIcon(name: string, category: Category, rarity: Rarity): string {
  const color = RARITY[rarity].color;
  const emoji = CATEGORY[category].emoji;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160">
  <defs>
    <radialGradient id="g" cx="50%" cy="36%" r="72%">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0b0e14" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="160" height="160" fill="#10141d"/>
  <rect width="160" height="160" fill="url(#g)"/>
  <text x="80" y="92" font-size="56" text-anchor="middle">${emoji}</text>
  <text x="80" y="138" font-size="13" fill="${color}" text-anchor="middle" font-family="sans-serif">${name}</text>
</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

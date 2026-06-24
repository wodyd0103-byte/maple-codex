import type { CodexEntry } from "../types";

/** maplestory.io 공개 아이콘 CDN URL 생성기. */
const GMS = (kind: "item" | "mob", mapleId: number): string =>
  kind === "mob"
    ? `https://maplestory.io/api/GMS/247/mob/${mapleId}/render/stand`
    : `https://maplestory.io/api/GMS/247/item/${mapleId}/icon`;

/**
 * 도감 데이터셋. 실제 API 연동 대신 큐레이션된 정적 데이터를 사용해
 * 데모가 네트워크 상태와 무관하게 항상 동작하도록 했다.
 * 아이콘만 maplestory.io 에서 가져오며, 실패 시 SVG 폴백으로 대체된다.
 */
export const CODEX: CodexEntry[] = [
  // ── 무기 ──────────────────────────────────────────────
  {
    id: 1, name: "블루 보우", category: "무기", rarity: "일반", level: 30,
    icon: GMS("item", 1452002),
    desc: "초보 궁수가 즐겨 쓰는 평범한 활. 가볍고 다루기 쉽다.",
    stats: [{ label: "공격력", value: "+34" }, { label: "요구 레벨", value: "30" }],
  },
  {
    id: 2, name: "레드 카타나", category: "무기", rarity: "레어", level: 55,
    icon: GMS("item", 1332006),
    desc: "붉은 기운이 감도는 단검. 빠른 연속 공격에 특화되어 있다.",
    stats: [{ label: "공격력", value: "+72" }, { label: "공격 속도", value: "빠름" }],
  },
  {
    id: 3, name: "도로스 스피어", category: "무기", rarity: "에픽", level: 120,
    icon: GMS("item", 1432064),
    desc: "고대 전사들이 사용했다는 창. 긴 사거리와 강한 관통력을 자랑한다.",
    stats: [{ label: "공격력", value: "+148" }, { label: "STR", value: "+25" }],
  },
  {
    id: 4, name: "제로 투핸드소드", category: "무기", rarity: "유니크", level: 100,
    icon: GMS("item", 1402045),
    desc: "양손으로 휘두르는 대검. 한 방의 파괴력에 모든 것을 건 무기.",
    stats: [{ label: "공격력", value: "+196" }, { label: "보스 데미지", value: "+15%" }],
  },
  {
    id: 5, name: "파프니르 완드", category: "무기", rarity: "레전드리", level: 140,
    icon: GMS("item", 1372185),
    desc: "용의 정수가 깃든 전설의 마법봉. 마력의 흐름을 증폭시킨다.",
    stats: [{ label: "마력", value: "+221" }, { label: "INT", value: "+30" }],
  },
  // ── 방어구 ────────────────────────────────────────────
  {
    id: 6, name: "가죽 갑옷", category: "방어구", rarity: "일반", level: 20,
    icon: GMS("item", 1040002),
    desc: "질긴 가죽으로 만든 기본 갑옷. 초반 사냥에 무난하다.",
    stats: [{ label: "방어력", value: "+40" }],
  },
  {
    id: 7, name: "미스릴 아머", category: "방어구", rarity: "레어", level: 60,
    icon: GMS("item", 1040104),
    desc: "미스릴을 단조해 만든 갑옷. 가벼우면서도 단단하다.",
    stats: [{ label: "방어력", value: "+120" }, { label: "DEX", value: "+8" }],
  },
  {
    id: 8, name: "드래곤테일", category: "방어구", rarity: "유니크", level: 110,
    icon: GMS("item", 1042200),
    desc: "용의 비늘을 엮어 만든 상의. 화염 저항이 매우 높다.",
    stats: [{ label: "방어력", value: "+260" }, { label: "HP", value: "+600" }],
  },
  // ── 장신구 ────────────────────────────────────────────
  {
    id: 9, name: "황금 귀고리", category: "장신구", rarity: "레어", level: 70,
    icon: GMS("item", 1032062),
    desc: "은은하게 빛나는 황금 귀고리. 착용자의 품격을 높인다.",
    stats: [{ label: "올스탯", value: "+5" }],
  },
  {
    id: 10, name: "마법사의 반지", category: "장신구", rarity: "에픽", level: 90,
    icon: GMS("item", 1112300),
    desc: "고대 마법사의 인장이 새겨진 반지. 마력을 끌어올린다.",
    stats: [{ label: "마력", value: "+18" }, { label: "INT", value: "+12" }],
  },
  {
    id: 11, name: "영웅의 펜던트", category: "장신구", rarity: "레전드리", level: 130,
    icon: GMS("item", 1122017),
    desc: "영웅에게만 허락된 펜던트. 모든 능력을 비약적으로 끌어올린다.",
    stats: [{ label: "올스탯", value: "+15" }, { label: "보스 데미지", value: "+10%" }],
  },
  // ── 소비 ──────────────────────────────────────────────
  {
    id: 12, name: "빨간 포션", category: "소비", rarity: "일반", level: 10,
    icon: GMS("item", 2000000),
    desc: "HP를 소량 회복하는 기본 물약. 모험가의 필수품.",
    stats: [{ label: "HP 회복", value: "+50" }],
  },
  {
    id: 13, name: "파란 포션", category: "소비", rarity: "일반", level: 10,
    icon: GMS("item", 2000001),
    desc: "MP를 소량 회복하는 기본 물약. 마법사에게 특히 유용하다.",
    stats: [{ label: "MP 회복", value: "+100" }],
  },
  {
    id: 14, name: "엘릭서", category: "소비", rarity: "레어", level: 60,
    icon: GMS("item", 2000005),
    desc: "HP와 MP를 동시에 크게 회복하는 고급 물약.",
    stats: [{ label: "HP/MP 회복", value: "50%" }],
  },
  {
    id: 15, name: "파워 엘릭서", category: "소비", rarity: "에픽", level: 80,
    icon: GMS("item", 2000006),
    desc: "HP와 MP를 완전히 회복시키는 최상급 물약. 보스전의 생명줄.",
    stats: [{ label: "HP/MP 회복", value: "100%" }],
  },
  // ── 몬스터 ────────────────────────────────────────────
  {
    id: 16, name: "주황버섯", category: "몬스터", rarity: "일반", level: 8,
    icon: GMS("mob", 100004),
    desc: "초보 사냥터의 명물. 둥근 몸에 표정이 귀엽지만 은근히 단단하다.",
    stats: [{ label: "HP", value: "80" }, { label: "경험치", value: "16" }],
  },
  {
    id: 17, name: "슬라임", category: "몬스터", rarity: "일반", level: 6,
    icon: GMS("mob", 210100),
    desc: "말랑말랑한 초록 젤리 몬스터. 모험가의 첫 사냥감으로 유명하다.",
    stats: [{ label: "HP", value: "55" }, { label: "경험치", value: "10" }],
  },
  {
    id: 18, name: "머쉬맘", category: "몬스터", rarity: "에픽", level: 55,
    icon: GMS("mob", 6130101),
    desc: "거대한 버섯 보스. 포자를 흩뿌리며 주변에 독을 퍼뜨린다.",
    stats: [{ label: "HP", value: "75,000" }, { label: "경험치", value: "3,200" }],
  },
  {
    id: 19, name: "발록", category: "몬스터", rarity: "유니크", level: 80,
    icon: GMS("mob", 8150000),
    desc: "어둠의 날개를 가진 마수. 강력한 광역 공격으로 파티를 위협한다.",
    stats: [{ label: "HP", value: "880,000" }, { label: "경험치", value: "28,000" }],
  },
  {
    id: 20, name: "자쿰", category: "몬스터", rarity: "레전드리", level: 140,
    icon: GMS("mob", 8800002),
    desc: "용암 깊은 곳에 봉인된 전설의 보스. 여러 개의 팔을 차례로 부숴야 한다.",
    stats: [{ label: "HP", value: "42,000,000" }, { label: "경험치", value: "1,200,000" }],
  },
  // ── 펫 ────────────────────────────────────────────────
  {
    id: 21, name: "미니 주황버섯", category: "펫", rarity: "레어", level: 1,
    icon: GMS("item", 5000029),
    desc: "주황버섯을 꼭 닮은 작은 펫. 아이템을 자동으로 주워 준다.",
    stats: [{ label: "효과", value: "자동 줍기" }],
  },
  {
    id: 22, name: "핑크빈", category: "펫", rarity: "유니크", level: 1,
    icon: GMS("item", 5000080),
    desc: "전설의 보스를 본뜬 귀여운 펫. 함께 다니면 시선을 독차지한다.",
    stats: [{ label: "효과", value: "자동 줍기 · 버프 유지" }],
  },
];

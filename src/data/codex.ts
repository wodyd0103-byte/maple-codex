import type { CodexEntry } from "../types";

/**
 * maplestory.io 공개 아이콘 CDN URL 생성기.
 * - 아이템: KMS(한국) 389 버전 → 카드에 노출되는 한글 이름과 정확히 일치하는 아이콘
 * - 몬스터: GMS 247 의 render/stand (자쿰 등 일부 보스는 KMS render 프레임이 없어 GMS 사용)
 */
const ICON = (kind: "item" | "mob", mapleId: number): string =>
  kind === "mob"
    ? `https://maplestory.io/api/GMS/247/mob/${mapleId}/render/stand`
    : `https://maplestory.io/api/KMS/389/item/${mapleId}/icon`;

/**
 * 도감 데이터셋. 실제 API 연동 대신 큐레이션된 정적 데이터를 사용해
 * 데모가 네트워크 상태와 무관하게 항상 동작하도록 했다.
 * 이름은 모두 maplestory.io 의 실제 게임 데이터(아이템 KMS/389, 몬스터)에서
 * 확인한 정식 명칭이며, 아이콘 ID 와 1:1 로 일치한다.
 * 아이콘만 원격에서 가져오며, 실패 시 SVG 폴백으로 대체된다.
 */
export const CODEX: CodexEntry[] = [
  // ── 무기 ──────────────────────────────────────────────
  {
    id: 1, name: "워 보우", category: "무기", rarity: "일반", level: 30,
    icon: ICON("item", 1452002),
    desc: "초보 궁수가 즐겨 쓰는 평범한 활. 가볍고 다루기 쉽다.",
    stats: [{ label: "공격력", value: "+34" }, { label: "요구 레벨", value: "30" }],
  },
  {
    id: 2, name: "필드 대거", category: "무기", rarity: "레어", level: 55,
    icon: ICON("item", 1332006),
    desc: "야외 전투용으로 다듬어진 단검. 빠른 연속 공격에 특화되어 있다.",
    stats: [{ label: "공격력", value: "+72" }, { label: "공격 속도", value: "빠름" }],
  },
  {
    id: 3, name: "벨룸 스피어", category: "무기", rarity: "에픽", level: 120,
    icon: ICON("item", 1432066),
    desc: "벨룸의 기운이 깃든 양손 창. 긴 사거리와 강한 관통력을 자랑한다.",
    stats: [{ label: "공격력", value: "+148" }, { label: "STR", value: "+25" }],
  },
  {
    id: 4, name: "참마도", category: "무기", rarity: "유니크", level: 100,
    icon: ICON("item", 1402005),
    desc: "양손으로 휘두르는 대형 도. 한 방의 파괴력에 모든 것을 건 무기.",
    stats: [{ label: "공격력", value: "+196" }, { label: "보스 데미지", value: "+15%" }],
  },
  {
    id: 5, name: "다이몬의 완드", category: "무기", rarity: "레전드리", level: 140,
    icon: ICON("item", 1372010),
    desc: "마룡의 정수가 깃든 전설의 마법봉. 마력의 흐름을 증폭시킨다.",
    stats: [{ label: "마력", value: "+221" }, { label: "INT", value: "+30" }],
  },
  // ── 방어구 ────────────────────────────────────────────
  {
    id: 6, name: "하얀 반팔 면티", category: "방어구", rarity: "일반", level: 20,
    icon: ICON("item", 1040002),
    desc: "가볍고 시원한 기본 상의. 초반 사냥에 무난하다.",
    stats: [{ label: "방어력", value: "+40" }],
  },
  {
    id: 7, name: "오리할콘 플라틴", category: "방어구", rarity: "레어", level: 60,
    icon: ICON("item", 1040104),
    desc: "오리할콘을 단조해 만든 갑옷. 가벼우면서도 단단하다.",
    stats: [{ label: "방어력", value: "+120" }, { label: "DEX", value: "+8" }],
  },
  {
    id: 8, name: "드래곤테일 메이지로브", category: "방어구", rarity: "유니크", level: 110,
    icon: ICON("item", 1052315),
    desc: "용의 꼬리를 형상화한 마법사용 로브. 마력 친화도가 매우 높다.",
    stats: [{ label: "방어력", value: "+260" }, { label: "INT", value: "+20" }],
  },
  // ── 장신구 ────────────────────────────────────────────
  {
    id: 9, name: "금 링 귀고리", category: "장신구", rarity: "레어", level: 70,
    icon: ICON("item", 1032004),
    desc: "은은하게 빛나는 금빛 귀고리. 착용자의 품격을 높인다.",
    stats: [{ label: "올스탯", value: "+5" }],
  },
  {
    id: 10, name: "문스톤링 1캐럿", category: "장신구", rarity: "에픽", level: 90,
    icon: ICON("item", 1112300),
    desc: "달빛을 머금은 문스톤이 박힌 반지. 마력을 끌어올린다.",
    stats: [{ label: "마력", value: "+18" }, { label: "INT", value: "+12" }],
  },
  {
    id: 11, name: "정령의 펜던트", category: "장신구", rarity: "레전드리", level: 130,
    icon: ICON("item", 1122017),
    desc: "정령의 가호가 깃든 펜던트. 착용 시간이 쌓일수록 경험치 획득량이 늘어난다.",
    stats: [{ label: "추가 경험치", value: "최대 +30%" }, { label: "올스탯", value: "+15" }],
  },
  // ── 소비 ──────────────────────────────────────────────
  {
    id: 12, name: "빨간 포션", category: "소비", rarity: "일반", level: 10,
    icon: ICON("item", 2000000),
    desc: "붉은 약초로 만든 물약. HP를 약 50 회복시킨다. 모험가의 필수품.",
    stats: [{ label: "HP 회복", value: "+50" }],
  },
  {
    id: 13, name: "파란 포션", category: "소비", rarity: "일반", level: 10,
    icon: ICON("item", 2000003),
    desc: "푸른 약초로 만든 물약. MP를 약 100 회복시킨다. 마법사에게 특히 유용하다.",
    stats: [{ label: "MP 회복", value: "+100" }],
  },
  {
    id: 14, name: "파워 엘릭서", category: "소비", rarity: "에픽", level: 80,
    icon: ICON("item", 2000005),
    desc: "전설의 비약. HP와 MP를 모두 회복시키는 최상급 물약. 보스전의 생명줄.",
    stats: [{ label: "HP/MP 회복", value: "전체" }],
  },
  {
    id: 15, name: "마나 엘릭서", category: "소비", rarity: "레어", level: 60,
    icon: ICON("item", 2000006),
    desc: "전설의 비약. MP를 약 300 회복시키는 고급 물약. 마법사의 든든한 동반자.",
    stats: [{ label: "MP 회복", value: "+300" }],
  },
  // ── 몬스터 ────────────────────────────────────────────
  {
    id: 16, name: "주황버섯", category: "몬스터", rarity: "일반", level: 8,
    icon: ICON("mob", 100004),
    desc: "초보 사냥터의 명물. 둥근 몸에 표정이 귀엽지만 은근히 단단하다.",
    stats: [{ label: "HP", value: "80" }, { label: "경험치", value: "16" }],
  },
  {
    id: 17, name: "슬라임", category: "몬스터", rarity: "일반", level: 6,
    icon: ICON("mob", 210100),
    desc: "말랑말랑한 초록 젤리 몬스터. 모험가의 첫 사냥감으로 유명하다.",
    stats: [{ label: "HP", value: "55" }, { label: "경험치", value: "10" }],
  },
  {
    id: 18, name: "머쉬맘", category: "몬스터", rarity: "에픽", level: 55,
    icon: ICON("mob", 6130101),
    desc: "거대한 버섯 보스. 포자를 흩뿌리며 주변에 독을 퍼뜨린다.",
    stats: [{ label: "HP", value: "75,000" }, { label: "경험치", value: "3,200" }],
  },
  {
    id: 19, name: "크림슨 발록", category: "몬스터", rarity: "유니크", level: 80,
    icon: ICON("mob", 8150000),
    desc: "어둠의 날개를 가진 마수. 강력한 광역 공격으로 파티를 위협한다.",
    stats: [{ label: "HP", value: "880,000" }, { label: "경험치", value: "28,000" }],
  },
  {
    id: 20, name: "자쿰", category: "몬스터", rarity: "레전드리", level: 140,
    icon: ICON("mob", 8800000),
    desc: "용암 깊은 곳에 봉인된 전설의 보스. 여러 개의 팔을 차례로 부숴야 한다.",
    stats: [{ label: "HP", value: "42,000,000" }, { label: "경험치", value: "1,200,000" }],
  },
  // ── 펫 ────────────────────────────────────────────────
  {
    id: 21, name: "분홍색토끼", category: "펫", rarity: "레어", level: 1,
    icon: ICON("item", 5000002),
    desc: "올망졸망 귀여운 분홍색 토끼 펫. 아이템을 자동으로 주워 준다.",
    stats: [{ label: "효과", value: "자동 줍기" }],
  },
  {
    id: 22, name: "팬더", category: "펫", rarity: "유니크", level: 1,
    icon: ICON("item", 5000008),
    desc: "흔히 볼 수 없는 희귀한 팬더 펫. 함께 다니면 시선을 독차지한다.",
    stats: [{ label: "효과", value: "자동 줍기 · 버프 유지" }],
  },
];

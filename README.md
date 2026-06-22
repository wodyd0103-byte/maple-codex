# 📜 메이플 코덱스 (Maple Codex)

게임 콘텐츠 도감 갤러리 — **React + TypeScript** 로 만든 프론트엔드 포트폴리오 데모.
무기 · 방어구 · 장신구 · 소비 · 몬스터 · 펫을 카드 그리드로 보여주고, 실시간 검색 · 다중 필터 · 정렬 · 즐겨찾기를 제공한다.

> 🔗 **라이브 데모: https://maple-codex.vercel.app**
> 💻 코드: https://github.com/wodyd0103-byte/maple-codex

## ✨ 주요 기능

- 🔍 **실시간 검색** — 이름 부분 일치 필터링
- 🧩 **다중 필터** — 카테고리 칩 + 희귀도 드롭다운 동시 적용
- ↕️ **정렬** — 희귀도순 / 레벨순 / 이름순(한글 로케일 정렬)
- ⭐ **즐겨찾기** — `localStorage` 영속 저장(새로고침해도 유지)
- 🪟 **상세 모달** — 배경 블러, 스탯 표, `Esc`·배경 클릭으로 닫기, 스크롤 잠금
- 🖼️ **점진적 향상(progressive enhancement)** — 인라인 SVG 폴백 아이콘을 즉시 표시하고, 원격 아이콘(maplestory.io)이 로드되면 교체 → 외부 CDN 이 느리거나 막혀도 빈 화면 없음
- 📱 **반응형 그리드** — 2 → 5 열 (모바일 ~ 데스크탑)
- 🎨 희귀도별 색상 시스템(테두리·광량·배지)

## 🛠️ 기술 스택

| 분류 | 사용 기술 |
|---|---|
| 프레임워크 | React 19 |
| 언어 | TypeScript |
| 빌드 도구 | Vite |
| 스타일 | Tailwind CSS v4 |
| 상태 | React Hooks (`useState`, `useMemo`, 커스텀 훅) |
| 영속화 | localStorage (`useLocalStorage` 커스텀 훅) |

## 🚀 실행

```bash
npm install
npm run dev      # 개발 서버 (http://localhost:5173)
npm run build    # 타입 체크 + 프로덕션 빌드
npm run preview  # 빌드 결과 미리보기
```

## 📁 구조

```
src/
├─ components/      # Toolbar, ItemCard, DetailModal (프레젠테이션 컴포넌트)
├─ hooks/           # useLocalStorage, useIconSrc (재사용 로직)
├─ lib/             # meta.ts (희귀도·카테고리 메타, SVG 폴백 생성)
├─ data/            # codex.ts (정적 도감 데이터셋)
├─ types.ts         # 공용 타입 정의
└─ App.tsx          # 필터·정렬·상태 조합
```

## 📝 비고

- 도감 데이터는 데모 안정성을 위해 **정적 데이터셋**으로 구성했다. 아이콘만 [maplestory.io](https://maplestory.io) 공개 API 에서 가져오며, 실패 시 자동 생성된 SVG 아이콘으로 대체된다.
- 아이콘 © maplestory.io / Nexon — 학습·포트폴리오 목적의 비상업적 사용.

## ☁️ 배포 (Vercel)

1. 이 저장소를 GitHub 에 푸시
2. [vercel.com](https://vercel.com) 에서 저장소 import → 프레임워크 자동 감지(Vite)
3. 배포 완료 후 라이브 URL 을 위 "라이브 데모" 에 기입

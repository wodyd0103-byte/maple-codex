import type { ReactNode } from "react";
import type { Category, Rarity, SortKey } from "../types";
import { CATEGORIES, CATEGORY, RARITIES, RARITY } from "../lib/meta";

interface Props {
  query: string;
  onQuery: (v: string) => void;
  category: Category | "전체";
  onCategory: (v: Category | "전체") => void;
  rarity: Rarity | "전체";
  onRarity: (v: Rarity | "전체") => void;
  sort: SortKey;
  onSort: (v: SortKey) => void;
  favOnly: boolean;
  onFavOnly: (v: boolean) => void;
}

const SORTS: SortKey[] = ["희귀도", "레벨", "이름"];

export function Toolbar({
  query, onQuery, category, onCategory, rarity, onRarity,
  sort, onSort, favOnly, onFavOnly,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {/* 검색 + 정렬 + 즐겨찾기 */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            🔍
          </span>
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="이름으로 검색…"
            className="w-full rounded-xl border border-slate-700/70 bg-slate-900/60 py-2.5 pl-10 pr-9 text-sm text-slate-100 outline-none transition focus:border-sky-500/70 focus:bg-slate-900"
          />
          {query && (
            <button
              onClick={() => onQuery("")}
              aria-label="검색어 지우기"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-1.5 text-slate-500 hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>

        <select
          value={rarity}
          onChange={(e) => onRarity(e.target.value as Rarity | "전체")}
          className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500/70"
        >
          <option value="전체">희귀도 전체</option>
          {RARITIES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => onSort(e.target.value as SortKey)}
          className="rounded-xl border border-slate-700/70 bg-slate-900/60 px-3 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500/70"
        >
          {SORTS.map((s) => (
            <option key={s} value={s}>{s}순</option>
          ))}
        </select>

        <button
          onClick={() => onFavOnly(!favOnly)}
          aria-pressed={favOnly}
          className={`rounded-xl border px-3 py-2.5 text-sm transition ${
            favOnly
              ? "border-amber-400/70 bg-amber-400/15 text-amber-300"
              : "border-slate-700/70 bg-slate-900/60 text-slate-300 hover:text-slate-100"
          }`}
        >
          ★ 즐겨찾기만
        </button>
      </div>

      {/* 카테고리 칩 */}
      <div className="flex flex-wrap gap-2">
        <Chip active={category === "전체"} onClick={() => onCategory("전체")}>
          전체
        </Chip>
        {CATEGORIES.map((c) => (
          <Chip key={c} active={category === c} onClick={() => onCategory(c)}>
            <span className="mr-1">{CATEGORY[c].emoji}</span>
            {c}
          </Chip>
        ))}
      </div>

      {/* 희귀도 범례 */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
        {RARITIES.map((r) => (
          <span key={r} className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: RARITY[r].color }}
            />
            {r}
          </span>
        ))}
      </div>
    </div>
  );
}

function Chip({
  active, onClick, children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
        active
          ? "border-sky-400/70 bg-sky-400/15 text-sky-200"
          : "border-slate-700/70 bg-slate-900/40 text-slate-400 hover:border-slate-500 hover:text-slate-200"
      }`}
    >
      {children}
    </button>
  );
}

import { useMemo, useState } from "react";
import type { Category, CodexEntry, Rarity, SortKey } from "./types";
import { CODEX } from "./data/codex";
import { RARITY } from "./lib/meta";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Toolbar } from "./components/Toolbar";
import { ItemCard } from "./components/ItemCard";
import { DetailModal } from "./components/DetailModal";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "전체">("전체");
  const [rarity, setRarity] = useState<Rarity | "전체">("전체");
  const [sort, setSort] = useState<SortKey>("희귀도");
  const [favOnly, setFavOnly] = useState(false);
  const [selected, setSelected] = useState<CodexEntry | null>(null);

  const [favorites, setFavorites] = useLocalStorage<number[]>("maple-codex:favs", []);
  const favSet = useMemo(() => new Set(favorites), [favorites]);

  const toggleFav = (id: number) =>
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = CODEX.filter((e) => {
      if (q && !e.name.toLowerCase().includes(q)) return false;
      if (category !== "전체" && e.category !== category) return false;
      if (rarity !== "전체" && e.rarity !== rarity) return false;
      if (favOnly && !favSet.has(e.id)) return false;
      return true;
    });

    return filtered.sort((a, b) => {
      if (sort === "이름") return a.name.localeCompare(b.name, "ko");
      if (sort === "레벨") return a.level - b.level;
      return RARITY[b.rarity].order - RARITY[a.rarity].order; // 희귀도 높은 순
    });
  }, [query, category, rarity, favOnly, favSet, sort]);

  return (
    <div className="mx-auto flex min-h-full max-w-6xl flex-col px-4 py-8 sm:px-6">
      {/* 헤더 */}
      <header className="mb-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="bg-gradient-to-r from-sky-300 via-violet-300 to-emerald-300 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl">
              📜 메이플 코덱스
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              게임 콘텐츠 도감 — 검색 · 필터 · 정렬 · 즐겨찾기를 갖춘 React + TypeScript 데모
            </p>
          </div>
          <a
            href="#repo"
            className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
          >
            ⌥ GitHub
          </a>
        </div>

        {/* 통계 */}
        <div className="mt-5 flex flex-wrap gap-2.5 text-sm">
          <Stat label="전체" value={CODEX.length} />
          <Stat label="표시 중" value={list.length} accent="#38bdf8" />
          <Stat label="즐겨찾기" value={favorites.length} accent="#fbbf24" />
        </div>
      </header>

      {/* 툴바 */}
      <Toolbar
        query={query} onQuery={setQuery}
        category={category} onCategory={setCategory}
        rarity={rarity} onRarity={setRarity}
        sort={sort} onSort={setSort}
        favOnly={favOnly} onFavOnly={setFavOnly}
      />

      {/* 그리드 */}
      <main className="mt-7 flex-1">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-20 text-center">
            <div className="text-4xl">🔎</div>
            <p className="mt-3 text-slate-400">조건에 맞는 항목이 없어요.</p>
            <button
              onClick={() => {
                setQuery(""); setCategory("전체"); setRarity("전체"); setFavOnly(false);
              }}
              className="mt-4 rounded-lg border border-slate-600 px-4 py-2 text-sm text-slate-300 hover:text-slate-100"
            >
              필터 초기화
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {list.map((entry) => (
              <ItemCard
                key={entry.id}
                entry={entry}
                isFav={favSet.has(entry.id)}
                onToggleFav={toggleFav}
                onOpen={setSelected}
              />
            ))}
          </div>
        )}
      </main>

      {/* 푸터 */}
      <footer className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
        Vite · React · TypeScript · Tailwind CSS — 포트폴리오 데모. 아이콘 © maplestory.io
      </footer>

      {/* 상세 모달 */}
      <DetailModal
        entry={selected}
        isFav={selected ? favSet.has(selected.id) : false}
        onToggleFav={toggleFav}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: string }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 px-3.5 py-2">
      <span className="text-slate-500">{label} </span>
      <span className="font-bold" style={{ color: accent ?? "#e5e7eb" }}>
        {value}
      </span>
    </div>
  );
}

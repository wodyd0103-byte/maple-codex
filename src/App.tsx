import { useMemo } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import type { Category, CodexEntry, Rarity, SortKey } from "./types";
import { CODEX } from "./data/codex";
import { CATEGORIES, RARITY } from "./lib/meta";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Toolbar } from "./components/Toolbar";
import { ItemCard } from "./components/ItemCard";
import { DetailModal } from "./components/DetailModal";

const SORT_KEYS: SortKey[] = ["희귀도", "레벨", "이름"];

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Codex />} />
      <Route path="/item/:id" element={<Codex />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function Codex() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { id } = useParams();

  // ── 필터 상태를 URL 쿼리에서 파생 → 공유·북마크·새로고침에 안전 ──
  const query = params.get("q") ?? "";
  const category = coerce<Category>(params.get("cat"), CATEGORIES, "전체");
  const rarity = coerce<Rarity>(
    params.get("rarity"),
    Object.keys(RARITY) as Rarity[],
    "전체",
  );
  const sort = (SORT_KEYS.includes(params.get("sort") as SortKey)
    ? params.get("sort")
    : "희귀도") as SortKey;
  const favOnly = params.get("fav") === "1";

  const setParam = (key: string, value: string, isDefault: boolean) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (isDefault || !value) next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true },
    );

  // ── 즐겨찾기는 localStorage (개인 설정이라 URL 에 두지 않음) ──
  const [favorites, setFavorites] = useLocalStorage<number[]>("maple-codex:favs", []);
  const favSet = useMemo(() => new Set(favorites), [favorites]);
  const toggleFav = (itemId: number) =>
    setFavorites((prev) =>
      prev.includes(itemId) ? prev.filter((x) => x !== itemId) : [...prev, itemId],
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
      return RARITY[b.rarity].order - RARITY[a.rarity].order;
    });
  }, [query, category, rarity, favOnly, favSet, sort]);

  // ── 상세 항목은 URL 경로(/item/:id)에서 결정 → 딥링크 가능 ──
  const selected: CodexEntry | null = id
    ? CODEX.find((e) => e.id === Number(id)) ?? null
    : null;
  const search = params.toString();
  const openItem = (entry: CodexEntry) =>
    navigate({ pathname: `/item/${entry.id}`, search });
  const closeItem = () => navigate({ pathname: "/", search });

  return (
    <div className="mx-auto flex min-h-full max-w-6xl flex-col px-4 py-8 sm:px-6">
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
            href="https://github.com/wodyd0103-byte/maple-codex"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-2 text-sm text-slate-300 transition hover:border-slate-500 hover:text-slate-100"
          >
            ⌥ GitHub
          </a>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5 text-sm">
          <Stat label="전체" value={CODEX.length} />
          <Stat label="표시 중" value={list.length} accent="#38bdf8" />
          <Stat label="즐겨찾기" value={favorites.length} accent="#fbbf24" />
        </div>
      </header>

      <Toolbar
        query={query}
        onQuery={(v) => setParam("q", v, v === "")}
        category={category}
        onCategory={(v) => setParam("cat", v, v === "전체")}
        rarity={rarity}
        onRarity={(v) => setParam("rarity", v, v === "전체")}
        sort={sort}
        onSort={(v) => setParam("sort", v, v === "희귀도")}
        favOnly={favOnly}
        onFavOnly={(v) => setParam("fav", "1", !v)}
      />

      <main className="mt-7 flex-1">
        {list.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 py-20 text-center">
            <div className="text-4xl">🔎</div>
            <p className="mt-3 text-slate-400">조건에 맞는 항목이 없어요.</p>
            <button
              onClick={() => setParams({}, { replace: true })}
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
                onOpen={openItem}
              />
            ))}
          </div>
        )}
      </main>

      <footer className="mt-12 border-t border-slate-800 pt-6 text-center text-xs text-slate-600">
        Vite · React · TypeScript · Tailwind CSS — 포트폴리오 데모. 아이콘 © maplestory.io
      </footer>

      <DetailModal
        entry={selected}
        isFav={selected ? favSet.has(selected.id) : false}
        onToggleFav={toggleFav}
        onClose={closeItem}
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

function NotFound() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="text-6xl">🗺️</div>
      <h1 className="text-2xl font-bold text-slate-100">페이지를 찾을 수 없어요</h1>
      <Link
        to="/"
        className="rounded-xl border border-sky-400/70 bg-sky-400/15 px-5 py-2.5 text-sm text-sky-200 transition hover:bg-sky-400/25"
      >
        도감으로 돌아가기
      </Link>
    </div>
  );
}

/** URL 값이 허용 집합에 없으면 "전체" 로 안전하게 폴백한다. */
function coerce<T extends string>(
  value: string | null,
  allowed: T[],
  fallback: "전체",
): T | "전체" {
  return value && (allowed as string[]).includes(value) ? (value as T) : fallback;
}

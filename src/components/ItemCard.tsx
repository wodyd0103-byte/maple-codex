import type { CodexEntry } from "../types";
import { CATEGORY, RARITY } from "../lib/meta";
import { useIconSrc } from "../hooks/useIconSrc";

interface Props {
  entry: CodexEntry;
  isFav: boolean;
  onToggleFav: (id: number) => void;
  onOpen: (entry: CodexEntry) => void;
}

export function ItemCard({ entry, isFav, onToggleFav, onOpen }: Props) {
  const src = useIconSrc(entry);
  const meta = RARITY[entry.rarity];

  return (
    <button
      onClick={() => onOpen(entry)}
      className="group relative flex flex-col items-center rounded-2xl border bg-slate-900/50 p-4 text-center transition duration-200 hover:-translate-y-1 hover:bg-slate-900/80"
      style={{
        borderColor: `${meta.color}55`,
        boxShadow: `0 0 0 1px ${meta.color}22`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 12px 30px -10px ${meta.glow}, 0 0 0 1px ${meta.color}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 1px ${meta.color}22`;
      }}
    >
      {/* 즐겨찾기 별 */}
      <span
        role="button"
        tabIndex={0}
        aria-label={isFav ? "즐겨찾기 해제" : "즐겨찾기 추가"}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFav(entry.id);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            onToggleFav(entry.id);
          }
        }}
        className={`absolute right-2.5 top-2.5 z-10 cursor-pointer text-lg transition ${
          isFav ? "text-amber-300" : "text-slate-600 hover:text-slate-300"
        }`}
      >
        {isFav ? "★" : "☆"}
      </span>

      {/* 아이콘 */}
      <div
        className="mb-3 flex h-24 w-24 items-center justify-center rounded-xl"
        style={{ background: `radial-gradient(circle at 50% 38%, ${meta.color}22, transparent 70%)` }}
      >
        <img
          src={src}
          alt={entry.name}
          loading="lazy"
          className="max-h-20 max-w-20 object-contain transition group-hover:scale-110"
        />
      </div>

      {/* 이름 */}
      <span className="line-clamp-1 text-sm font-semibold text-slate-100">
        {entry.name}
      </span>

      {/* 메타 */}
      <span className="mt-1 text-xs text-slate-500">
        {CATEGORY[entry.category].emoji} {entry.category} · Lv.{entry.level}
      </span>

      {/* 희귀도 배지 */}
      <span
        className="mt-2 rounded-full px-2 py-0.5 text-[11px] font-medium"
        style={{ background: `${meta.color}1f`, color: meta.color }}
      >
        {entry.rarity}
      </span>
    </button>
  );
}

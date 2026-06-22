import { useEffect } from "react";
import type { CodexEntry } from "../types";
import { CATEGORY, RARITY } from "../lib/meta";
import { useIconSrc } from "../hooks/useIconSrc";

interface Props {
  entry: CodexEntry | null;
  isFav: boolean;
  onToggleFav: (id: number) => void;
  onClose: () => void;
}

export function DetailModal({ entry, isFav, onToggleFav, onClose }: Props) {
  if (!entry) return null;
  return (
    <ModalContent
      entry={entry}
      isFav={isFav}
      onToggleFav={onToggleFav}
      onClose={onClose}
    />
  );
}

function ModalContent({
  entry,
  isFav,
  onToggleFav,
  onClose,
}: {
  entry: CodexEntry;
  isFav: boolean;
  onToggleFav: (id: number) => void;
  onClose: () => void;
}) {
  const src = useIconSrc(entry);
  const meta = RARITY[entry.rarity];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="animate-fade fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${entry.name} 상세`}
    >
      <div
        className="animate-pop w-full max-w-md overflow-hidden rounded-2xl border bg-slate-900 shadow-2xl"
        style={{ borderColor: `${meta.color}66` }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div
          className="relative flex items-center gap-4 p-5"
          style={{ background: `linear-gradient(180deg, ${meta.color}1f, transparent)` }}
        >
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl"
            style={{ background: `radial-gradient(circle at 50% 40%, ${meta.color}33, transparent 70%)` }}
          >
            <img src={src} alt={entry.name} className="max-h-16 max-w-16 object-contain" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-xl font-bold text-slate-50">{entry.name}</h2>
            <p className="mt-1 text-sm text-slate-400">
              {CATEGORY[entry.category].emoji} {entry.category} · Lv.{entry.level}
            </p>
            <span
              className="mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium"
              style={{ background: `${meta.color}26`, color: meta.color }}
            >
              {entry.rarity}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="닫기"
            className="absolute right-3 top-3 rounded-lg px-2 py-1 text-slate-400 transition hover:bg-slate-800 hover:text-slate-100"
          >
            ✕
          </button>
        </div>

        {/* 본문 */}
        <div className="space-y-4 p-5 pt-2">
          <p className="text-sm leading-relaxed text-slate-300">{entry.desc}</p>

          <div className="grid grid-cols-2 gap-2">
            {entry.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-lg border border-slate-700/60 bg-slate-800/40 px-3 py-2"
              >
                <div className="text-xs text-slate-500">{s.label}</div>
                <div className="text-sm font-semibold text-slate-100">{s.value}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onToggleFav(entry.id)}
            className={`w-full rounded-xl border py-2.5 text-sm font-medium transition ${
              isFav
                ? "border-amber-400/70 bg-amber-400/15 text-amber-300"
                : "border-slate-700 bg-slate-800/50 text-slate-300 hover:text-slate-100"
            }`}
          >
            {isFav ? "★ 즐겨찾기 해제" : "☆ 즐겨찾기에 추가"}
          </button>
        </div>
      </div>
    </div>
  );
}

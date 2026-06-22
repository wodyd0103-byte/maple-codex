import { useEffect, useState } from "react";
import type { CodexEntry } from "../types";
import { fallbackIcon } from "../lib/meta";

/**
 * 항상 즉시 보이는 인라인 SVG 폴백 아이콘을 먼저 반환하고,
 * 원격 아이콘(maplestory.io)이 성공적으로 로드되면 그때 교체한다.
 * → 외부 CDN 이 느리거나 막혀 있어도 빈 아이콘이 보이지 않는다(점진적 향상).
 */
export function useIconSrc(entry: CodexEntry): string {
  const [src, setSrc] = useState(() =>
    fallbackIcon(entry.name, entry.category, entry.rarity),
  );

  useEffect(() => {
    let alive = true;
    setSrc(fallbackIcon(entry.name, entry.category, entry.rarity));
    const img = new Image();
    img.onload = () => {
      if (alive) setSrc(entry.icon);
    };
    img.src = entry.icon;
    return () => {
      alive = false;
    };
  }, [entry]);

  return src;
}

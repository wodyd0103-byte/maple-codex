import { useEffect, useState } from "react";

/**
 * localStorage 에 동기화되는 useState. 새로고침 후에도 값이 유지된다.
 * (즐겨찾기 목록 저장에 사용)
 */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* 저장 실패는 조용히 무시 (사생활 모드 등) */
    }
  }, [key, value]);

  return [value, setValue] as const;
}

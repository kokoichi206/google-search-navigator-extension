import { EXCLUDED_SELECTORS } from "./selectors";

export interface SearchResult {
  element: HTMLElement;
  link: HTMLAnchorElement;
}

const SEARCH_ROOT = "#rso";
const RESULT_LINK_QUERY = "a h3";
// 兄弟に a h3 を持つ要素が最低何個あればコンテナ階層とみなすか
const MIN_SIBLING_RESULTS = 2;

function isVisible(el: HTMLElement): boolean {
  return el.offsetParent !== null;
}

function isExcluded(el: HTMLElement): boolean {
  return EXCLUDED_SELECTORS.some((selector) => el.closest(selector) !== null);
}

/**
 * a h3 のアンカーから上にたどり、同じ親の兄弟にも a h3 が存在する
 * 階層を見つけて、その要素を結果コンテナとして返す。
 * クラス名に依存せず、DOM の構造的特徴のみで判定する。
 */
function findContainer(
  anchor: HTMLAnchorElement,
  root: Element
): HTMLElement | null {
  let el: HTMLElement | null = anchor;
  while (el && el !== root) {
    const parent: HTMLElement | null = el.parentElement;
    if (!parent || parent === root) break;

    const siblingsWithH3 = Array.from(parent.children).filter((s) =>
      s.querySelector(RESULT_LINK_QUERY)
    );
    if (siblingsWithH3.length >= MIN_SIBLING_RESULTS) {
      return el;
    }
    el = parent;
  }
  return el;
}

export function detectResults(): SearchResult[] {
  const root = document.querySelector(SEARCH_ROOT);
  if (!root) return [];

  const h3s = root.querySelectorAll<HTMLElement>(RESULT_LINK_QUERY);
  const seen = new Set<HTMLElement>();
  const results: SearchResult[] = [];

  h3s.forEach((h3) => {
    const anchor = h3.closest("a") as HTMLAnchorElement | null;
    if (!anchor || isExcluded(anchor)) return;

    const container = findContainer(anchor, root);
    if (!container || seen.has(container)) return;
    if (!isVisible(container)) return;

    seen.add(container);
    results.push({ element: container, link: anchor });
  });

  return results;
}

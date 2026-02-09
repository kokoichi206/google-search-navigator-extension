import {
  RESULT_SELECTORS,
  RESULT_LINK_SELECTORS,
  EXCLUDED_SELECTORS,
} from "./selectors";

export interface SearchResult {
  element: HTMLElement;
  link: HTMLAnchorElement;
}

function isVisible(el: HTMLElement): boolean {
  return el.offsetParent !== null;
}

function isExcluded(el: HTMLElement): boolean {
  return EXCLUDED_SELECTORS.some((selector) => el.closest(selector) !== null);
}

function findLink(container: HTMLElement): HTMLAnchorElement | null {
  for (const selector of RESULT_LINK_SELECTORS) {
    const h3 = container.querySelector<HTMLElement>(selector);
    if (h3) {
      const anchor = h3.closest("a") as HTMLAnchorElement | null;
      if (anchor) return anchor;
    }
  }
  return null;
}

export function detectResults(): SearchResult[] {
  for (const selector of RESULT_SELECTORS) {
    const elements = document.querySelectorAll<HTMLElement>(selector);
    if (elements.length === 0) continue;

    const results: SearchResult[] = [];
    elements.forEach((el) => {
      if (!isVisible(el) || isExcluded(el)) return;
      const link = findLink(el);
      if (link) {
        results.push({ element: el, link });
      }
    });

    if (results.length > 0) return results;
  }

  return [];
}

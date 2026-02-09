import { PAGINATION, SEARCH_BOX_SELECTORS } from "./selectors";
import { detectResults, type SearchResult } from "./result-detector";
import { applyHighlight, removeHighlight, clearAllHighlights } from "./highlight";

let results: SearchResult[] = [];
let currentIndex = -1;

function isInputFocused(): boolean {
  const active = document.activeElement;
  if (!active) return false;

  if (
    active instanceof HTMLInputElement ||
    active instanceof HTMLTextAreaElement
  ) {
    return true;
  }

  if ((active as HTMLElement).isContentEditable) return true;

  for (const selector of SEARCH_BOX_SELECTORS) {
    if (active.matches(selector)) return true;
  }

  return false;
}

function setActiveIndex(index: number): void {
  if (currentIndex >= 0 && currentIndex < results.length) {
    removeHighlight(results[currentIndex].element);
  }

  currentIndex = index;

  if (currentIndex >= 0 && currentIndex < results.length) {
    const result = results[currentIndex];
    applyHighlight(result.element);
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === results.length - 1;
    result.element.scrollIntoView({
      block: isFirst ? "end" : isLast ? "start" : "nearest",
      behavior: "smooth",
    });
  }
}

function handleKeyDown(e: KeyboardEvent): void {
  if (isInputFocused()) return;

  switch (e.key) {
    case "ArrowDown": {
      e.preventDefault();
      if (results.length === 0) return;
      if (currentIndex + 1 >= results.length) return;
      setActiveIndex(currentIndex + 1);
      break;
    }

    case "ArrowUp": {
      e.preventDefault();
      if (results.length === 0 || currentIndex <= 0) return;
      setActiveIndex(currentIndex - 1);
      break;
    }

    case "ArrowRight": {
      const nextPage = document.querySelector<HTMLAnchorElement>(
        PAGINATION.next
      );
      if (nextPage) nextPage.click();
      break;
    }

    case "ArrowLeft": {
      const prevPage = document.querySelector<HTMLAnchorElement>(
        PAGINATION.prev
      );
      if (prevPage) prevPage.click();
      break;
    }

    case "Enter": {
      if (currentIndex < 0 || currentIndex >= results.length) return;
      e.preventDefault();
      const link = results[currentIndex].link;
      if (e.ctrlKey || e.metaKey) {
        window.open(link.href, "_blank");
      } else {
        link.click();
      }
      break;
    }
  }
}

export function refreshResults(): void {
  const previousUrl =
    currentIndex >= 0 && currentIndex < results.length
      ? results[currentIndex].link.href
      : null;

  clearAllHighlights();
  results = detectResults();
  currentIndex = -1;

  if (previousUrl) {
    const restored = results.findIndex((r) => r.link.href === previousUrl);
    if (restored >= 0) {
      setActiveIndex(restored);
    }
  }
}

export function initialize(): void {
  results = detectResults();
  document.addEventListener("keydown", handleKeyDown);
}

import { OBSERVER_TARGETS } from "./selectors";
import { refreshResults } from "./navigator";

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function onMutation(): void {
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(refreshResults, 200);
}

export function startObserver(): void {
  let target: Element | null = null;
  for (const selector of OBSERVER_TARGETS) {
    target = document.querySelector(selector);
    if (target) break;
  }

  if (!target) return;

  const observer = new MutationObserver(onMutation);
  observer.observe(target, { childList: true, subtree: true });
}

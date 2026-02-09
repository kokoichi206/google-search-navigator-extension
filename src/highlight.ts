const ACTIVE_CLASS = "gsn-active";

export function applyHighlight(element: HTMLElement): void {
  element.classList.add(ACTIVE_CLASS);
}

export function removeHighlight(element: HTMLElement): void {
  element.classList.remove(ACTIVE_CLASS);
}

export function clearAllHighlights(): void {
  document.querySelectorAll(`.${ACTIVE_CLASS}`).forEach((el) => {
    el.classList.remove(ACTIVE_CLASS);
  });
}

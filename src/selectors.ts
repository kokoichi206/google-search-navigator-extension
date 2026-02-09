export const RESULT_SELECTORS = [
  "#rso > div[data-hveid]",
  "#search .g:not(.kno-kp)",
  "#rso > div > div[data-hveid]",
] as const;

export const RESULT_LINK_SELECTORS = [
  "a h3",
  "a[data-ved] h3",
] as const;

export const PAGINATION = {
  next: "#pnnext",
  prev: "#pnprev",
} as const;

export const SEARCH_BOX_SELECTORS = [
  'input[name="q"]',
  'textarea[name="q"]',
] as const;

export const EXCLUDED_SELECTORS = [
  ".related-question-pair",
  "#rhs",
  ".kp-blk",
] as const;

export const OBSERVER_TARGETS = ["#rso", "#search"] as const;

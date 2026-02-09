export const PAGINATION = {
  next: "#pnnext",
  prev: "#pnprev",
} as const;

export const SEARCH_BOX_SELECTORS = [
  'input[name="q"]',
  'textarea[name="q"]',
] as const;

export const EXCLUDED_SELECTORS = [
  "[data-initq]",
  "[data-sgrd]",
] as const;

export const OBSERVER_TARGETS = ["#rso", "#search"] as const;

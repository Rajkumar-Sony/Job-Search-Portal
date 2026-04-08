export function createEmptyPage(size = 10) {
  return {
    content: [],
    page: 0,
    size,
    totalItems: 0,
    totalPages: 0,
    hasNext: false,
    hasPrevious: false,
    loadTimeMs: 0
  };
}

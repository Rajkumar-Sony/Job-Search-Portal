export function getErrorMessage(error, fallback) {
  if (error?.message && String(error.message).trim()) {
    return error.message;
  }
  return fallback;
}

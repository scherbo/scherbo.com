export function getQueryParams(
  searchParams: URLSearchParams,
): Record<string, string> {
  const query: Record<string, string> = {};

  for (const [key, value] of searchParams) {
    query[key] = value;
  }

  return query;
}

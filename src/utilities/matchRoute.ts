export function matchRoute(
  registeredPath: string,
  providedPath: string,
): Record<string, string> | null {
  const registered = registeredPath.split("/");
  const provided = providedPath.split("/");

  if (registered.length !== provided.length) return null;

  const match: Record<string, string> = {};

  // skip 0th element, it's always going to be empty string
  for (let i = 1; i < registered.length; i++) {
    if (registered[i].startsWith(":")) {
      match[registered[i].slice(1)] = provided[i];
      continue;
    }

    if (registered[i].toLowerCase() !== provided[i].toLowerCase()) return null;
  }

  return match;
}

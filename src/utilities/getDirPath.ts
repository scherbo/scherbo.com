export function getDirPath(path: string) {
  const split = path.split("/");
  const dirPath = split.slice(1, split.length - 1).join("/");

  return `/${dirPath}`;
}

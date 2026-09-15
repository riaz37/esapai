import { execSync } from "child_process";

/**
 * Resolves the real last-modified date for a statically-defined route by
 * reading the last git commit date of the source file that renders/defines
 * its content. This avoids fabricating `lastModified: new Date()` at build
 * time for content that has a fixed, version-controlled source of truth
 * (static page components, hardcoded product/service data) rather than a
 * CMS-backed `_updatedAt` field.
 *
 * Results are cached per file path for the lifetime of the process so a
 * single sitemap generation call doesn't spawn `git log` once per locale
 * for the same file.
 *
 * Returns `undefined` (rather than a fabricated date) if the git command
 * fails for any reason — e.g. a shallow clone in CI, or a file that isn't
 * tracked — so the route's `lastModified` is simply omitted.
 */
const gitLastModifiedCache = new Map<string, Date | undefined>();

export function getGitLastModified(filePath: string): Date | undefined {
  if (gitLastModifiedCache.has(filePath)) {
    return gitLastModifiedCache.get(filePath);
  }

  let result: Date | undefined;
  try {
    const output = execSync(`git log -1 --format=%cI -- "${filePath}"`, {
      cwd: process.cwd(),
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    if (output) {
      const date = new Date(output);
      if (!Number.isNaN(date.getTime())) {
        result = date;
      }
    }
  } catch {
    result = undefined;
  }

  gitLastModifiedCache.set(filePath, result);
  return result;
}

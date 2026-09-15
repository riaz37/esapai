/**
 * IndexNow key for esap.ai. Verified via the key file at the site root:
 * public/{key}.txt — its filename and content must both equal this value.
 * If this key is ever rotated, delete the old key file and add the new one.
 */
export const INDEXNOW_KEY = "fee29d76aeabc36fcf41227fc8db56e1";

interface SubmitIndexNowOptions {
  host: string;
  urls: string[];
}

/**
 * Submits a batch of URLs to the IndexNow API (shared by Bing, Yandex, Seznam,
 * Naver, and others). Requires the key file at {host}/{INDEXNOW_KEY}.txt to
 * already be live — call this only against a deployed host.
 */
export async function submitIndexNow({ host, urls }: SubmitIndexNowOptions): Promise<void> {
  if (urls.length === 0) {
    throw new Error("submitIndexNow: no URLs provided");
  }

  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`IndexNow submission failed: ${response.status} ${response.statusText} — ${body}`);
  }
}

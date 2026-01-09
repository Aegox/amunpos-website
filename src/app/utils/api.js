export function getApiUrl() {
  return process.env.NEXT_PUBLIC_API_URL;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchWithRetry(
  url,
  options = {},
  {
    retries = 5,
    initialDelayMs = 500,
    maxDelayMs = 8000,
    timeoutMs = 15000,
  } = {},
) {
  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if ([502, 503, 504].includes(response.status)) {
        lastError = new Error(`Upstream unavailable (${response.status})`);
      } else {
        return response;
      }
    } catch (err) {
      clearTimeout(timeoutId);
      lastError = err;
    }

    if (attempt < retries) {
      const delay = Math.min(maxDelayMs, initialDelayMs * Math.pow(2, attempt));
      await sleep(delay);
    }
  }

  throw lastError || new Error('Request failed');
}

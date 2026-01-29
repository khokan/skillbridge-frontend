import { getToken } from "./auth";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL!;

type FetchOpts = RequestInit & { auth?: boolean };

export async function apiFetch<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const headers = new Headers(opts.headers);

  if (!headers.has("Content-Type") && opts.body) {
    headers.set("Content-Type", "application/json");
  }

  if (opts.auth) {
    const token = getToken();
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...opts,
    headers,
    cache: "no-store",
  });

  if (!res.ok) {
    const msg = await safeMsg(res);
    throw new Error(msg || `Request failed (${res.status})`);
  }

  return res.json();
}

async function safeMsg(res: Response) {
  try {
    const data = await res.json();
    return data?.message as string | undefined;
  } catch {
    return undefined;
  }
}

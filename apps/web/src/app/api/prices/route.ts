import { NextResponse } from "next/server";

/**
 * Proxy do CoinGecko (free tier) z cache po stronie serwera.
 * Fundament pod symulator paper-trading. Klucz opcjonalny (COINGECKO_API_KEY).
 *
 * GET /api/prices?ids=bitcoin,ethereum
 */
export const revalidate = 60; // cache 60 s

const DEFAULT_IDS = "bitcoin,ethereum,solana,cardano";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = (searchParams.get("ids") || DEFAULT_IDS)
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 25)
    .join(",");

  const url = new URL("https://api.coingecko.com/api/v3/coins/markets");
  url.searchParams.set("vs_currency", "usd");
  url.searchParams.set("ids", ids);
  url.searchParams.set("price_change_percentage", "24h");

  const headers: Record<string, string> = { accept: "application/json" };
  const apiKey = process.env.COINGECKO_API_KEY;
  if (apiKey) headers["x-cg-demo-api-key"] = apiKey;

  try {
    const res = await fetch(url, { headers, next: { revalidate: 60 } });
    if (!res.ok) {
      return NextResponse.json(
        { error: `CoinGecko ${res.status}` },
        { status: 502 },
      );
    }
    const data: Array<{
      id: string;
      symbol: string;
      name: string;
      image: string;
      current_price: number;
      price_change_percentage_24h: number | null;
    }> = await res.json();

    const prices = data.map((c) => ({
      id: c.id,
      symbol: c.symbol.toUpperCase(),
      name: c.name,
      image: c.image,
      price: c.current_price,
      change24h: c.price_change_percentage_24h ?? 0,
    }));

    return NextResponse.json({ prices });
  } catch {
    return NextResponse.json({ error: "fetch_failed" }, { status: 502 });
  }
}

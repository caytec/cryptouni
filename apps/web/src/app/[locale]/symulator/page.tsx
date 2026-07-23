"use client";

import { useEffect, useState } from "react";
import { useDictionary } from "@/components/DictionaryProvider";

interface PriceRow {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  change24h: number;
}

export default function SimulatorPage() {
  const t = useDictionary().simulator;
  const [rows, setRows] = useState<PriceRow[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/prices")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => active && setRows(d.prices))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="mt-2 text-slate-400">{t.subtitle}</p>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-800">
        <div className="grid grid-cols-3 bg-slate-900/60 px-5 py-3 text-xs uppercase tracking-wide text-slate-500">
          <span>Asset</span>
          <span className="text-right">{t.price}</span>
          <span className="text-right">{t.change24h}</span>
        </div>

        {error && <div className="px-5 py-6 text-center text-red-300">{t.error}</div>}
        {!error && !rows && (
          <div className="px-5 py-6 text-center text-slate-500">{t.loading}</div>
        )}
        {rows?.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-3 items-center border-t border-slate-800 px-5 py-3"
          >
            <span className="flex items-center gap-2 font-medium">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={row.image} alt="" className="h-5 w-5 rounded-full" />
              {row.symbol}
              <span className="text-xs text-slate-500">{row.name}</span>
            </span>
            <span className="text-right tabular-nums">
              ${row.price.toLocaleString("en-US", { maximumFractionDigits: 2 })}
            </span>
            <span
              className={`text-right tabular-nums ${
                row.change24h >= 0 ? "text-emerald-300" : "text-red-300"
              }`}
            >
              {row.change24h >= 0 ? "+" : ""}
              {row.change24h.toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

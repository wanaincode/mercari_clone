'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_BASE, authFetch } from '@/lib/api';
import type { Item } from '@/types/item';

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  useEffect(() => {
    // Redirect to /login if no token
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      window.location.href = '/login';
      return;
    }

    (async () => {
      try {
        const res = await authFetch(`${API_BASE}/api/items`, { method: 'GET' });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data?.message || `Failed to fetch items (${res.status})`);
        }
        const data = (await res.json()) as Item[];
        setItems(data);
      } catch (err: any) {
        setErrMsg(err.message ?? 'Unexpected error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 h-8 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-800" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (errMsg) {
    return (
      <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
        <div className="mx-auto max-w-2xl rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
          {errMsg}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            商品一覧
          </h1>
          <div className="flex items-center gap-3">
            <Link
              href="/items/new"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-400 dark:hover:bg-blue-500"
            >
              ＋新規出品
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900"
            >
              ログアウト
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <p className="text-zinc-600 dark:text-zinc-400">まだ商品がありません。</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((it) => (
              <Link
                key={it._id}
                href={`/items/${it._id}`}
                className="group block rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-3 aspect-video w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  {/* Simple image placeholder; replace with next/image if needed */}
                  {it.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={it.imageUrl}
                      alt={it.title}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>
                <div className="flex items-baseline justify-between">
                  <h2 className="line-clamp-1 text-base font-medium text-zinc-900 dark:text-zinc-100">
                    {it.title}
                  </h2>
                  <span className="shrink-0 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    ¥{it.price.toLocaleString()}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {it.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
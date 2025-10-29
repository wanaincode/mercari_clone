'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { API_BASE, authFetch } from '@/lib/api';
import type { Item } from '@/types/item';

export default function ItemDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [buying, setBuying] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const fetchItem = async () => {
    setLoading(true);
    setErrMsg(null);
    try {
      const res = await fetch(`${API_BASE}/api/items/${id}`);
      const data = await res.json();
      setItem(data);
    } catch (err: any) {
      setErrMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [id]);

  const handleBuy = async () => {
    if (!item) return;
    setBuying(true);
    setErrMsg(null);
    try {
      const res = await authFetch(`${API_BASE}/api/items/${item._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sold: true }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || '購入に失敗しました');
      }

      setPurchaseComplete(true);
      await fetchItem();
    } catch (err: any) {
      setErrMsg(err.message);
    } finally {
      setBuying(false);
    }
  };

  if (loading) return <div className="p-8 text-zinc-500">Loading...</div>;
  if (errMsg)
    return (
      <div className="p-8 bg-red-100 text-red-800 rounded-lg border border-red-400 max-w-3xl mx-auto my-8">
        {errMsg}
      </div>
    );
  if (!item) return <div className="p-8 text-zinc-500">商品が見つかりません。</div>;

  return (
    <div className="min-h-screen bg-zinc-50 p-8 dark:bg-black">
      <div className="mx-auto max-w-3xl rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="mb-4 aspect-video w-full rounded-xl object-cover"
        />
        <h1 className="mb-2 text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          {item.title}
        </h1>
        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          ¥{item.price.toLocaleString()}
        </p>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{item.description}</p>

        {purchaseComplete && (
          <div className="mt-4 rounded-lg bg-green-100 p-4 text-green-800 dark:bg-green-900 dark:text-green-300">
            購入完了
          </div>
        )}

        <div className="mt-6 flex gap-3">
          {item.sold ? (
            <span className="rounded-lg bg-red-600 px-4 py-2 text-white">SOLD OUT</span>
          ) : (
            <button
              onClick={handleBuy}
              disabled={buying}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {buying ? '購入中…' : '購入する'}
            </button>
          )}
          <button
            onClick={() => router.push('/items')}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
}
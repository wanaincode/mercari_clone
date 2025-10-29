"use client";
import { useState } from "react";

export default function SellPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [desc, setDesc] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const base = process.env.NEXT_PUBLIC_API_BASE;
    const token = localStorage.getItem("token"); // Later: use httpOnly cookie

    const res = await fetch(`${base}/api/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Bearer token
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        title,
        price: typeof price === "string" ? Number(price) : price,
        description: desc,
        imageUrl,
      }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert(`エラー: ${err.message ?? res.statusText}`);
      return;
    }
    const item = await res.json();
    alert(`出品成功: ${item.title}`);
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">出品</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input className="w-full border rounded p-2" placeholder="タイトル"
          value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="価格"
          value={price} onChange={(e) => setPrice(e.target.value as any)} />
        <input className="w-full border rounded p-2" placeholder="画像URL"
          value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <textarea className="w-full border rounded p-2" placeholder="説明"
          value={desc} onChange={(e) => setDesc(e.target.value)} />
        <button className="rounded bg-black text-white px-4 py-2">出品する</button>
      </form>
    </main>
  );
}
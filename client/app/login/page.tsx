'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type LoginResponse = {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5050';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  // If already logged in, redirect to /items
  useEffect(() => {
    // NOTE: Safe-guard for SSR: this page is client component ('use client')
    const token = typeof window !== 'undefined'
      ? window.localStorage.getItem('token')
      : null;
    if (token) {
      router.replace('/items');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrMsg(null);
    setLoading(true);

    try {
      // Call backend login API
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          // NOTE: Tell server we send JSON
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Parse JSON
      const data = (await res.json()) as Partial<LoginResponse> & { message?: string };

      if (!res.ok) {
        // Show backend provided error or generic one
        throw new Error(data?.message || 'Login failed');
      }

      // Persist JWT and user info
      // WARNING: Storing tokens in localStorage is simple but not the most secure option.
      // Consider HttpOnly cookies for production.
      window.localStorage.setItem('token', data!.token!);
      window.localStorage.setItem('user', JSON.stringify(data!.user!));

      // Navigate to items list
      router.push('/items');
    } catch (err: any) {
      setErrMsg(err.message ?? 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6">
        <div className="w-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">ログイン</h1>
          <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
            メールアドレスとパスワードを入力してログインしてください。
          </p>

          {errMsg && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300">
              {errMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm">メールアドレス</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950"
                placeholder="you@example.com"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm">パスワード</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-0 transition focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950"
                placeholder="••••••••"
                required
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {loading ? 'ログイン中…' : 'ログイン'}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-zinc-500 dark:text-zinc-400">
            アカウントをお持ちでない方は{' '}
            <a
              href="/register"
              className="font-medium text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
            >
              新規登録
            </a>
          </div>

          <div className="mt-6 rounded-lg bg-zinc-50 p-3 text-xs text-zinc-500 dark:bg-zinc-800/50 dark:text-zinc-400">
            {/* Helper for local dev */}
            API_BASE: <code>{API_BASE}</code>
          </div>
        </div>
      </div>
    </div>
  );
}
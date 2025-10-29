# Mercari Clone - Web全端開発練習プロジェクト

## プロジェクト概要

本プロジェクトは、Webフルスタック開発の基礎を実践的に学ぶことを目的とした、Mercari風の模擬アプリケーションである。

フロントエンドには **Next.js（App Router構成）**、バックエンドには **Express + MongoDB（Mongoose）** を採用し、**JWT認証、Tailwind CSS、API通信、CRUD操作** を一通り実装している。

---

## 使用技術スタック

| 分類 | 使用技術 |
|------|-----------|
| フロントエンド | Next.js 16 / TypeScript / Tailwind CSS v4 / React Hooks |
| バックエンド | Node.js / Express / MongoDB (Mongoose) |
| 認証・認可 | JWT（JSON Web Token） / bcryptjs |
| 開発ツール | Postman / Nodemon / ESLint / Git / GitHub |
| 環境管理 | dotenv / .env構成 / MongoDB Atlas |
| スタイリング | Tailwind CSS（PostCSS構成済み） |
| デプロイ予定 | Vercel（フロント） + Render or Railway（バックエンド） |

---

## 開発計画（5週間）

| 週 | テーマ | 主な内容 | 技術キーワード |
|----|--------|-----------|----------------|
| **第1週** | 開発環境構築 | Next.js & Express プロジェクト構成、MongoDB接続確認 | Next.js, Express, Mongoose |
| **第2週** | 認証機能 & CRUD API | JWT認証、bcryptによるパスワードハッシュ、商品CRUD実装 | JWT, bcryptjs, REST API |
| **第3週** | フロント実装（ログイン・登録） | Next.jsページ作成、API連携、localStorage保存 | Fetch API, useState, useEffect |
| **第4週** | 商品一覧・詳細・出品ページ | CRUD連携、画像表示、UI構築 | Tailwind CSS, API連携, Routing |
| **第5週** | UI改善・デプロイ | デザイン統一、環境変数整備、Vercel/Renderへデプロイ | Vercel, Render, dotenv |

---

## ディレクトリ構成

```
mercari_clone/
├── client/                      # フロントエンド (Next.js + Tailwind CSS)
│   ├── app/                     # ページとルーティング
│   ├── public/                  # 静的ファイル
│   ├── styles/                  # グローバルCSS（Tailwind含む）
│   ├── next.config.ts
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
├── server/                      # バックエンド (Express + MongoDB)
│   ├── routes/                  # ルーティング層 (auth, item, userなど)
│   ├── models/                  # Mongoose スキーマ定義
│   ├── middleware/              # JWT認証などのミドルウェア
│   ├── index.js                 # Expressエントリポイント
│   ├── package.json
│   └── .env                     # 環境変数（MongoDB URI, JWT秘密鍵など）
│
├── .gitignore
└── README.md                    # プロジェクト概要
```

---

## 学習目的

- Webアプリ開発の基礎（API設計、UI/UX構築、データ連携）を体系的に習得する  
- バックエンドからフロントまで一貫した構成を理解する  
- 実際のサービス（メルカリ）を模倣しながら、業務レベルの実装感覚を得る  
- 将来的に Firebase や GraphQL などの追加技術への拡張を見据える  

---

© 2025 WANG Meng-Chi
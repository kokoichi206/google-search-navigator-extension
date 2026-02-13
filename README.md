# Google Search Navigator Extension

Google検索結果ページで、マウスを使わずにキーボードだけで結果を移動・閲覧するためのChrome拡張です。

## 主な機能

- `ArrowDown` / `ArrowUp` で検索結果の選択を移動
- 選択中の結果を青いハイライトで可視化
- `Enter` で選択中の結果を開く
- `Ctrl+Enter`（macOSは`Cmd+Enter`）で新しいタブで開く
- `ArrowRight` / `ArrowLeft` で次/前ページへ移動
- 検索ボックスや入力欄にフォーカス中はキー操作を無効化

## 使い方

1. Googleで検索する
2. 検索ボックス以外をクリック（または `Esc` でフォーカスを外す）
3. `ArrowDown` で結果選択を開始
4. `Enter` で開く、または矢印キーで移動を継続

## インストール（開発版）

1. 依存関係をインストール

```bash
npm install
```

2. 拡張をビルド

```bash
npm run build
```

3. Chromeで `chrome://extensions` を開く
4. 「デベロッパーモード」をON
5. 「パッケージ化されていない拡張機能を読み込む」から `dist/` を選択

## 対応ドメイン

- `www.google.com`
- `www.google.co.jp`
- `www.google.co.uk`
- `www.google.de`
- `www.google.fr`
- `www.google.ca`
- `www.google.com.au`
- `www.google.co.in`
- `www.google.com.br`

## スクリーンショット

Chrome Web Store公開用スクリーンショットは `store/screenshot-1.png` / `store/screenshot-2.png` として追加予定です。

## 開発

- 開発ビルド（watch）

```bash
npm run dev
```

- 本番ビルド

```bash
npm run build
```

## プライバシー

- ユーザーデータの収集は行いません
- 追加の権限は使用しません（Google検索ページへのcontent script注入のみ）
- Privacy Policy: https://kokoichi206.github.io/google-search-navigator-extension/privacy-policy.html

## ライセンス

MIT

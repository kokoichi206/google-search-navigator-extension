# Google Search Navigator Extension

A Chrome extension for navigating Google search results entirely with the keyboard.

## Features

- `↓` / `j` to move to the next search result
- `↑` / `k` to move to the previous search result
- `→` / `l` to go to the next page
- `←` / `h` to go to the previous page
- Highlights the selected result in blue
- `Enter` to open the selected result
- `Ctrl+Enter` (`Cmd+Enter` on macOS) to open in a new tab
- Auto-selects the first result on page load
- Key bindings are disabled while the search box or any input field is focused

## Usage

1. Search on Google
2. Click outside the search box (or press `Esc` to unfocus)
3. Press `j` / `↓` to start navigating results
4. Press `Enter` to open, or `j` / `k` to continue navigating

## Installation (Development)

1. Install dependencies

```bash
npm install
```

2. Build the extension

```bash
npm run build
```

3. Open `chrome://extensions` in Chrome
4. Enable "Developer mode"
5. Click "Load unpacked" and select the `dist/` directory

## Supported Domains

- `www.google.com`
- `www.google.co.jp`
- `www.google.co.uk`
- `www.google.de`
- `www.google.fr`
- `www.google.ca`
- `www.google.com.au`
- `www.google.co.in`
- `www.google.com.br`

## Development

- Development build (watch mode)

```bash
npm run dev
```

- Production build

```bash
npm run build
```

## License

[MIT](./LICENSE)

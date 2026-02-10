import { defineConfig, type Plugin } from "vite";
import { readFileSync, writeFileSync, copyFileSync } from "fs";
import { resolve } from "path";

const pkg = JSON.parse(
  readFileSync(resolve(__dirname, "package.json"), "utf-8")
);

function manifestPlugin(isDev: boolean): Plugin {
  return {
    name: "generate-manifest",
    writeBundle() {
      const distDir = resolve(__dirname, "dist");
      const iconsDir = resolve(__dirname, "icons");
      for (const size of [16, 48, 128]) {
        copyFileSync(
          resolve(iconsDir, `icon-${size}.png`),
          resolve(distDir, `icon-${size}.png`)
        );
      }

      const manifest: Record<string, unknown> = {
        manifest_version: 3,
        name: "Google Search Navigator",
        version: pkg.version,
        description: "Navigate Google search results with keyboard arrow keys",
        icons: {
          "16": "icon-16.png",
          "48": "icon-48.png",
          "128": "icon-128.png",
        },
        content_scripts: [
          {
            matches: [
              "*://www.google.com/search*",
              "*://www.google.co.jp/search*",
              "*://www.google.co.uk/search*",
              "*://www.google.de/search*",
              "*://www.google.fr/search*",
              "*://www.google.ca/search*",
              "*://www.google.com.au/search*",
              "*://www.google.co.in/search*",
              "*://www.google.com.br/search*",
            ],
            js: ["content.js"],
            run_at: "document_idle",
          },
        ],
      };

      if (isDev) {
        manifest.background = {
          service_worker: "background.js",
        };
      }

      writeFileSync(
        resolve(__dirname, "dist/manifest.json"),
        JSON.stringify(manifest, null, 2)
      );
    },
  };
}

function devReloadPlugin(): Plugin {
  return {
    name: "dev-reload",
    writeBundle() {
      const distDir = resolve(__dirname, "dist");

      writeFileSync(resolve(distDir, ".build-id"), String(Date.now()));

      const backgroundJs = `
const BUILD_ID_URL = chrome.runtime.getURL('.build-id');
let lastBuildId = '';

async function checkForUpdates() {
  try {
    const response = await fetch(BUILD_ID_URL, { cache: 'no-store' });
    const buildId = await response.text();
    if (lastBuildId && buildId !== lastBuildId) {
      chrome.runtime.reload();
    }
    lastBuildId = buildId;
  } catch {}
}

checkForUpdates();
setInterval(checkForUpdates, 1000);
`;
      writeFileSync(resolve(distDir, "background.js"), backgroundJs.trim());
    },
  };
}

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  const plugins: Plugin[] = [manifestPlugin(isDev)];
  if (isDev) {
    plugins.push(devReloadPlugin());
  }

  return {
    build: {
      outDir: "dist",
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, "src/content.ts"),
        output: {
          format: "iife",
          entryFileNames: "content.js",
        },
      },
      minify: !isDev,
      sourcemap: isDev,
    },
    plugins,
  };
});

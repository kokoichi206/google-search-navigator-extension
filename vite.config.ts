import { defineConfig, type Plugin } from "vite";
import { writeFileSync, mkdirSync } from "fs";
import { resolve } from "path";

function manifestPlugin(isDev: boolean): Plugin {
  return {
    name: "generate-manifest",
    writeBundle() {
      const manifest: Record<string, unknown> = {
        manifest_version: 3,
        name: "Google Search Navigator",
        version: "0.1.0",
        description: "Navigate Google search results with keyboard arrow keys",
        content_scripts: [
          {
            matches: ["*://www.google.*/search*"],
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

import { cp, mkdir, access } from "node:fs/promises";
import path from "node:path";

const source = path.resolve(
  "node_modules/@designcodeio/threeui/lib-dist/assets/landing-pages"
);
const destination = path.resolve("public/landing-pages");
const customKage = path.resolve("custom/kage.html");

try {
  await access(path.join(source, "kage.html"));
} catch {
  console.error("ThreeUI KAGE assets were not found. Ensure @designcodeio/threeui is installed.");
  process.exit(1);
}

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });
// Restore the repository-owned presentation after copying the package assets.
// The package copy contains the original demo and would otherwise overwrite it.
await cp(customKage, path.join(destination, "kage.html"));
console.log("Copied ThreeUI assets and restored the customized KAGE landing page.");

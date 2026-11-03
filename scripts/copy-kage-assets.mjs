import { cp, mkdir, access } from "node:fs/promises";
import path from "node:path";

const source = path.resolve(
  "node_modules/@designcodeio/threeui/lib-dist/assets/landing-pages"
);
const destination = path.resolve("public/landing-pages");

try {
  await access(path.join(source, "kage.html"));
} catch {
  console.error("ThreeUI KAGE assets were not found. Ensure @designcodeio/threeui is installed.");
  process.exit(1);
}

await mkdir(destination, { recursive: true });
await cp(source, destination, { recursive: true });
console.log("Copied official ThreeUI landing-page assets to public/landing-pages.");

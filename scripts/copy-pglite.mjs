#!/usr/bin/env node
/**
 * PGLite loads pglite.data, pglite.wasm, and initdb.wasm from beside its
 * bundled file. Nitro does not copy those, so Vercel crashes with ENOENT.
 */
import { copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const from = join(root, "node_modules/@electric-sql/pglite/dist");
const to = join(root, ".vercel/output/functions/__server.func/_libs");
for (const name of ["pglite.data", "pglite.wasm", "initdb.wasm"]) {
  copyFileSync(join(from, name), join(to, name));
  console.log(`[pglite] copied ${name}`);
}

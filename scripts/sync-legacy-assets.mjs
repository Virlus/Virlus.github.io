import { cp, mkdir, stat } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { join, basename } from "node:path"
const root = fileURLToPath(new URL("../", import.meta.url))
await mkdir(join(root, "public"), { recursive: true })
for (const name of [
  "images",
  "data",
  "armada",
  "mipnerf",
  "mipnerf360",
  "zipnerf",
  "stylesheet.css",
]) {
  await cp(join(root, name), join(root, "public", name), {
    recursive: true,
    filter: async (source, target) => {
      if ([".DS_Store", ".git", ".gitignore"].includes(basename(source)))
        return false
      const sourceInfo = await stat(source)
      if (sourceInfo.isDirectory()) return true
      const targetInfo = await stat(target).catch(() => undefined)
      return (
        !targetInfo ||
        sourceInfo.size !== targetInfo.size ||
        sourceInfo.mtimeMs > targetInfo.mtimeMs
      )
    },
  })
}

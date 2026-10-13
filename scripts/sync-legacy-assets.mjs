import { cp, mkdir, stat } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { join, basename } from "node:path"
const root = fileURLToPath(new URL("../", import.meta.url))
await mkdir(join(root, "public"), { recursive: true })
for (const name of [
  "images",
  "data",
  "armada",
  "vam",
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
      if (name === "vam") {
        const relative = source.slice(join(root, name).length + 1)
        const runtimeEntries = [
          "index.html", "style.css", "theme.css", "script.js",
          "replacement.js", "vam.pdf", "assets",
        ]
        if (relative && !runtimeEntries.some(
          (entry) => relative === entry || relative.startsWith(`${entry}/`),
        )) return false
        if (
          relative.endsWith(".npz") ||
          relative.endsWith("-source.json") ||
          relative === "assets/box-100x.mp4"
        ) return false
      }
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

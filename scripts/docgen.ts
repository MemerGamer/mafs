import fs from "node:fs"
import { fileURLToPath } from "node:url"
import path from "node:path"
import type * as docgen from "react-docgen-typescript"

export const projectRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")

export function writeDocgenResults(docgenInfo: docgen.ComponentDoc[]) {
  const writePath = path.join(projectRoot, "docs/generated-docgen.tsx")

  docgenInfo = docgenInfo.map((inf) => ({
    ...inf,
    filePath: path.relative(projectRoot, inf.filePath),
  }))

  fs.writeFileSync(
    writePath,
    [
      `// prettier-ignore`,
      `const docgenInfo = ${JSON.stringify(docgenInfo, null, 2)} as const;`,
      `export default docgenInfo;`,
    ].join("\n") + "\n",
  )

  console.error(`Docgen updated ${writePath}`)
}

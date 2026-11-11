// Calcule l'empreinte SHA-256 d'un code promo "chasse aux stickers".
// Usage : node scripts/hash-code.mjs STICK-XXXXXX
// Copie ensuite l'empreinte affichée dans src/data/stickerCodes.js.
import { createHash } from 'node:crypto'

const raw = process.argv.slice(2).join('')
if (!raw) {
  console.error('Usage : node scripts/hash-code.mjs STICK-XXXXXX')
  process.exit(1)
}

// Même normalisation que sur le site : majuscules, espaces supprimés.
const code = raw.toUpperCase().replace(/\s+/g, '')
console.log(createHash('sha256').update(code, 'utf8').digest('hex'))

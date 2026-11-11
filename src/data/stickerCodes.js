// Ajouter un code : `node scripts/hash-code.mjs STICK-XXXXXX`, puis colle l'empreinte affichée dans STICKER_CODE_HASHES.
// Retirer un code : relance le script avec le code reçu dans l'email de commande et supprime la ligne de la même empreinte.
// Ne jamais écrire un code en clair dans ce dépôt : seules les empreintes SHA-256 (majuscules, sans espaces) y sont stockées.

export const STICKER_DISCOUNT_RATE = 0.15

export const STICKER_CODE_HASHES = new Set([
  '0101b0a491d16dae477c1ee9a6751074f5dd3016b8c77cee3298d5a7ba178499',
  '7b44a17e4bfd08417c0634608fa5d9639bad0d6c6d2b951953e73865d3c01250',
  'ac9d203d917248f69004bdc8aef645b23dfa47b053620d413572d5d4f376cd2d',
  'ea237af5317cf1f202132104f4604f67ed4fb7b349c6af5c59d6725e54b0f9ac',
  'bf664fa052937eaf71db6cb206393005124e21be24e602fadfc5d674b5c11dc0',
  'be9b2cf363ac4af87aecfd6cb39b7369cef7b1a8acf385c859edd8b0ea8d7774',
  '7e0f0da62b2bf3acbdb3e873366b8616a5a1228d77fcc9cf22e26226a8dcc8d7',
  '36eeca39b30f9b7a90ee23e429fe169dbb4dee08a0c5abef8544cc1115636a28',
  'e64a7c68c340eca9e17847afb0de84fa3c23e42cab8f833fe90c75aa88f1b20d',
  '511b7caaa1b95223b8d8d6b076197afa92d615a31e12d3a5476e2e76179721aa',
])

const USED_STORAGE_KEY = 'uir-archi-tools-used-sticker-codes'

// Même normalisation que scripts/hash-code.mjs.
export function normalizeStickerCode(raw) {
  return (raw || '').toUpperCase().replace(/\s+/g, '')
}

// Empreinte SHA-256 en hexadécimal (null si crypto.subtle est indisponible).
export async function hashStickerCode(raw) {
  try {
    const bytes = new TextEncoder().encode(normalizeStickerCode(raw))
    const digest = await crypto.subtle.digest('SHA-256', bytes)
    return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('')
  } catch {
    return null
  }
}

export function isKnownStickerHash(hash) {
  return Boolean(hash) && STICKER_CODE_HASHES.has(hash)
}

function loadUsedHashes() {
  try {
    const parsed = JSON.parse(localStorage.getItem(USED_STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function isStickerHashUsed(hash) {
  return loadUsedHashes().includes(hash)
}

export function markStickerHashUsed(hash) {
  try {
    const used = loadUsedHashes()
    if (!used.includes(hash)) {
      localStorage.setItem(USED_STORAGE_KEY, JSON.stringify([...used, hash]))
    }
  } catch {
    // localStorage indisponible : le code ne pourra pas être marqué comme utilisé sur cet appareil
  }
}

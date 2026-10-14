// ─── Profil client mémorisé sur l'appareil ───
// Pas de compte ni de mot de passe : on garde simplement dans le localStorage
// les infos du dernier formulaire de commande envoyé, pour pré-remplir le
// suivant. Rien de tout ça n'est envoyé à Formspree.
const PROFILE_STORAGE_KEY = 'uir-archi-tools-customer-profile'

const PROFILE_FIELDS = ['fullName', 'phone', 'city', 'address']

// Profil sauvegardé, ou null s'il n'y en a pas (ou s'il est incomplet / illisible).
export function loadCustomerProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : null
    if (!parsed || typeof parsed !== 'object') return null
    const isComplete = PROFILE_FIELDS.every(field => typeof parsed[field] === 'string' && parsed[field].trim() !== '')
    if (!isComplete) return null
    return { fullName: parsed.fullName, phone: parsed.phone, city: parsed.city, address: parsed.address }
  } catch {
    return null
  }
}

export function saveCustomerProfile({ fullName, phone, city, address }) {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify({ fullName, phone, city, address }))
  } catch {
    // localStorage indisponible (navigation privée, quota, etc.) — on continue sans persister
  }
}

export function clearCustomerProfile() {
  try {
    localStorage.removeItem(PROFILE_STORAGE_KEY)
  } catch {
    // localStorage indisponible (navigation privée, quota, etc.) — rien à effacer
  }
}

// Premier mot du nom complet, pour le message d'accueil.
export function profileFirstName(profile) {
  return profile?.fullName.trim().split(/\s+/)[0] || ''
}

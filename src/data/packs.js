import { PRODUCTS, isOutOfStock } from '../components/Products'

// ─── Liste des packs ───
// Seul endroit à modifier pour ajouter, retirer ou changer un pack.
//
// - `items`  : produits du catalogue qui composent le pack (slug + quantité).
// - `option` : (facultatif) un composant au choix de l'étudiant. Chaque choix
//   pointe vers un produit du catalogue ; `referencePrice` est le prix compté
//   pour ce composant dans la "valeur à l'unité", quel que soit le choix.
//
// Rien d'autre à gérer à la main : la valeur à l'unité est la somme des prix
// du catalogue, et un pack passe tout seul en rupture dès qu'un de ses
// produits est dans OUT_OF_STOCK_SLUGS (voir components/Products.jsx).
export const PACKS = [
  {
    slug: 'pack-zero-trace',
    name: 'Pack Zéro Trace',
    tag: 'Gommage net',
    hook: 'Tout pour corriger au millimètre et garder des planches impeccables jusqu\'au rendu.',
    image: '/images/pack-zero-trace.png',
    price: 105,
    items: [
      { slug: 'gomme-electrique', quantity: 1 },
      { slug: 'crayon-brosse', quantity: 1 },
      { slug: 'porte-gomme', quantity: 1 },
    ],
  },
  {
    slug: 'pack-maquette',
    name: 'Pack Maquette',
    tag: 'Prêt à monter',
    hook: 'Carton plume, colle et règle : la base pour monter ta maquette, à l\'épaisseur que tu choisis.',
    image: '/images/pack-maquette.png',
    price: 165,
    option: {
      label: 'Épaisseur des cartons plume',
      name: 'Carton plume',
      quantity: 2,
      referencePrice: 75,
      choices: [
        { value: '3mm', slug: 'carton-plume-3mm' },
        { value: '5mm', slug: 'carton-plume-5mm' },
      ],
    },
    items: [
      { slug: 'uhu', quantity: 1 },
      { slug: 'regle-30cm-plastique', quantity: 1 },
    ],
  },
  {
    slug: 'pack-dessin',
    name: 'Pack Dessin',
    tag: 'Trait précis',
    hook: 'Deux porte-mines, une règle Kutch et du scotch : le kit pour tracer net et à l\'échelle.',
    image: '/images/pack-dessin.png',
    price: 120,
    items: [
      { slug: 'porte-mine-5mm', quantity: 1 },
      { slug: 'porte-mine-7mm', quantity: 1 },
      { slug: 'scotch-tesa', quantity: 1 },
      { slug: 'regle-kutch', quantity: 1 },
    ],
  },
]

const product = slug => PRODUCTS.find(p => p.slug === slug)

export function getPack(slug) {
  return PACKS.find(p => p.slug === slug)
}

// Contenu d'un pack : [{ slug, name, quantity }]. Sans `optionValue`, le
// composant au choix est listé sous son nom générique ("Carton plume").
export function packContents(pack, optionValue) {
  const contents = []
  if (pack.option) {
    const choice = pack.option.choices.find(c => c.value === optionValue)
    contents.push({
      slug: choice?.slug || pack.option.name,
      name: choice ? product(choice.slug)?.name || `${pack.option.name} ${choice.value}` : pack.option.name,
      quantity: pack.option.quantity,
    })
  }
  pack.items.forEach(item => {
    contents.push({ slug: item.slug, name: product(item.slug)?.name || item.slug, quantity: item.quantity })
  })
  return contents
}

// Somme des prix unitaires du catalogue pour tout le contenu du pack.
export function packUnitValue(pack) {
  const fixed = pack.items.reduce((sum, item) => sum + (product(item.slug)?.price || 0) * item.quantity, 0)
  const optional = pack.option ? pack.option.referencePrice * pack.option.quantity : 0
  return fixed + optional
}

export function packSavings(pack) {
  return Math.max(0, packUnitValue(pack) - pack.price)
}

function hasFixedItemOutOfStock(pack) {
  return pack.items.some(item => isOutOfStock(item.slug))
}

// Un choix (ex. "5mm") est possible si son produit est en stock.
export function isPackChoiceAvailable(pack, value) {
  const choice = pack.option?.choices.find(c => c.value === value)
  return Boolean(choice) && !isOutOfStock(choice.slug)
}

// Pack indisponible : un produit fixe en rupture, ou plus aucun choix possible.
export function isPackOutOfStock(pack) {
  if (hasFixedItemOutOfStock(pack)) return true
  if (!pack.option) return false
  return !pack.option.choices.some(c => isPackChoiceAvailable(pack, c.value))
}

// Même contrôle pour un pack déjà configuré (ligne du panier) : seule
// l'épaisseur choisie compte.
export function isPackSelectionOutOfStock(slug, optionValue) {
  const pack = getPack(slug)
  if (!pack) return true
  if (hasFixedItemOutOfStock(pack)) return true
  return pack.option ? !isPackChoiceAvailable(pack, optionValue) : false
}

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'uir-archi-tools-cart'
const FULFILLMENT_STORAGE_KEY = 'uir-archi-tools-fulfillment'
const PROMO_STORAGE_KEY = 'uir-archi-tools-promo'

export const FREE_SHIPPING_THRESHOLD = 35
export const SHIPPING_FEE = 5

export const FULFILLMENT_DELIVERY = 'delivery'
export const FULFILLMENT_PICKUP = 'pickup'

// Code promo unique : -15% sur le sous-total des produits à prix normal
// (non cumulable avec un produit déjà en promo, ex. le Pack Débutant Archi),
// utilisable à partir de PROMO_MIN_SUBTOTAL DH d'achat.
export const PROMO_CODE = 'AMINE15'
export const PROMO_DISCOUNT_RATE = 0.15
export const PROMO_MIN_SUBTOTAL = 50

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function loadFulfillmentMethod() {
  try {
    const raw = localStorage.getItem(FULFILLMENT_STORAGE_KEY)
    return raw === FULFILLMENT_PICKUP ? FULFILLMENT_PICKUP : FULFILLMENT_DELIVERY
  } catch {
    return FULFILLMENT_DELIVERY
  }
}

function loadPromoCode() {
  try {
    const raw = localStorage.getItem(PROMO_STORAGE_KEY)
    return raw === PROMO_CODE ? PROMO_CODE : null
  } catch {
    return null
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [fulfillmentMethod, setFulfillmentMethod] = useState(loadFulfillmentMethod)
  const [appliedPromoCode, setAppliedPromoCode] = useState(loadPromoCode)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // localStorage indisponible (navigation privée, quota, etc.) — on continue sans persister
    }
  }, [items])

  useEffect(() => {
    try {
      localStorage.setItem(FULFILLMENT_STORAGE_KEY, fulfillmentMethod)
    } catch {
      // localStorage indisponible (navigation privée, quota, etc.) — on continue sans persister
    }
  }, [fulfillmentMethod])

  useEffect(() => {
    try {
      if (appliedPromoCode) {
        localStorage.setItem(PROMO_STORAGE_KEY, appliedPromoCode)
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY)
      }
    } catch {
      // localStorage indisponible (navigation privée, quota, etc.) — on continue sans persister
    }
  }, [appliedPromoCode])

  const addItem = useCallback((product, quantity) => {
    setItems(prev => {
      const existing = prev.find(i => i.slug === product.slug)
      if (existing) {
        return prev.map(i =>
          i.slug === product.slug ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          quantity,
          fixedQuantity: product.fixedQuantity || null,
          alwaysFreeShipping: product.alwaysFreeShipping || false,
          unitLabel: product.unitLabel || null,
          promoExcluded: product.promoExcluded || false,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((slug) => {
    setItems(prev => prev.filter(i => i.slug !== slug))
  }, [])

  const updateQuantity = useCallback((slug, quantity) => {
    setItems(prev => prev.map(i => (i.slug === slug ? { ...i, quantity: Math.max(1, quantity) } : i)))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setAppliedPromoCode(null)
  }, [])

  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])

  // Le code promo ne se cumule pas avec un produit déjà en promo (ex. le
  // Pack Débutant Archi) : il ne s'applique que sur le sous-total des
  // produits vendus à prix normal. C'est l'option la plus simple à
  // implémenter et la plus claire pour le client : le reste de la commande
  // continue de bénéficier de sa propre réduction, sans bloquer tout le
  // code promo si le pack traîne dans le panier.
  const promoEligibleSubtotal = useMemo(
    () => items.reduce((sum, i) => sum + (i.promoExcluded ? 0 : i.price * i.quantity), 0),
    [items]
  )

  const promoMeetsMinimum = totalPrice >= PROMO_MIN_SUBTOTAL
  const isPromoActive = appliedPromoCode === PROMO_CODE && promoMeetsMinimum
  // Le code reste "en attente" (pas retiré) si le panier repasse sous le
  // minimum après coup (ex. suppression d'un article) — il se réactive
  // automatiquement dès que le sous-total remonte à 50 DH.
  const promoBelowMinimum = appliedPromoCode === PROMO_CODE && !promoMeetsMinimum
  const promoDiscount = isPromoActive ? Math.round(promoEligibleSubtotal * PROMO_DISCOUNT_RATE) : 0
  const promoMissingAmount = Math.max(0, PROMO_MIN_SUBTOTAL - totalPrice)

  const applyPromoCode = useCallback((rawCode) => {
    const code = (rawCode || '').trim().toUpperCase()
    if (!code) {
      return { success: false, message: 'Merci de saisir un code promo.' }
    }
    if (code !== PROMO_CODE) {
      return { success: false, message: 'Ce code promo est invalide.' }
    }
    if (totalPrice < PROMO_MIN_SUBTOTAL) {
      const missing = PROMO_MIN_SUBTOTAL - totalPrice
      return {
        success: false,
        message: `Ce code est valable à partir de ${PROMO_MIN_SUBTOTAL} DH d'achat. Il te manque ${missing} DH.`,
      }
    }
    setAppliedPromoCode(code)
    return { success: true, message: `Code ${code} appliqué : -${Math.round(PROMO_DISCOUNT_RATE * 100)}%` }
  }, [totalPrice])

  const removePromoCode = useCallback(() => setAppliedPromoCode(null), [])

  const subtotalAfterDiscount = totalPrice - promoDiscount
  const hasAlwaysFreeShippingItem = items.some(i => i.alwaysFreeShipping)
  const isFreeShipping = hasAlwaysFreeShippingItem || subtotalAfterDiscount >= FREE_SHIPPING_THRESHOLD
  const isPickup = fulfillmentMethod === FULFILLMENT_PICKUP
  const shippingFee = items.length === 0 || isFreeShipping || isPickup ? 0 : SHIPPING_FEE
  const orderTotal = subtotalAfterDiscount + shippingFee
  const amountToFreeShipping = isFreeShipping ? 0 : Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalAfterDiscount)
  const freeShippingProgress = isFreeShipping ? 1 : Math.min(1, subtotalAfterDiscount / FREE_SHIPPING_THRESHOLD)

  const value = useMemo(
    () => ({
      items, addItem, removeItem, updateQuantity, clearCart, totalCount, totalPrice,
      shippingFee, orderTotal, isFreeShipping, amountToFreeShipping, freeShippingProgress,
      fulfillmentMethod, setFulfillmentMethod, isPickup,
      appliedPromoCode, applyPromoCode, removePromoCode, isPromoActive, promoBelowMinimum,
      promoDiscount, promoMissingAmount, subtotalAfterDiscount,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalCount, totalPrice,
      shippingFee, orderTotal, isFreeShipping, amountToFreeShipping, freeShippingProgress,
      fulfillmentMethod, isPickup,
      appliedPromoCode, applyPromoCode, removePromoCode, isPromoActive, promoBelowMinimum,
      promoDiscount, promoMissingAmount, subtotalAfterDiscount]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart doit être utilisé à l\'intérieur de CartProvider')
  return ctx
}

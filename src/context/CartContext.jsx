import { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'uir-archi-tools-cart'
const FULFILLMENT_STORAGE_KEY = 'uir-archi-tools-fulfillment'

export const FREE_SHIPPING_THRESHOLD = 35
export const SHIPPING_FEE = 5

export const FULFILLMENT_DELIVERY = 'delivery'
export const FULFILLMENT_PICKUP = 'pickup'

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

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [fulfillmentMethod, setFulfillmentMethod] = useState(loadFulfillmentMethod)

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

  const clearCart = useCallback(() => setItems([]), [])

  const totalCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])
  const totalPrice = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])

  const hasAlwaysFreeShippingItem = items.some(i => i.alwaysFreeShipping)
  const isFreeShipping = hasAlwaysFreeShippingItem || totalPrice >= FREE_SHIPPING_THRESHOLD
  const isPickup = fulfillmentMethod === FULFILLMENT_PICKUP
  const shippingFee = items.length === 0 || isFreeShipping || isPickup ? 0 : SHIPPING_FEE
  const orderTotal = totalPrice + shippingFee
  const amountToFreeShipping = isFreeShipping ? 0 : Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice)
  const freeShippingProgress = isFreeShipping ? 1 : Math.min(1, totalPrice / FREE_SHIPPING_THRESHOLD)

  const value = useMemo(
    () => ({
      items, addItem, removeItem, updateQuantity, clearCart, totalCount, totalPrice,
      shippingFee, orderTotal, isFreeShipping, amountToFreeShipping, freeShippingProgress,
      fulfillmentMethod, setFulfillmentMethod, isPickup,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, totalCount, totalPrice,
      shippingFee, orderTotal, isFreeShipping, amountToFreeShipping, freeShippingProgress,
      fulfillmentMethod, isPickup]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart doit être utilisé à l\'intérieur de CartProvider')
  return ctx
}

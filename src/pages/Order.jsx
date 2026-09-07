import { useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { PRODUCTS } from '../components/Products'
import { useCart } from '../context/CartContext'
import Toast from '../components/Toast'

const QUANTITIES = Array.from({ length: 10 }, (_, i) => i + 1)

const fieldStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 'var(--radius-sm)',
  padding: '13px 16px',
  color: '#fff',
  fontFamily: 'Rubik, sans-serif',
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.2s',
}

function focusField(e) { e.currentTarget.style.borderColor = '#FFD600' }
function blurField(e) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '13px',
        color: 'rgba(255,255,255,0.7)', letterSpacing: '0.3px',
      }}>
        {label}
      </span>
      {children}
    </label>
  )
}

export default function Order() {
  const { slug } = useParams()
  const reduce = useReducedMotion()
  const product = PRODUCTS.find(p => p.slug === slug)
  const { addItem, totalCount } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!showToast) return
    const timer = setTimeout(() => setShowToast(false), 2200)
    return () => clearTimeout(timer)
  }, [showToast])

  if (!product) return <Navigate to="/shop" replace />

  const total = product.price * quantity

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product, quantity)
    setShowToast(true)
  }

  return (
    <section style={{
      padding: '160px 24px 120px',
      background: 'var(--bg-deep)',
      position: 'relative', overflow: 'hidden',
      minHeight: '100vh',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,214,0,0.35), transparent)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(45,47,196,0.32) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            marginBottom: '28px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}
        >
          <Link
            to="/shop"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Rubik, sans-serif', fontWeight: 500, fontSize: '14px',
              color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFD600'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            ← Retour à la boutique
          </Link>

          <Link
            to="/panier"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '14px',
              color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFD600'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            Panier {totalCount > 0 ? `(${totalCount})` : ''} →
          </Link>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: '40px', textAlign: 'center' }}
        >
          <span style={{
            display: 'inline-block',
            background: 'rgba(255,214,0,0.14)', border: '1px solid rgba(255,214,0,0.32)',
            color: '#FFD600', fontFamily: 'Outfit, sans-serif',
            fontWeight: 600, fontSize: '12px', letterSpacing: '1.5px',
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px', marginBottom: '20px',
          }}>
            Fiche produit
          </span>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4.5vw, 42px)', color: '#fff',
            letterSpacing: '-1.2px', lineHeight: 1.1, marginBottom: '14px',
          }}>
            {product.name}
          </h1>

          {product.subtitle && (
            <p style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '15px',
              color: '#FFD600', margin: '0 0 10px',
            }}>
              {product.subtitle}
            </p>
          )}

          {product.contentDescription && (
            <p style={{
              fontFamily: 'Rubik, sans-serif', fontSize: '14px', lineHeight: 1.7,
              color: 'rgba(255,255,255,0.6)', margin: '0 0 20px', maxWidth: '460px',
              marginLeft: 'auto', marginRight: 'auto',
            }}>
              {product.contentDescription}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {product.originalPrice && (
              <span style={{
                fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '16px',
                color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through',
              }}>
                {product.originalPrice} DH
              </span>
            )}
            <span style={{
              display: 'inline-block',
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '20px',
              color: '#06071E', background: '#FFD600',
              padding: '8px 20px', borderRadius: '100px',
            }}>
              {product.price} MAD
            </span>
            {product.originalPrice && (
              <span style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.4)',
                color: '#34D399', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '12px',
                padding: '5px 12px', borderRadius: '100px',
              }}>
                Économise {product.originalPrice - product.price} DH
              </span>
            )}
          </div>

          {product.alwaysFreeShipping && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,214,0,0.1)', border: '1px solid rgba(255,214,0,0.3)',
              color: '#FFD600', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '13px',
              padding: '8px 16px', borderRadius: '100px', marginTop: '16px',
            }}>
              🚚 Livraison gratuite incluse, peu importe le montant
            </div>
          )}
        </motion.div>

        <motion.form
          onSubmit={handleAddToCart}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius)',
            padding: '32px',
            display: 'flex', flexDirection: 'column', gap: '20px',
          }}
        >
          <Field label={product.fixedQuantity ? 'Nombre de paquets' : 'Quantité'}>
            {product.fixedQuantity ? (
              <>
                <select
                  required value={quantity}
                  onChange={e => setQuantity(Number(e.target.value))}
                  onFocus={focusField} onBlur={blurField}
                  style={{ ...fieldStyle, cursor: 'pointer' }}
                >
                  {QUANTITIES.map(q => (
                    <option key={q} value={q} style={{ background: '#0B0C35', color: '#fff' }}>
                      {q}
                    </option>
                  ))}
                </select>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '4px', display: 'block' }}>
                  Vendu uniquement par paquet de {product.fixedQuantity}
                </span>
              </>
            ) : (
              <select
                required value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                onFocus={focusField} onBlur={blurField}
                style={{ ...fieldStyle, cursor: 'pointer' }}
              >
                {QUANTITIES.map(q => (
                  <option key={q} value={q} style={{ background: '#0B0C35', color: '#fff' }}>
                    {q}
                  </option>
                ))}
              </select>
            )}
          </Field>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(255,214,0,0.1)',
            border: '1px solid rgba(255,214,0,0.35)',
            borderRadius: 'var(--radius-sm)',
            padding: '18px 22px',
            marginTop: '4px',
          }}>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '14px',
              color: 'rgba(255,255,255,0.75)', letterSpacing: '0.3px',
            }}>
              Sous-total
            </span>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '24px',
              color: '#FFD600',
            }}>
              {total} MAD
            </span>
          </div>

          <motion.button
            type="submit"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              background: '#FFD600', color: '#06071E',
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '17px',
              padding: '17px 30px', borderRadius: '100px',
              boxShadow: '0 0 40px rgba(255,214,0,0.35)',
              marginTop: '8px', width: '100%',
              cursor: 'pointer',
            }}
            whileHover={reduce ? {} : { scale: 1.03, boxShadow: '0 0 60px rgba(255,214,0,0.55)' }}
            whileTap={reduce ? {} : { scale: 0.97 }}
          >
            <CartIcon />
            {product.ctaLabel || 'Ajouter au panier'}
          </motion.button>

          <Link
            to="/panier"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '14px',
              color: 'rgba(255,255,255,0.55)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFD600'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
          >
            Voir mon panier et passer la commande →
          </Link>
        </motion.form>
      </div>

      <Toast show={showToast}>
        <CheckIcon /> Ajouté au panier ✓
      </Toast>
    </section>
  )
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

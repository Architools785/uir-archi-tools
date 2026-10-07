import { useEffect, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { getPack, packContents, isPackOutOfStock, isPackChoiceAvailable } from '../data/packs'
import PackPrice from '../components/PackPrice'
import OutOfStockBadge from '../components/OutOfStockBadge'
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

const labelStyle = {
  fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '13px',
  color: 'rgba(255,255,255,0.7)', letterSpacing: '0.3px',
}

function focusField(e) { e.currentTarget.style.borderColor = '#FFD600' }
function blurField(e) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }

export default function PackDetail() {
  const { slug } = useParams()
  const reduce = useReducedMotion()
  const pack = getPack(slug)
  const { addItem, totalCount } = useCart()

  // Option présélectionnée : le premier choix encore en stock.
  const [optionValue, setOptionValue] = useState(
    () => pack?.option?.choices.find(c => isPackChoiceAvailable(pack, c.value))?.value || null
  )
  const [quantity, setQuantity] = useState(1)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (!showToast) return
    const timer = setTimeout(() => setShowToast(false), 2200)
    return () => clearTimeout(timer)
  }, [showToast])

  if (!pack) return <Navigate to="/packs" replace />

  const { option } = pack
  const outOfStock = isPackOutOfStock(pack)
  const contents = packContents(pack, optionValue)
  const total = pack.price * quantity

  // Un pack = une seule ligne du panier. Chaque épaisseur a sa propre ligne.
  const cartProduct = {
    slug: pack.slug,
    cartKey: option ? `${pack.slug}--${optionValue}` : pack.slug,
    name: option ? `${pack.name} — ${option.name.toLowerCase()} ${optionValue}` : pack.name,
    price: pack.price,
    unitLabel: 'pack',
    // Un pack est déjà à prix réduit : le code promo ne s'y cumule pas.
    promoExcluded: true,
    isPack: true,
    packOption: optionValue,
  }

  const handleAddToCart = (e) => {
    e.preventDefault()
    if (outOfStock) return
    addItem(cartProduct, quantity)
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
            to="/packs"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Rubik, sans-serif', fontWeight: 500, fontSize: '14px',
              color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFD600'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            ← Retour aux packs
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
          style={{ marginBottom: '32px', textAlign: 'center' }}
        >
          <div style={{
            position: 'relative', aspectRatio: '1024 / 541', overflow: 'hidden',
            borderRadius: 'var(--radius)', marginBottom: '28px',
            background: '#1e1b4b', boxShadow: '0 0 0 1px rgba(255,255,255,0.08)',
          }}>
            <img
              src={pack.image}
              alt={pack.name}
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: outOfStock ? 'grayscale(0.85) brightness(0.6)' : 'none',
              }}
            />
          </div>

          <span style={{
            display: 'inline-block',
            background: 'rgba(255,214,0,0.14)', border: '1px solid rgba(255,214,0,0.32)',
            color: '#FFD600', fontFamily: 'Outfit, sans-serif',
            fontWeight: 600, fontSize: '12px', letterSpacing: '1.5px',
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px', marginBottom: '20px',
          }}>
            {pack.tag}
          </span>
          {outOfStock && (
            <div style={{ marginBottom: '16px' }}>
              <OutOfStockBadge />
            </div>
          )}
          <h1 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4.5vw, 42px)', color: '#fff',
            letterSpacing: '-1.2px', lineHeight: 1.1, marginBottom: '14px',
          }}>
            {pack.name}
          </h1>
          <p style={{
            fontFamily: 'Rubik, sans-serif', fontSize: '15px', lineHeight: 1.7,
            color: 'rgba(255,255,255,0.6)', margin: '0 auto 22px', maxWidth: '460px',
          }}>
            {pack.hook}
          </p>

          <PackPrice pack={pack} large center />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius)',
            padding: '24px 32px',
            marginBottom: '20px',
          }}
        >
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '17px',
            color: '#fff', marginBottom: '8px',
          }}>
            Contenu du pack
          </h2>
          <ul style={{ listStyle: 'none' }}>
            {contents.map((item, i) => (
              <li key={item.slug} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                padding: '12px 0',
                borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
              }}>
                <span style={{ fontFamily: 'Rubik, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.85)' }}>
                  {item.name}
                </span>
                <span style={{
                  fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '13px',
                  color: '#FFD600', background: 'rgba(255,214,0,0.12)',
                  border: '1px solid rgba(255,214,0,0.3)',
                  padding: '3px 12px', borderRadius: '100px', whiteSpace: 'nowrap',
                }}>
                  × {item.quantity}
                </span>
              </li>
            ))}
          </ul>
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
          {outOfStock && (
            <div role="status" style={{
              fontFamily: 'Rubik, sans-serif', fontSize: '14px', lineHeight: 1.6,
              color: 'rgba(255,255,255,0.75)', background: 'rgba(255,107,107,0.1)',
              border: '1px solid rgba(255,107,107,0.35)',
              borderRadius: 'var(--radius-sm)', padding: '14px 18px',
            }}>
              <strong style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontSize: '16px', color: '#FF6B6B', marginBottom: '4px' }}>
                Actuellement en rupture de stock
              </strong>
              Un des produits de ce pack est en rupture : il ne peut pas être commandé pour le moment. Suis-nous sur Instagram pour savoir quand il revient.
            </div>
          )}

          <fieldset disabled={outOfStock} style={{ border: 'none', padding: 0, margin: 0, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px', opacity: outOfStock ? 0.5 : 1 }}>
            {option && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span id="pack-option-label" style={labelStyle}>{option.label}</span>
                <div role="radiogroup" aria-labelledby="pack-option-label" style={{
                  display: 'grid', gridTemplateColumns: `repeat(${option.choices.length}, 1fr)`, gap: '6px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '100px', padding: '5px',
                }}>
                  {option.choices.map(choice => {
                    const available = isPackChoiceAvailable(pack, choice.value)
                    const active = available && optionValue === choice.value
                    return (
                      <button
                        key={choice.value}
                        type="button"
                        role="radio"
                        aria-checked={active}
                        disabled={!available}
                        onClick={() => setOptionValue(choice.value)}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px',
                          background: active ? '#FFD600' : 'transparent',
                          color: active ? '#06071E' : available ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.3)',
                          border: 'none', borderRadius: '100px',
                          padding: '10px 12px',
                          cursor: available ? 'pointer' : 'not-allowed',
                          transition: 'background 0.2s, color 0.2s',
                        }}
                      >
                        <span style={{
                          fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '15px',
                          textDecoration: available ? 'none' : 'line-through',
                        }}>
                          {choice.value}
                        </span>
                        <span style={{
                          fontFamily: 'Rubik, sans-serif', fontSize: '11px',
                          color: available ? 'inherit' : '#FF6B6B',
                          opacity: available ? (active ? 0.75 : 0.55) : 1,
                        }}>
                          {available ? `${option.quantity} cartons plume` : 'Rupture de stock'}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
                  Même épaisseur pour les {option.quantity} cartons. Le prix du pack ne change pas.
                </span>
              </div>
            )}

            <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={labelStyle}>Nombre de packs</span>
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
            </label>

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
          </fieldset>

          <motion.button
            type="submit"
            disabled={outOfStock}
            aria-disabled={outOfStock}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              background: outOfStock ? 'rgba(255,255,255,0.08)' : '#FFD600',
              color: outOfStock ? 'rgba(255,255,255,0.45)' : '#06071E',
              border: outOfStock ? '1px solid rgba(255,255,255,0.12)' : 'none',
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '17px',
              padding: '17px 30px', borderRadius: '100px',
              boxShadow: outOfStock ? 'none' : '0 0 40px rgba(255,214,0,0.35)',
              marginTop: '8px', width: '100%',
              cursor: outOfStock ? 'not-allowed' : 'pointer',
            }}
            whileHover={reduce || outOfStock ? {} : { scale: 1.03, boxShadow: '0 0 60px rgba(255,214,0,0.55)' }}
            whileTap={reduce || outOfStock ? {} : { scale: 0.97 }}
          >
            {outOfStock ? 'Indisponible' : <><CartIcon />Ajouter au panier</>}
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

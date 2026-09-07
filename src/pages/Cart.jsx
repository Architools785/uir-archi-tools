import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import FreeShippingProgress from '../components/FreeShippingProgress'

const QUANTITIES = Array.from({ length: 20 }, (_, i) => i + 1)

const selectStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 'var(--radius-sm)',
  padding: '10px 14px',
  color: '#fff',
  fontFamily: 'Rubik, sans-serif',
  fontSize: '14px',
  outline: 'none',
  cursor: 'pointer',
}

function CartRow({ item }) {
  const { updateQuantity, removeItem } = useCart()
  const subtotal = item.price * item.quantity

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="cart-row"
    >
      <div className="cart-row-name">
        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff' }}>
          {item.name}
        </div>
        {item.fixedQuantity && (
          <div style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginTop: '4px' }}>
            Paquet de {item.fixedQuantity}
          </div>
        )}
      </div>

      <div className="cart-row-price" style={{ fontFamily: 'Rubik, sans-serif', fontSize: '14px', color: 'rgba(255,255,255,0.6)', whiteSpace: 'nowrap' }}>
        {item.price} MAD {item.fixedQuantity ? '/ paquet' : `/ ${item.unitLabel || 'unité'}`}
      </div>

      <select
        value={item.quantity}
        onChange={e => updateQuantity(item.slug, Number(e.target.value))}
        style={selectStyle}
        className="cart-row-qty"
        aria-label={`Quantité pour ${item.name}`}
      >
        {QUANTITIES.map(q => (
          <option key={q} value={q} style={{ background: '#0B0C35', color: '#fff' }}>
            {q}{item.fixedQuantity ? ` paquet${q > 1 ? 's' : ''}` : ''}
          </option>
        ))}
      </select>

      <div className="cart-row-subtotal" style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '16px',
        color: '#FFD600', whiteSpace: 'nowrap', textAlign: 'right', minWidth: '80px',
      }}>
        {subtotal} MAD
      </div>

      <button
        type="button"
        onClick={() => removeItem(item.slug)}
        aria-label={`Retirer ${item.name} du panier`}
        className="cart-row-remove"
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.3)',
          color: '#FF6B6B',
        }}
      >
        <TrashIcon />
      </button>
    </motion.div>
  )
}

export default function Cart() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const { items, totalPrice, totalCount, shippingFee, orderTotal } = useCart()

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

      <div style={{ maxWidth: '820px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '28px' }}
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
            ← Continuer mes achats
          </Link>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: '40px' }}
        >
          <span style={{
            display: 'inline-block',
            background: 'rgba(255,214,0,0.14)', border: '1px solid rgba(255,214,0,0.32)',
            color: '#FFD600', fontFamily: 'Outfit, sans-serif',
            fontWeight: 600, fontSize: '12px', letterSpacing: '1.5px',
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px', marginBottom: '20px',
          }}>
            Ton panier
          </span>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4.5vw, 42px)', color: '#fff',
            letterSpacing: '-1.2px', lineHeight: 1.1,
          }}>
            {items.length === 0 ? 'Ton panier est vide' : `${totalCount} article${totalCount > 1 ? 's' : ''} dans ton panier`}
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 'var(--radius)',
              padding: '48px 32px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.55)', marginBottom: '24px' }}>
              Ajoute des produits depuis la boutique pour commencer une commande.
            </p>
            <Link
              to="/shop"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#FFD600', color: '#06071E',
                fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '15px',
                padding: '14px 30px', borderRadius: '100px',
                textDecoration: 'none', cursor: 'pointer',
              }}
            >
              Voir la boutique
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius)',
                padding: '8px 28px',
              }}
            >
              {items.map(item => <CartRow key={item.slug} item={item} />)}
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ marginTop: '24px' }}
            >
              <FreeShippingProgress />
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              style={{
                background: 'rgba(255,214,0,0.1)',
                border: '1px solid rgba(255,214,0,0.35)',
                borderRadius: 'var(--radius-sm)',
                padding: '20px 26px',
                marginTop: '24px',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '14px',
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  Sous-total produits
                </span>
                <span style={{
                  fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '15px',
                  color: 'rgba(255,255,255,0.8)',
                }}>
                  {totalPrice} MAD
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '14px',
                  color: 'rgba(255,255,255,0.6)',
                }}>
                  Frais de livraison
                </span>
                <span style={{
                  fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '15px',
                  color: shippingFee === 0 ? '#34D399' : 'rgba(255,255,255,0.8)',
                }}>
                  {shippingFee} MAD
                </span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                paddingTop: '10px', marginTop: '2px',
                borderTop: '1px solid rgba(255,255,255,0.15)',
              }}>
                <span style={{
                  fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '15px',
                  color: 'rgba(255,255,255,0.75)', letterSpacing: '0.3px',
                }}>
                  Total général
                </span>
                <span style={{
                  fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '28px',
                  color: '#FFD600',
                }}>
                  {orderTotal} MAD
                </span>
              </div>
            </motion.div>

            <motion.button
              type="button"
              onClick={() => navigate('/finaliser-commande')}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                background: '#FFD600', color: '#06071E',
                fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '17px',
                padding: '17px 30px', borderRadius: '100px',
                boxShadow: '0 0 40px rgba(255,214,0,0.35)',
                marginTop: '24px', width: '100%',
                cursor: 'pointer',
              }}
              whileHover={reduce ? {} : { scale: 1.02, boxShadow: '0 0 60px rgba(255,214,0,0.55)' }}
              whileTap={reduce ? {} : { scale: 0.98 }}
            >
              Passer la commande →
            </motion.button>
          </>
        )}
      </div>
    </section>
  )
}

function TrashIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

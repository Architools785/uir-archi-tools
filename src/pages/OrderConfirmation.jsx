import { Link, useLocation, Navigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'

function RecapRow({ label, value, accent }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 0',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <span style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '13px',
        color: 'rgba(255,255,255,0.55)', letterSpacing: '0.3px', textTransform: 'uppercase',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: accent ? 900 : 700,
        fontSize: accent ? '22px' : '16px',
        color: accent ? '#FFD600' : '#fff',
      }}>
        {value}
      </span>
    </div>
  )
}

export default function OrderConfirmation() {
  const location = useLocation()
  const reduce = useReducedMotion()
  const state = location.state

  if (!state) return <Navigate to="/shop" replace />

  const { productName, quantity, total } = state

  return (
    <section style={{
      padding: '160px 24px 120px',
      background: 'var(--bg-deep)',
      position: 'relative', overflow: 'hidden',
      minHeight: '100vh',
      display: 'flex', alignItems: 'center',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,214,0,0.35), transparent)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(45,47,196,0.32) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <div style={{ maxWidth: '520px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={reduce ? false : { scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '84px', height: '84px', borderRadius: '50%',
            background: 'rgba(255,214,0,0.14)', border: '2px solid rgba(255,214,0,0.45)',
            color: '#FFD600', marginBottom: '28px',
          }}
        >
          <CheckIcon />
        </motion.div>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(26px, 4vw, 38px)', color: '#fff',
            letterSpacing: '-1px', lineHeight: 1.2, marginBottom: '14px',
          }}
        >
          Votre commande a bien été confirmée ✓
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          style={{
            fontFamily: 'Rubik, sans-serif', fontSize: '16px',
            color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '36px',
          }}
        >
          On te contacte très vite pour organiser la livraison sur ton campus.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius)',
            padding: '10px 26px',
            textAlign: 'left',
            marginBottom: '36px',
          }}
        >
          <RecapRow label="Produit" value={productName} />
          <RecapRow label="Quantité" value={quantity} />
          <RecapRow label="Total" value={`${total} MAD`} accent />
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <motion.div style={{ display: 'inline-block' }}>
            <Link
              to="/shop"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: '#FFD600', color: '#06071E',
                fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '16px',
                padding: '15px 34px', borderRadius: '100px',
                boxShadow: '0 0 40px rgba(255,214,0,0.35)',
                textDecoration: 'none', cursor: 'pointer',
              }}
            >
              Retour à la boutique
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function CheckIcon() {
  return (
    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const MotionLink = motion(Link)

const IG_LINK = 'https://www.instagram.com/uir.archi.tools'

export default function Navbar() {
  const reduce = useReducedMotion()
  const { totalCount } = useCart()

  return (
    <motion.nav
      initial={reduce ? false : { opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        height: '64px',
        background: 'rgba(6, 7, 30, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 800,
          fontSize: '18px',
          letterSpacing: '-0.3px',
          color: '#fff',
        }}
      >
        UIR <span style={{ color: 'var(--accent)' }}>Archi</span> Tools
        <span aria-hidden="true" style={{
          width: '5px', height: '5px', borderRadius: '50%',
          background: 'var(--accent)', display: 'inline-block',
          marginLeft: '2px', marginBottom: '10px',
        }} />
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <motion.a
          href={IG_LINK}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram @uir.archi.tools"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.75)',
          }}
          whileHover={reduce ? {} : {
            scale: 1.1,
            rotate: -8,
            color: '#FFD600',
            borderColor: 'rgba(255,214,0,0.45)',
            background: 'rgba(255,214,0,0.1)',
          }}
          whileTap={reduce ? {} : { scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 300, damping: 16 }}
        >
          <InstagramIcon />
        </motion.a>

        <MotionLink
          to="/panier"
          aria-label="Voir le panier"
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.75)',
          }}
          whileHover={reduce ? {} : {
            scale: 1.1,
            color: '#FFD600',
            borderColor: 'rgba(255,214,0,0.45)',
            background: 'rgba(255,214,0,0.1)',
          }}
          whileTap={reduce ? {} : { scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 300, damping: 16 }}
        >
          <CartIcon />
          {totalCount > 0 && (
            <span style={{
              position: 'absolute', top: '-4px', right: '-4px',
              minWidth: '17px', height: '17px', padding: '0 4px',
              borderRadius: '100px',
              background: '#FFD600', color: '#06071E',
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 0 2px #06071E',
            }}>
              {totalCount}
            </span>
          )}
        </MotionLink>

        <MotionLink
          to="/shop"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: '#FFD600', color: '#06071E',
            fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '14px',
            padding: '8px 18px', borderRadius: '100px',
            boxShadow: '0 0 20px rgba(255,214,0,0.3)',
            textDecoration: 'none', cursor: 'pointer',
          }}
          whileHover={reduce ? {} : { scale: 1.06, boxShadow: '0 0 35px rgba(255,214,0,0.5)' }}
          whileTap={reduce ? {} : { scale: 0.96 }}
        >
          Commander
        </MotionLink>
      </div>
    </motion.nav>
  )
}

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion(Link)

export default function BestSeller() {
  const reduce = useReducedMotion()

  return (
    <section style={{
      padding: '100px 24px',
      background: 'var(--bg-dark)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,214,0,0.35), transparent)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', right: '-120px',
        width: '550px', height: '550px', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(45,47,196,0.32) 0%, transparent 70%)',
        filter: 'blur(70px)', transform: 'translateY(-50%)',
      }} />

      <div style={{
        maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 1fr) minmax(280px, 1fr)',
        gap: '56px',
        alignItems: 'center',
      }}>
        {/* Photo */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -32, scale: 0.96 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'relative',
            borderRadius: 'var(--radius)',
            overflow: 'hidden',
            aspectRatio: '4 / 3',
            boxShadow: '0 24px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          <img
            src="/images/Carton Plume 0,3.jpeg"
            alt="Carton plume"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              objectPosition: 'bottom',
            }}
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <span style={{
            display: 'inline-block',
            background: 'rgba(255,214,0,0.14)',
            border: '1px solid rgba(255,214,0,0.32)',
            color: '#FFD600', fontFamily: 'Outfit, sans-serif',
            fontWeight: 600, fontSize: '12px', letterSpacing: '1.5px',
            textTransform: 'uppercase', padding: '5px 14px',
            borderRadius: '100px', marginBottom: '20px',
          }}>
            Best seller
          </span>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 46px)', color: '#fff',
            letterSpacing: '-1.2px', marginBottom: '18px', lineHeight: 1.1,
          }}>
            Le carton plume
          </h2>
          <p style={{
            fontSize: '17px', color: 'rgba(255,255,255,0.55)',
            fontFamily: 'Rubik, sans-serif', lineHeight: 1.7,
            maxWidth: '440px', marginBottom: '36px',
          }}>
            Le produit le plus commandé par les archis UIR. Découpe précise, structure solide, livré directement sur ton campus.
          </p>
          <MotionLink
            to="/shop"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: '#FFD600', color: '#06071E',
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '17px',
              padding: '16px 38px', borderRadius: '100px',
              boxShadow: '0 0 40px rgba(255,214,0,0.35)',
              textDecoration: 'none', cursor: 'pointer',
            }}
            whileHover={reduce ? {} : { scale: 1.06, boxShadow: '0 0 70px rgba(255,214,0,0.6)' }}
            whileTap={reduce ? {} : { scale: 0.96 }}
          >
            Shop
          </MotionLink>
        </motion.div>
      </div>
    </section>
  )
}

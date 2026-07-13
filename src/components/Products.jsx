import { useState, useRef } from 'react'
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, useMotionTemplate, useInView } from 'framer-motion'

const PRODUCTS = [
  { name: 'Carton plume 0.3', tag: 'Coupe précise',        gradient: 'linear-gradient(135deg,#1A1BA0,#2D2FC4)', icon: <LayersIcon />,   image: '/images/Carton Plume 0,3.jpeg' },
  { name: 'Carton plume 0.5', tag: 'Structure solide',     gradient: 'linear-gradient(135deg,#2D2FC4,#6B21A8)', icon: <LayersIcon />,   image: '/images/Carton Plume 0,5.jpeg' },
  { name: 'Papier A1',        tag: 'Grand format',         gradient: 'linear-gradient(135deg,#0E4D6E,#0D9488)', icon: <FileIcon />,     image: '/images/Papier A1.jpeg' },
  { name: 'Canson A3',        tag: 'Qualité pro',          gradient: 'linear-gradient(135deg,#065F46,#059669)', icon: <ScrollIcon />,   image: '/images/Canson A3.jpeg' },
  { name: 'Critérium Faber-Castell', tag: 'Trait fin & précis', gradient: 'linear-gradient(135deg,#92400E,#D97706)', icon: <PenIcon />, image: '/images/Criterium 0,5 Faber-Castel.jpeg' },
  { name: 'Gomme électrique', tag: 'Effacement net',       gradient: 'linear-gradient(135deg,#7C2D8D,#EC4899)', icon: <ZapIcon />,      image: '/images/Gomme Electrique.jpeg' },
  { name: 'Crayon gomme avec brosse', tag: 'Polyvalent',   gradient: 'linear-gradient(135deg,#78350F,#F59E0B)', icon: <PencilIcon />,  image: '/images/Crayon Blanc Brosse.jpeg' },
  { name: 'Papier raisin',    tag: 'Texture premium',      gradient: 'linear-gradient(135deg,#134E4A,#0891B2)', icon: <FileIcon />,     image: '/images/Papier Canson Raisin.jpeg' },
  { name: 'Colle UHU liquide',tag: 'Adhérence forte',      gradient: 'linear-gradient(135deg,#7F1D1D,#EF4444)', icon: <DropletsIcon />, image: '/images/Colle UHU Liquide.jpeg' },
  { name: 'Mines',             tag: 'Recharges précises',   gradient: 'linear-gradient(135deg,#1F2937,#4B5563)', icon: <PencilIcon />,   image: '/images/Mines .jpeg' },
]

function TiltCard({ product, index }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [hov, setHov] = useState(false)

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useTransform(my, [-0.5, 0.5], [12, -12])
  const rotY = useTransform(mx, [-0.5, 0.5], [-12, 12])
  const sRX  = useSpring(rotX, { stiffness: 150, damping: 18 })
  const sRY  = useSpring(rotY, { stiffness: 150, damping: 18 })
  const spX  = useTransform(mx, [-0.5, 0.5], ['15%', '85%'])
  const spY  = useTransform(my, [-0.5, 0.5], ['15%', '85%'])
  const spotBg = useMotionTemplate`radial-gradient(circle at ${spX} ${spY}, rgba(255,255,255,0.12) 0%, transparent 55%)`

  const onMove = (e) => {
    if (reduce) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0); setHov(false) }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: reduce ? 0 : sRX,
        rotateY: reduce ? 0 : sRY,
        transformPerspective: 900,
        position: 'relative',
        zIndex: hov ? 2 : 1,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Mouse spotlight */}
      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            background: spotBg,
            borderRadius: 'var(--radius)',
            pointerEvents: 'none',
            zIndex: 10,
          }}
        />
      )}

      {/* Card shell — controls all hover variants */}
      <motion.div
        animate={hov ? 'hover' : 'idle'}
        variants={{
          idle: { boxShadow: '0 0 0 1px rgba(255,255,255,0.08)' },
          hover: { boxShadow: '0 0 0 1px rgba(255,214,0,0.45), 0 24px 60px rgba(45,47,196,0.55), 0 0 50px rgba(255,214,0,0.1)' },
        }}
        style={{
          background: 'var(--card-bg)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        {/* Image / gradient area */}
        <div style={{
          height: '180px',
          background: product.gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                zIndex: 0,
              }}
            />
          )}

          {/* Shimmer sweep — reacts to parent hover variant */}
          <motion.div
            variants={{
              idle: { x: '-130%' },
              hover: { x: '260%', transition: { duration: 0.65, ease: 'easeInOut' } },
            }}
            aria-hidden="true"
            style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: '55%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
              skewX: -12,
              zIndex: 2, pointerEvents: 'none',
            }}
          />

          {/* Specular highlight */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 72% 28%, rgba(255,255,255,0.18), transparent 55%)',
          }} />

          {/* Icon — bounces on hover (placeholder only, hidden once a real photo is set) */}
          {!product.image && (
            <motion.div
              variants={{
                idle: { scale: 1, rotate: 0 },
                hover: { scale: 1.14, rotate: -7, transition: { type: 'spring', stiffness: 220, damping: 12 } },
              }}
              style={{
                position: 'relative', zIndex: 1,
                width: '72px', height: '72px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.22)',
              }}
            >
              {product.icon}
            </motion.div>
          )}

          {!product.image && (
            <div style={{
              position: 'absolute', bottom: 8, right: 8, zIndex: 3,
              background: 'rgba(0,0,0,0.45)',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '9px', padding: '2px 6px',
              borderRadius: '4px', fontFamily: 'Rubik, sans-serif',
            }}>
              📸 ajouter photo
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: '16px 18px 18px' }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: '#FFD600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
            {product.tag}
          </div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '16px', color: '#fff', lineHeight: 1.3 }}>
            {product.name}
          </h3>
          <motion.div
            variants={{
              idle: { x: 0, opacity: 0.45, color: 'rgba(255,255,255,0.45)' },
              hover: { x: 5, opacity: 1, color: '#FFD600', transition: { duration: 0.2 } },
            }}
            style={{ marginTop: '14px', fontSize: '12px', fontFamily: 'Rubik, sans-serif', display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            <span>→</span> Dispo en story
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Products() {
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

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          style={{ textAlign: 'center', marginBottom: '68px' }}
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
            Produits disponibles
          </span>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 50px)', color: '#fff', letterSpacing: '-1.2px',
          }}>
            Tout ce qu&apos;il te faut
          </h2>
          <p style={{ marginTop: '12px', fontSize: '17px', color: 'rgba(255,255,255,0.5)', fontFamily: 'Rubik, sans-serif' }}>
            Consulte les stories Instagram pour les disponibilités et les prix du jour
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '22px',
        }}>
          {PRODUCTS.map((p, i) => <TiltCard key={p.name} product={p} index={i} />)}
        </div>

        {/* CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ textAlign: 'center', marginTop: '60px' }}
        >
          <motion.a
            href="https://www.instagram.com/uir.archi.tools"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.14)',
              color: '#fff', fontFamily: 'Outfit, sans-serif',
              fontWeight: 700, fontSize: '16px',
              padding: '14px 30px', borderRadius: '100px',
              textDecoration: 'none', cursor: 'pointer',
            }}
            whileHover={reduce ? {} : {
              scale: 1.04,
              background: 'rgba(255,255,255,0.13)',
              borderColor: 'rgba(255,255,255,0.3)',
            }}
            whileTap={reduce ? {} : { scale: 0.97 }}
          >
            <IGIcon />
            Voir le stock complet sur Instagram
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Icons ─── */

function LayersIcon() {
  return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
}
function FileIcon() {
  return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
}
function ScrollIcon() {
  return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
}
function PenIcon() {
  return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>
}
function ZapIcon() {
  return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
}
function PencilIcon() {
  return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="2" x2="22" y2="6"/><path d="M7.5 20.5L19 9l-4-4L3.5 16.5 2 22z"/></svg>
}
function DropletsIcon() {
  return <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0014 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 01-11.91 4.97"/></svg>
}
function IGIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
}

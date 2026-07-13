import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const BENEFITS = [
  {
    icon: <MapPinIcon />, title: 'Livraison sur campus',
    desc: "On livre directement à l'UIR. Plus besoin de sortir du campus pour trouver ton matériel.",
    accent: '#FFD600',
  },
  {
    icon: <RefreshIcon />, title: 'Stocks mis à jour',
    desc: 'Les stories Instagram reflètent le stock en temps réel. Tu sais exactement ce qui est dispo.',
    accent: '#00E5FF',
  },
  {
    icon: <TagIcon />, title: 'Prix compétitifs',
    desc: "Des tarifs justes, pensés pour les étudiants. Qualité pro sans se ruiner.",
    accent: '#A78BFA',
  },
  {
    icon: <ZapIcon />, title: 'Service rapide',
    desc: 'Commande le matin, livraison dans la journée. On répond vite sur WhatsApp.',
    accent: '#34D399',
  },
]

function BenefitCard({ benefit, index }) {
  const reduce = useReducedMotion()
  const [hov, setHov] = useState(false)

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 32, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => !reduce && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'rgba(255,255,255,0.04)',
        borderRadius: '20px',
        padding: '32px 26px',
        cursor: 'default',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        transform: hov && !reduce ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hov && !reduce
          ? `0 0 0 1px ${benefit.accent}55, 0 24px 55px rgba(0,0,0,0.45), 0 0 50px ${benefit.accent}14`
          : '0 0 0 1px rgba(255,255,255,0.08)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* Background glow that appears on hover */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '160px', height: '160px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${benefit.accent}18 0%, transparent 70%)`,
          transition: 'opacity 0.3s ease',
          opacity: hov ? 1 : 0,
          pointerEvents: 'none',
        }}
      />

      {/* Icon */}
      <motion.div
        animate={reduce ? {} : {
          scale: hov ? 1.2 : 1,
          rotate: hov ? -10 : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 14 }}
        style={{
          width: '58px', height: '58px',
          borderRadius: '15px',
          background: `${benefit.accent}18`,
          border: `1px solid ${benefit.accent}35`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: '22px',
          color: benefit.accent,
          position: 'relative', zIndex: 1,
        }}
      >
        {benefit.icon}
      </motion.div>

      <h3 style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 800,
        fontSize: '20px', color: '#fff',
        marginBottom: '10px', lineHeight: 1.2,
        position: 'relative', zIndex: 1,
      }}>
        {benefit.title}
      </h3>

      <p style={{
        fontFamily: 'Rubik, sans-serif', fontSize: '15px',
        color: 'rgba(255,255,255,0.52)', lineHeight: 1.65,
        position: 'relative', zIndex: 1,
      }}>
        {benefit.desc}
      </p>

      {/* Animated accent line that grows on hover */}
      <div
        style={{
          marginTop: '26px',
          height: '2.5px', borderRadius: '2px',
          background: benefit.accent,
          opacity: 0.65,
          transition: 'width 0.35s ease',
          width: hov && !reduce ? '80px' : '36px',
        }}
      />
    </motion.div>
  )
}

export default function WhyUs() {
  const reduce = useReducedMotion()

  return (
    <section style={{
      padding: '100px 24px',
      background: 'var(--bg-section)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,214,0,0.3), transparent)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '50%', left: '-120px',
        width: '550px', height: '550px', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(45,47,196,0.32) 0%, transparent 70%)',
        filter: 'blur(70px)', transform: 'translateY(-50%)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <span style={{
            display: 'inline-block',
            background: 'rgba(255,214,0,0.14)', border: '1px solid rgba(255,214,0,0.32)',
            color: '#FFD600', fontFamily: 'Outfit, sans-serif',
            fontWeight: 600, fontSize: '12px', letterSpacing: '1.5px',
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px', marginBottom: '20px',
          }}>
            Pourquoi nous
          </span>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 50px)', color: '#fff', letterSpacing: '-1.2px',
          }}>
            La solution pensée pour les archi UIR
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
        }}>
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.title} benefit={b} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Icons ─── */

function MapPinIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
}
function RefreshIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
}
function TagIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
}
function ZapIcon() {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
}

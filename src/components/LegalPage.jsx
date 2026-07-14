import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function LegalPage({ badge, title, intro, updated, sections, children }) {
  const reduce = useReducedMotion()

  return (
    <section style={{
      padding: '160px 24px 120px',
      background: 'var(--bg-deep)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,214,0,0.35), transparent)',
      }} />

      <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '28px' }}
        >
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Rubik, sans-serif', fontWeight: 500, fontSize: '14px',
              color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFD600'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            ← Retour à l&apos;accueil
          </Link>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: '56px' }}
        >
          <span style={{
            display: 'inline-block',
            background: 'rgba(255,214,0,0.14)', border: '1px solid rgba(255,214,0,0.32)',
            color: '#FFD600', fontFamily: 'Outfit, sans-serif',
            fontWeight: 600, fontSize: '12px', letterSpacing: '1.5px',
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px', marginBottom: '20px',
          }}>
            {badge}
          </span>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(30px, 4.5vw, 48px)', color: '#fff',
            letterSpacing: '-1.2px', lineHeight: 1.1, marginBottom: '16px',
          }}>
            {title}
          </h1>
          {intro && (
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', fontFamily: 'Rubik, sans-serif', lineHeight: 1.7 }}>
              {intro}
            </p>
          )}
          {updated && (
            <p style={{ marginTop: '14px', fontSize: '13px', color: 'rgba(255,255,255,0.32)', fontFamily: 'Rubik, sans-serif' }}>
              Dernière mise à jour : {updated}
            </p>
          )}
        </motion.div>

        {children}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          {sections?.map((sec, i) => (
            <motion.div
              key={sec.heading}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.3) }}
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius)',
                padding: '28px 30px',
              }}
            >
              <h2 style={{
                fontFamily: 'Outfit, sans-serif', fontWeight: 700,
                fontSize: '19px', color: '#fff', marginBottom: '12px',
              }}>
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, j) => (
                <p key={j} style={{
                  fontFamily: 'Rubik, sans-serif', fontSize: '15px',
                  color: 'rgba(255,255,255,0.55)', lineHeight: 1.75,
                  marginTop: j === 0 ? 0 : '12px',
                }}>
                  {p}
                </p>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

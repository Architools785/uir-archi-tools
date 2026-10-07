import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PacksCover, UnitCover } from '../components/HubCovers'

const CHOICES = [
  { to: '/packs', title: 'Les Packs', hook: 'Tout-en-un, prix malin', cta: 'Voir les packs', Cover: PacksCover },
  { to: '/shop', title: 'À l\'unité', hook: 'Chaque produit, au choix', cta: 'Voir les produits', Cover: UnitCover },
]

export default function Boutique() {
  const reduce = useReducedMotion()

  return (
    <section style={{
      padding: '128px 24px 100px',
      background: 'var(--bg-dark)',
      position: 'relative', overflow: 'hidden',
      minHeight: '100vh',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
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
            Commander
          </span>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(30px, 4.6vw, 54px)', color: '#fff', letterSpacing: '-1.2px',
          }}>
            Qu&apos;est-ce qu&apos;il te <span style={{ color: 'var(--accent)' }}>faut&nbsp;?</span>
          </h1>
          <p style={{
            marginTop: '14px', fontSize: '17px',
            color: 'rgba(255,255,255,0.55)', fontFamily: 'Rubik, sans-serif',
          }}>
            Choisis ta façon de commander
          </p>
        </motion.div>

        <div className="hub-grid">
          {CHOICES.map(({ to, title, hook, cta, Cover }, i) => (
            <motion.div
              key={to}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
            >
              <Link to={to} className="hub-card" aria-label={`${title} — ${hook}`}>
                <div className="hub-cover">
                  <Cover />
                </div>
                <div className="hub-body">
                  <div>
                    <h2 style={{
                      fontFamily: 'Outfit, sans-serif', fontWeight: 900,
                      fontSize: 'clamp(26px, 3vw, 36px)', color: '#fff', letterSpacing: '-0.8px',
                    }}>
                      {title}
                    </h2>
                    <p style={{
                      marginTop: '6px', fontSize: '16px',
                      color: 'rgba(255,255,255,0.65)', fontFamily: 'Rubik, sans-serif',
                    }}>
                      {hook}
                    </p>
                  </div>
                  <span className="hub-cta">
                    <span className="hub-cta-label">{cta}</span>
                    <span className="hub-arrow" aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

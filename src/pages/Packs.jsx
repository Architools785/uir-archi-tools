import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PACKS, packContents, isPackOutOfStock } from '../data/packs'
import PackPrice from '../components/PackPrice'
import OutOfStockBadge from '../components/OutOfStockBadge'

function PackCard({ pack }) {
  const outOfStock = isPackOutOfStock(pack)

  return (
    <Link to={`/packs/${pack.slug}`} className="pack-card" aria-label={`Voir le ${pack.name}`}>
      <div style={{ position: 'relative', aspectRatio: '1024 / 541', overflow: 'hidden', background: '#1e1b4b' }}>
        <img
          src={pack.image}
          alt={pack.name}
          className="pack-card-image"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            filter: outOfStock ? 'grayscale(0.85) brightness(0.6)' : 'none',
          }}
        />
        {outOfStock && (
          <OutOfStockBadge style={{ position: 'absolute', top: '12px', left: '12px' }} />
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '18px 20px 20px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: '#FFD600', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
          {pack.tag}
        </div>
        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '21px', color: '#fff', lineHeight: 1.25 }}>
          {pack.name}
        </h2>
        <p style={{ marginTop: '8px', fontSize: '13px', lineHeight: 1.6, color: 'rgba(255,255,255,0.6)', fontFamily: 'Rubik, sans-serif' }}>
          {packContents(pack).map(c => `${c.quantity > 1 ? `${c.quantity} × ` : ''}${c.name}`).join(' + ')}
        </p>

        <div style={{ marginTop: 'auto', paddingTop: '18px' }}>
          <PackPrice pack={pack} />
        </div>

        <span style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginTop: '16px',
          background: outOfStock ? 'rgba(255,255,255,0.08)' : '#FFD600',
          color: outOfStock ? 'rgba(255,255,255,0.45)' : '#06071E',
          border: outOfStock ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
          fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '13px',
          padding: '11px 16px', borderRadius: '100px',
        }}>
          {outOfStock ? 'Indisponible' : 'Voir le pack'}
        </span>
      </div>
    </Link>
  )
}

export default function Packs() {
  const reduce = useReducedMotion()

  return (
    <section style={{
      padding: '128px 24px 100px',
      background: 'var(--bg-dark)',
      minHeight: '100vh',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <Link to="/boutique" style={{
            display: 'inline-block', marginBottom: '22px',
            fontSize: '13px', color: 'rgba(255,255,255,0.55)', fontFamily: 'Rubik, sans-serif',
          }}>
            ← Retour au choix
          </Link>
          <div>
            <span style={{
              display: 'inline-block',
              background: 'rgba(255,214,0,0.14)',
              border: '1px solid rgba(255,214,0,0.32)',
              color: '#FFD600', fontFamily: 'Outfit, sans-serif',
              fontWeight: 600, fontSize: '12px', letterSpacing: '1.5px',
              textTransform: 'uppercase', padding: '5px 14px',
              borderRadius: '100px', marginBottom: '20px',
            }}>
              Les Packs
            </span>
          </div>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 50px)', color: '#fff', letterSpacing: '-1.2px',
          }}>
            Tout-en-un, <span style={{ color: 'var(--accent)' }}>prix malin</span>
          </h1>
          <p style={{
            marginTop: '14px', fontSize: '17px',
            color: 'rgba(255,255,255,0.55)', fontFamily: 'Rubik, sans-serif',
          }}>
            Des kits déjà composés, moins chers qu&apos;à l&apos;unité.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '22px',
        }}>
          {PACKS.map((pack, i) => (
            <motion.div
              key={pack.slug}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 + i * 0.1 }}
            >
              <PackCard pack={pack} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

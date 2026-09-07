import { motion, useReducedMotion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function FeaturedPack({ product }) {
  const reduce = useReducedMotion()

  if (!product) return null

  const savings = product.originalPrice - product.price

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        marginBottom: '56px',
        borderRadius: '22px',
        padding: '2px',
        background: 'linear-gradient(135deg, #FFD600, #E6C000, #FFD600)',
        boxShadow: '0 20px 60px rgba(255,214,0,0.18)',
      }}
    >
      <div style={{
        position: 'relative',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(45,47,196,0.28), rgba(6,7,30,0.96))',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 260px) 1fr',
      }}
      className="featured-pack"
      >
        {/* Badge */}
        <div style={{
          position: 'absolute', top: '18px', left: '18px', zIndex: 2,
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          background: '#FFD600', color: '#06071E',
          fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '11px',
          letterSpacing: '1px', textTransform: 'uppercase',
          padding: '6px 14px', borderRadius: '100px',
          boxShadow: '0 4px 16px rgba(255,214,0,0.4)',
        }}>
          ⭐ Offre spéciale
        </div>

        {/* Image */}
        <div style={{
          position: 'relative',
          minHeight: '260px',
          background: product.gradient,
          overflow: 'hidden',
        }}>
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: product.imageFit || 'cover',
              }}
            />
          )}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent 60%, rgba(6,7,30,0.5))',
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: '32px 32px 32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h3 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(22px, 3vw, 28px)', color: '#fff',
            letterSpacing: '-0.6px', lineHeight: 1.2,
          }}>
            {product.name}
          </h3>

          {product.subtitle && (
            <p style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '15px',
              color: '#FFD600', margin: 0,
            }}>
              {product.subtitle}
            </p>
          )}

          {product.contentDescription && (
            <p style={{
              fontFamily: 'Rubik, sans-serif', fontSize: '14px', lineHeight: 1.7,
              color: 'rgba(255,255,255,0.65)', margin: 0, maxWidth: '520px',
            }}>
              {product.contentDescription}
            </p>
          )}

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginTop: '6px', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '18px',
              color: 'rgba(255,255,255,0.4)', textDecoration: 'line-through',
            }}>
              {product.originalPrice} DH
            </span>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '32px',
              color: '#FFD600',
            }}>
              {product.price} DH
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.4)',
              color: '#34D399', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '12px',
              padding: '5px 12px', borderRadius: '100px',
            }}>
              Économise {savings} DH
            </span>
          </div>

          {product.alwaysFreeShipping && (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', width: 'fit-content',
              background: 'rgba(255,214,0,0.1)', border: '1px solid rgba(255,214,0,0.3)',
              color: '#FFD600', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '13px',
              padding: '8px 16px', borderRadius: '100px', marginTop: '4px',
            }}>
              🚚 Livraison gratuite incluse, peu importe le montant
            </div>
          )}

          <Link
            to={`/commander/${product.slug}`}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              alignSelf: 'flex-start',
              background: '#FFD600', color: '#06071E',
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '15px',
              padding: '15px 30px', borderRadius: '100px',
              boxShadow: '0 0 30px rgba(255,214,0,0.35)',
              textDecoration: 'none', cursor: 'pointer', marginTop: '10px',
            }}
          >
            {product.ctaLabel || 'Commander le pack'}
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

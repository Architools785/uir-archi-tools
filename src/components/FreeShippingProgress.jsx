import { motion } from 'framer-motion'
import { useCart, FREE_SHIPPING_THRESHOLD, SHIPPING_FEE } from '../context/CartContext'

export default function FreeShippingProgress({ compact = false }) {
  const { totalPrice, isFreeShipping, amountToFreeShipping, freeShippingProgress } = useCart()

  return (
    <div style={{
      background: isFreeShipping ? 'rgba(52,211,153,0.1)' : 'rgba(255,214,0,0.1)',
      border: `1px solid ${isFreeShipping ? 'rgba(52,211,153,0.35)' : 'rgba(255,214,0,0.35)'}`,
      borderRadius: 'var(--radius-sm)',
      padding: compact ? '16px 20px' : '20px 24px',
    }}>
      {isFreeShipping ? (
        <p style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 800,
          fontSize: compact ? '14px' : '15px', color: '#34D399', margin: 0,
        }}>
          ✅ Livraison gratuite débloquée&nbsp;! Tu économises {SHIPPING_FEE} DH.
        </p>
      ) : (
        <>
          <p style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 800,
            fontSize: compact ? '14px' : '15px', color: '#FFD600', margin: 0,
          }}>
            🎁 Plus que {amountToFreeShipping} DH pour débloquer la livraison gratuite&nbsp;!
          </p>
          <p style={{
            fontFamily: 'Rubik, sans-serif', fontSize: '12px',
            color: 'rgba(255,255,255,0.5)', margin: '4px 0 0',
          }}>
            (Sinon, une participation de {SHIPPING_FEE} DH sera ajoutée à ta commande)
          </p>
        </>
      )}

      <div
        role="progressbar"
        aria-valuenow={Math.round(Math.min(totalPrice, FREE_SHIPPING_THRESHOLD))}
        aria-valuemin={0}
        aria-valuemax={FREE_SHIPPING_THRESHOLD}
        aria-label="Progression vers la livraison gratuite"
        style={{
          marginTop: '14px', height: '8px', borderRadius: '100px',
          background: 'rgba(255,255,255,0.1)', overflow: 'hidden',
        }}
      >
        <motion.div
          initial={false}
          animate={{ width: `${freeShippingProgress * 100}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            height: '100%', borderRadius: '100px',
            background: isFreeShipping
              ? 'linear-gradient(90deg, #10B981, #34D399)'
              : 'linear-gradient(90deg, #E6C000, #FFD600)',
          }}
        />
      </div>
    </div>
  )
}

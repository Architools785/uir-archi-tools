import { useEffect, useState } from 'react'
import { motion, animate, useReducedMotion } from 'framer-motion'

// ─── Compteur de commandes ───
// Seul chiffre à mettre à jour chaque mois : le nombre de commandes livrées.
const DELIVERED_ORDERS_THIS_MONTH = 41

const NEON = '#FFF01F'
const NEON_GLOW = 'rgba(255,240,31,'

export default function OrdersCounter({ delay = 0 }) {
  const reduce = useReducedMotion()
  const [animatedCount, setAnimatedCount] = useState(0)
  const count = reduce ? DELIVERED_ORDERS_THIS_MONTH : animatedCount

  // Le chiffre défile de 0 à la valeur finale au chargement de la page.
  useEffect(() => {
    if (reduce) return
    const controls = animate(0, DELIVERED_ORDERS_THIS_MONTH, {
      duration: 1.6,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: v => setAnimatedCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [reduce, delay])

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <motion.div
        role="status"
        aria-label={`${DELIVERED_ORDERS_THIS_MONTH} commandes livrées ce mois`}
        animate={reduce ? {} : {
          boxShadow: [
            `0 0 0 1px ${NEON_GLOW}0.45), 0 0 18px ${NEON_GLOW}0.18), inset 0 0 18px ${NEON_GLOW}0.06)`,
            `0 0 0 1px ${NEON_GLOW}0.75), 0 0 36px ${NEON_GLOW}0.38), inset 0 0 24px ${NEON_GLOW}0.12)`,
            `0 0 0 1px ${NEON_GLOW}0.45), 0 0 18px ${NEON_GLOW}0.18), inset 0 0 18px ${NEON_GLOW}0.06)`,
          ],
        }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: delay + 1.6 }}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '14px',
          background: 'rgba(6,7,30,0.55)',
          backdropFilter: 'blur(8px)',
          padding: '12px 28px 12px 24px', borderRadius: '100px',
          boxShadow: `0 0 0 1px ${NEON_GLOW}0.45), 0 0 18px ${NEON_GLOW}0.18)`,
        }}
      >
        <span aria-hidden="true" style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 900,
          fontSize: 'clamp(40px, 6vw, 56px)', lineHeight: 1,
          letterSpacing: '-1.5px', color: NEON,
          textShadow: `0 0 10px ${NEON_GLOW}0.85), 0 0 24px ${NEON_GLOW}0.6), 0 0 48px ${NEON_GLOW}0.35)`,
          fontVariantNumeric: 'tabular-nums',
          minWidth: `${String(DELIVERED_ORDERS_THIS_MONTH).length}ch`,
          textAlign: 'right',
        }}>
          {count}
        </span>
        <span aria-hidden="true" style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 700,
          fontSize: 'clamp(14px, 2vw, 18px)', lineHeight: 1.25,
          color: NEON, textAlign: 'left',
          textShadow: `0 0 8px ${NEON_GLOW}0.5)`,
        }}>
          commandes livrées<br />ce mois 🔥
        </span>
      </motion.div>
    </motion.div>
  )
}

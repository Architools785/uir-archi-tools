import { motion, useReducedMotion } from 'framer-motion'

const ITEMS = [
  'CARTON PLUME 0.3', 'PAPIER A1', 'CRITÉRIUM FABER-CASTELL',
  'GOMME ÉLECTRIQUE', 'COLLE UHU', 'PAPIER RAISIN', 'CANSON A3',
  'CARTON PLUME 0.5', 'CRAYON GOMME AVEC BROSSE',
]

const Diamond = () => (
  <span style={{ color: '#FFD600', margin: '0 20px', fontSize: '10px', opacity: 0.8 }}>✦</span>
)

const Row = () => (
  <span style={{ display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
    {ITEMS.map((item, i) => (
      <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
        <Diamond />
        <span>{item}</span>
      </span>
    ))}
  </span>
)

export default function Marquee() {
  const reduce = useReducedMotion()

  return (
    <div style={{
      overflow: 'hidden',
      background: 'var(--primary)',
      padding: '14px 0',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
    }}>
      <motion.div
        style={{
          display: 'inline-flex',
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 700,
          fontSize: '13px',
          letterSpacing: '1.5px',
          color: '#fff',
        }}
        animate={reduce ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        <Row /><Row />
      </motion.div>
    </div>
  )
}

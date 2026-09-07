import { motion, useReducedMotion } from 'framer-motion'

export default function ShippingBanner() {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      style={{
        maxWidth: '760px',
        margin: '0 auto 48px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(255,214,0,0.14), rgba(45,47,196,0.18))',
        border: '1px solid rgba(255,214,0,0.32)',
        borderRadius: 'var(--radius)',
        padding: '18px 28px',
      }}
    >
      <p style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '15px',
        color: '#fff', lineHeight: 1.6, margin: 0,
      }}>
        🚚 Livraison gratuite dès <span style={{ color: '#FFD600', fontWeight: 800 }}>35 DH</span> sur le campus UIR — en 30 minutes.
        <br />
        <span style={{ fontFamily: 'Rubik, sans-serif', fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
          En dessous de 35 DH, une participation de 5 DH s&apos;applique.
        </span>
      </p>
    </motion.div>
  )
}

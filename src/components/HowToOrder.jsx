import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const MotionLink = motion(Link)

const STEPS = [
  {
    number: '01', title: 'Consulte le stock',
    desc: 'Regarde les stories Instagram @uir.archi.tools pour voir les produits disponibles et les prix du jour.',
    icon: <EyeIcon />, color: '#FFD600',
  },
  {
    number: '02', title: 'Envoie ta commande',
    desc: 'Écris-nous sur WhatsApp avec les produits que tu veux. On confirme ta commande en quelques minutes.',
    icon: <MessageIcon />, color: '#25D366',
  },
  {
    number: '03', title: 'Livraison sur campus',
    desc: "On livre directement à l'UIR. Rapide, pratique, sans te déplacer hors campus.",
    icon: <TruckIcon />, color: '#60A5FA',
  },
]

function Connector({ delay, reduce }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '0 4px',
    }}>
      <svg width="56" height="24" viewBox="0 0 56 24" fill="none" aria-hidden="true">
        <motion.path
          d="M2 12 L46 12 M38 5 L48 12 L38 19"
          stroke="#FFD600"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay, ease: 'easeOut' }}
        />
      </svg>
    </div>
  )
}

function StepCard({ step, index }) {
  const reduce = useReducedMotion()

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 36, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? {} : { y: -6 }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '20px',
        padding: '36px 28px',
        position: 'relative', overflow: 'hidden',
        flex: 1, minWidth: '240px',
      }}
    >
      {/* Big number watermark */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-14px', right: '16px',
        fontFamily: 'Outfit, sans-serif', fontWeight: 900,
        fontSize: '108px', lineHeight: 1,
        color: 'rgba(255,255,255,0.028)',
        userSelect: 'none', pointerEvents: 'none',
      }}>
        {step.number}
      </div>

      {/* Animated icon badge */}
      <motion.div
        initial={reduce ? false : { scale: 0, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: index * 0.15 + 0.3 }}
        style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: '62px', height: '62px', borderRadius: '50%',
          background: `${step.color}1A`,
          border: `2px solid ${step.color}45`,
          marginBottom: '24px',
          color: step.color,
        }}
      >
        {/* Continuous subtle pulse on icon */}
        <motion.div
          animate={reduce ? {} : { scale: [1, 1.12, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.5, ease: 'easeInOut' }}
        >
          {step.icon}
        </motion.div>
      </motion.div>

      <div style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 800,
        fontSize: '12px', color: step.color, letterSpacing: '1.2px',
        marginBottom: '10px', textTransform: 'uppercase',
      }}>
        Étape {step.number}
      </div>

      <h3 style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 800,
        fontSize: '22px', color: '#fff', marginBottom: '12px', lineHeight: 1.2,
      }}>
        {step.title}
      </h3>

      <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '15px', color: 'rgba(255,255,255,0.52)', lineHeight: 1.65 }}>
        {step.desc}
      </p>

      {/* Colored bottom border that slides in */}
      <motion.div
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.15 + 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '3px',
          background: `linear-gradient(90deg, ${step.color}, transparent)`,
          transformOrigin: 'left',
        }}
      />
    </motion.div>
  )
}

export default function HowToOrder() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section style={{
      padding: '100px 24px',
      background: 'var(--bg-deep)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(45,47,196,0.5), transparent)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: '-80px', right: '-80px',
        width: '420px', height: '420px', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(255,214,0,0.07) 0%, transparent 70%)',
        filter: 'blur(50px)',
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <motion.div
          ref={ref}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
            Comment commander
          </span>
          <h2 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 50px)', color: '#fff', letterSpacing: '-1.2px',
          }}>
            3 étapes, c&apos;est tout
          </h2>
        </motion.div>

        {/* Steps + connectors */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0px',
          alignItems: 'stretch',
        }}>
          {STEPS.map((step, i) => (
            <div key={step.number} style={{ display: 'contents' }}>
              <StepCard step={step} index={i} />
              {i < STEPS.length - 1 && !reduce && (
                <Connector delay={i * 0.15 + 0.6} reduce={reduce} />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{ textAlign: 'center', marginTop: '68px' }}
        >
          <MotionLink
            to="/shop"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '12px',
              background: '#FFD600', color: '#06071E',
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '18px',
              padding: '18px 42px', borderRadius: '100px',
              boxShadow: '0 0 50px rgba(255,214,0,0.35)',
              textDecoration: 'none', cursor: 'pointer',
            }}
            whileHover={reduce ? {} : { scale: 1.06, boxShadow: '0 0 80px rgba(255,214,0,0.65)' }}
            whileTap={reduce ? {} : { scale: 0.96 }}
          >
            Commander maintenant
          </MotionLink>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Icons ─── */

function EyeIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
}
function MessageIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
}
function TruckIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
}

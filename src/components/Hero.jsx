import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const SHAPES = [
  {
    x: '6%', y: '16%', w: 64, h: 64, delay: 0, dur: 8,
    svg: <polygon points="32,4 60,58 4,58" fill="none" stroke="#FFD600" strokeWidth="1.8" strokeLinejoin="round" opacity="0.5"/>,
  },
  {
    x: '86%', y: '12%', w: 52, h: 52, delay: 1.5, dur: 11,
    svg: <rect x="4" y="4" width="44" height="44" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>,
  },
  {
    x: '91%', y: '50%', w: 100, h: 100, delay: 0.7, dur: 14,
    svg: <circle cx="50" cy="50" r="46" fill="none" stroke="#FFD600" strokeWidth="1" strokeDasharray="9 7" opacity="0.4"/>,
  },
  {
    x: '2%', y: '60%', w: 76, h: 56, delay: 2.5, dur: 10,
    svg: (
      <>
        <line x1="0" y1="14" x2="76" y2="14" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
        <line x1="0" y1="30" x2="76" y2="30" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
        <line x1="0" y1="46" x2="76" y2="46" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
      </>
    ),
  },
  {
    x: '76%', y: '80%', w: 58, h: 58, delay: 1.2, dur: 9,
    svg: (
      <>
        <line x1="29" y1="0" x2="29" y2="58" stroke="rgba(45,47,196,0.9)" strokeWidth="2"/>
        <line x1="0" y1="29" x2="58" y2="29" stroke="rgba(45,47,196,0.9)" strokeWidth="2"/>
      </>
    ),
  },
  {
    x: '40%', y: '88%', w: 50, h: 50, delay: 3.5, dur: 9,
    svg: <polygon points="25,4 46,19 38,44 12,44 4,19" fill="none" stroke="#FFD600" strokeWidth="1.5" opacity="0.45"/>,
  },
]

function FloatingShape({ shape }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: shape.x, top: shape.y,
        width: shape.w, height: shape.h,
        pointerEvents: 'none', zIndex: 0,
      }}
      animate={reduce ? {} : { y: [0, -22, 10, 0], rotate: [0, 8, -5, 0] }}
      transition={{ duration: shape.dur, repeat: Infinity, delay: shape.delay, ease: 'easeInOut' }}
    >
      <svg width={shape.w} height={shape.h} viewBox={`0 0 ${shape.w} ${shape.h}`}>
        {shape.svg}
      </svg>
    </motion.div>
  )
}

function TitleLine({ children, delay, reduce }) {
  return (
    <div style={{ overflow: 'hidden', display: 'block' }}>
      <motion.div
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const blobY = useTransform(scrollYProgress, [0, 1], ['0px', '120px'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0px', '60px'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 80px',
        textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(165deg, #040518 0%, #0D0E40 55%, #1A1BA8 100%)',
      }}
    >
      {/* Floating shapes */}
      {SHAPES.map((s, i) => <FloatingShape key={i} shape={s} />)}

      {/* Grid */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(255,214,0,0.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,214,0,0.035) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Center glow - parallax */}
      <motion.div
        aria-hidden="true"
        style={{
          position: 'absolute', top: '18%', left: '50%', translateX: '-50%',
          y: blobY,
          width: '750px', height: '750px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(45,47,196,0.55) 0%, transparent 68%)',
          filter: 'blur(55px)',
        }}
      />

      {/* Side gold glow - pulsing */}
      <motion.div
        aria-hidden="true"
        animate={reduce ? {} : { scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '50%', left: '72%',
          width: '450px', height: '450px', pointerEvents: 'none', zIndex: 0,
          background: 'radial-gradient(circle, rgba(255,214,0,0.14) 0%, transparent 70%)',
          filter: 'blur(45px)',
        }}
      />

      {/* Content with parallax */}
      <motion.div
        style={{ position: 'relative', zIndex: 1, maxWidth: '880px', y: contentY, opacity: contentOpacity }}
      >
        {/* Badge */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '32px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'rgba(255,214,0,0.12)',
            border: '1px solid rgba(255,214,0,0.38)',
            color: '#FFD600',
            fontFamily: 'Outfit, sans-serif', fontWeight: 700,
            fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
            padding: '7px 18px', borderRadius: '100px',
          }}>
            <motion.span
              aria-hidden="true"
              animate={reduce ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              style={{ width: 7, height: 7, borderRadius: '50%', background: '#FFD600', display: 'inline-block', flexShrink: 0 }}
            />
            Livraison sur campus UIR
          </span>
        </motion.div>

        {/* Split-line title */}
        <div style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 900,
          fontSize: 'clamp(38px, 6.5vw, 88px)',
          lineHeight: 1.05, letterSpacing: '-2.5px',
          marginBottom: '28px', color: '#fff',
        }}>
          <TitleLine delay={0.25} reduce={reduce}>
            Tout le matériel d&apos;archi
          </TitleLine>
          <TitleLine delay={0.38} reduce={reduce}>
            dont tu as besoin,
          </TitleLine>
          <TitleLine delay={0.51} reduce={reduce}>
            <span style={{ color: '#FFD600' }}>livré sur place</span> à l&apos;UIR
          </TitleLine>
        </div>

        {/* Subtitle blur-in */}
        <motion.p
          initial={reduce ? false : { opacity: 0, filter: 'blur(8px)', y: 10 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.9, delay: 0.72 }}
          style={{
            fontFamily: 'Rubik, sans-serif',
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'rgba(255,255,255,0.58)',
            maxWidth: '560px', margin: '0 auto 48px',
            lineHeight: 1.7,
          }}
        >
          Cartons plume, papiers, critériums, gommes électriques et plus — commandés en 1 message, livrés directement sur ton campus.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{
          position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
          zIndex: 1, pointerEvents: 'none',
        }}
      >
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.28)', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'Outfit, sans-serif' }}>
          Scroll
        </span>
        <div style={{
          width: '28px', height: '46px',
          border: '1.5px solid rgba(255,255,255,0.18)',
          borderRadius: '14px',
          display: 'flex', justifyContent: 'center',
          paddingTop: '8px',
        }}>
          <motion.div
            animate={reduce ? {} : { y: [0, 16, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '5px', height: '5px', background: '#FFD600', borderRadius: '50%' }}
          />
        </div>
      </motion.div>
    </section>
  )
}

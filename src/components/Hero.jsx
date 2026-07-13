import { motion, useReducedMotion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const WA_LINK = 'https://wa.me/212752919680'
const IG_LINK = 'https://www.instagram.com/uir.archi.tools'

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

function MagBtn({ href, accent, children }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 180, damping: 14 })
  const sy = useSpring(my, { stiffness: 180, damping: 14 })

  const onMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left - r.width / 2) * 0.22)
    my.set((e.clientY - r.top - r.height / 2) * 0.22)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  if (accent) {
    return (
      <motion.a
        href={href} target="_blank" rel="noopener noreferrer"
        style={{
          x: sx, y: sy,
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          background: '#FFD600', color: '#06071E',
          fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '17px',
          padding: '16px 32px', borderRadius: '100px',
          boxShadow: '0 0 40px rgba(255,214,0,0.45)',
          textDecoration: 'none', position: 'relative', cursor: 'pointer',
        }}
        whileHover={reduce ? {} : { scale: 1.07, boxShadow: '0 0 80px rgba(255,214,0,0.75)' }}
        whileTap={reduce ? {} : { scale: 0.96 }}
        onMouseMove={onMove} onMouseLeave={onLeave}
      >
        <motion.span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: '-7px',
            borderRadius: '100px',
            border: '2px solid rgba(255,214,0,0.5)',
            pointerEvents: 'none',
          }}
          animate={reduce ? {} : { scale: [1, 1.1, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          aria-hidden="true"
          style={{
            position: 'absolute', inset: '-14px',
            borderRadius: '100px',
            border: '1.5px solid rgba(255,214,0,0.25)',
            pointerEvents: 'none',
          }}
          animate={reduce ? {} : { scale: [1, 1.14, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        {children}
      </motion.a>
    )
  }

  return (
    <motion.a
      href={href} target="_blank" rel="noopener noreferrer"
      style={{
        x: sx, y: sy,
        display: 'inline-flex', alignItems: 'center', gap: '10px',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.2)',
        color: '#fff',
        fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '17px',
        padding: '16px 32px', borderRadius: '100px',
        textDecoration: 'none', cursor: 'pointer',
      }}
      whileHover={reduce ? {} : {
        scale: 1.05,
        background: 'rgba(255,255,255,0.14)',
        borderColor: 'rgba(255,255,255,0.4)',
      }}
      whileTap={reduce ? {} : { scale: 0.97 }}
      onMouseMove={onMove} onMouseLeave={onLeave}
    >
      {children}
    </motion.a>
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

        {/* CTAs */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <MagBtn href={WA_LINK} accent>
            <WAIcon /> Commander sur WhatsApp
          </MagBtn>
          <MagBtn href={IG_LINK}>
            <IGIcon /> Voir le stock
          </MagBtn>
        </motion.div>
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

function WAIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  )
}

function IGIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

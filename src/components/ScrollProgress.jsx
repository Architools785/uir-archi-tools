import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #FFD600, #fff176)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 200,
        boxShadow: '0 0 10px rgba(255,214,0,0.6)',
      }}
    />
  )
}

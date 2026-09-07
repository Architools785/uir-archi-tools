import { AnimatePresence, motion } from 'framer-motion'

export default function Toast({ show, children }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            bottom: '28px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 200,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: '#FFD600',
            color: '#06071E',
            fontFamily: 'Outfit, sans-serif',
            fontWeight: 700,
            fontSize: '14px',
            padding: '14px 24px',
            borderRadius: '100px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4), 0 0 30px rgba(255,214,0,0.4)',
            whiteSpace: 'nowrap',
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

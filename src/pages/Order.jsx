import { useState } from 'react'
import { useParams, useNavigate, Navigate, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { PRODUCTS } from '../components/Products'

const QUANTITIES = Array.from({ length: 10 }, (_, i) => i + 1)

const fieldStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 'var(--radius-sm)',
  padding: '13px 16px',
  color: '#fff',
  fontFamily: 'Rubik, sans-serif',
  fontSize: '15px',
  outline: 'none',
  transition: 'border-color 0.2s',
}

function focusField(e) { e.currentTarget.style.borderColor = '#FFD600' }
function blurField(e) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <span style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '13px',
        color: 'rgba(255,255,255,0.7)', letterSpacing: '0.3px',
      }}>
        {label}
      </span>
      {children}
    </label>
  )
}

export default function Order() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const reduce = useReducedMotion()
  const product = PRODUCTS.find(p => p.slug === slug)

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [address, setAddress] = useState('')

  if (!product) return <Navigate to="/shop" replace />

  const total = product.price * quantity

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/commande-confirmee', {
      state: {
        productName: product.name,
        quantity,
        total,
      },
    })
  }

  return (
    <section style={{
      padding: '160px 24px 120px',
      background: 'var(--bg-deep)',
      position: 'relative', overflow: 'hidden',
      minHeight: '100vh',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255,214,0,0.35), transparent)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px', pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(45,47,196,0.32) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '28px' }}
        >
          <Link
            to="/shop"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Rubik, sans-serif', fontWeight: 500, fontSize: '14px',
              color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFD600'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            ← Retour à la boutique
          </Link>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: '40px', textAlign: 'center' }}
        >
          <span style={{
            display: 'inline-block',
            background: 'rgba(255,214,0,0.14)', border: '1px solid rgba(255,214,0,0.32)',
            color: '#FFD600', fontFamily: 'Outfit, sans-serif',
            fontWeight: 600, fontSize: '12px', letterSpacing: '1.5px',
            textTransform: 'uppercase', padding: '5px 14px', borderRadius: '100px', marginBottom: '20px',
          }}>
            Formulaire de commande
          </span>
          <h1 style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 900,
            fontSize: 'clamp(28px, 4.5vw, 42px)', color: '#fff',
            letterSpacing: '-1.2px', lineHeight: 1.1, marginBottom: '14px',
          }}>
            {product.name}
          </h1>
          <span style={{
            display: 'inline-block',
            fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '20px',
            color: '#06071E', background: '#FFD600',
            padding: '8px 20px', borderRadius: '100px',
          }}>
            {product.price} MAD
          </span>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius)',
            padding: '32px',
            display: 'flex', flexDirection: 'column', gap: '20px',
          }}
        >
          <Field label="Nom complet">
            <input
              type="text" required value={fullName}
              onChange={e => setFullName(e.target.value)}
              onFocus={focusField} onBlur={blurField}
              style={fieldStyle}
              placeholder="Ton nom et prénom"
            />
          </Field>

          <Field label="Téléphone">
            <input
              type="tel" required value={phone}
              onChange={e => setPhone(e.target.value)}
              onFocus={focusField} onBlur={blurField}
              style={fieldStyle}
              placeholder="06 XX XX XX XX"
            />
          </Field>

          <Field label="Cité">
            <input
              type="text" required value={city}
              onChange={e => setCity(e.target.value)}
              onFocus={focusField} onBlur={blurField}
              style={fieldStyle}
              placeholder="Ta cité / résidence"
            />
          </Field>

          <Field label="Quantité">
            <select
              required value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              onFocus={focusField} onBlur={blurField}
              style={{ ...fieldStyle, cursor: 'pointer' }}
            >
              {QUANTITIES.map(q => (
                <option key={q} value={q} style={{ background: '#0B0C35', color: '#fff' }}>
                  {q}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Adresse complète">
            <textarea
              required rows={3} value={address}
              onChange={e => setAddress(e.target.value)}
              onFocus={focusField} onBlur={blurField}
              style={{ ...fieldStyle, resize: 'vertical', fontFamily: 'Rubik, sans-serif' }}
              placeholder="Bâtiment, chambre, repères..."
            />
          </Field>

          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            background: 'rgba(255,214,0,0.1)',
            border: '1px solid rgba(255,214,0,0.35)',
            borderRadius: 'var(--radius-sm)',
            padding: '18px 22px',
            marginTop: '4px',
          }}>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '14px',
              color: 'rgba(255,255,255,0.75)', letterSpacing: '0.3px',
            }}>
              Total à payer
            </span>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '24px',
              color: '#FFD600',
            }}>
              {total} MAD
            </span>
          </div>

          <motion.button
            type="submit"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              background: '#FFD600', color: '#06071E',
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '17px',
              padding: '17px 30px', borderRadius: '100px',
              boxShadow: '0 0 40px rgba(255,214,0,0.35)',
              marginTop: '8px', width: '100%',
            }}
            whileHover={reduce ? {} : { scale: 1.03, boxShadow: '0 0 60px rgba(255,214,0,0.55)' }}
            whileTap={reduce ? {} : { scale: 0.97 }}
          >
            Confirmer la commande
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

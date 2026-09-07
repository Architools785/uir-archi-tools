import { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import FreeShippingProgress from '../components/FreeShippingProgress'

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

function itemLabel(item) {
  const subtotal = item.price * item.quantity
  return item.fixedQuantity
    ? `${item.name} — ${item.quantity} paquet${item.quantity > 1 ? 's' : ''} de ${item.fixedQuantity} — ${subtotal} MAD`
    : `${item.name} — ${item.quantity} x ${item.price} MAD = ${subtotal} MAD`
}

export default function Checkout() {
  const reduce = useReducedMotion()
  const navigate = useNavigate()
  const { items, totalPrice, totalCount, shippingFee, orderTotal, clearCart } = useCart()

  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [address, setAddress] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  if (items.length === 0) return <Navigate to="/panier" replace />

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('Nom complet', fullName)
      formData.append('Téléphone', phone)
      formData.append('Cité', city)
      formData.append('Adresse complète', address)

      items.forEach((item, idx) => {
        formData.append(`Produit ${idx + 1}`, itemLabel(item))
      })
      formData.append('Récapitulatif complet', items.map(itemLabel).join('\n'))
      formData.append("Nombre d'articles", totalCount)
      formData.append('Sous-total produits', `${totalPrice} MAD`)
      formData.append('Frais de livraison', `${shippingFee} MAD`)
      formData.append('Total à payer', `${orderTotal} MAD`)
      formData.append('Date de la commande', new Date().toLocaleString('fr-FR'))

      const response = await fetch('https://formspree.io/f/moeqnbej', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Formspree submission failed')
      }

      const confirmedItems = items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        fixedQuantity: item.fixedQuantity,
        unitLabel: item.unitLabel,
        subtotal: item.price * item.quantity,
      }))

      clearCart()

      navigate('/commande-confirmee', {
        state: {
          items: confirmedItems,
          subtotal: totalPrice,
          shippingFee,
          total: orderTotal,
        },
      })
    } catch {
      setSubmitError(
        "Une erreur est survenue lors de l'envoi de votre commande. Vérifiez votre connexion et réessayez."
      )
    } finally {
      setIsSubmitting(false)
    }
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

      <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ marginBottom: '28px' }}
        >
          <Link
            to="/panier"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Rubik, sans-serif', fontWeight: 500, fontSize: '14px',
              color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFD600'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          >
            ← Retour au panier
          </Link>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ marginBottom: '32px', textAlign: 'center' }}
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
            letterSpacing: '-1.2px', lineHeight: 1.1,
          }}>
            Finalise ta commande
          </h1>
        </motion.div>

        {/* Récapitulatif du panier */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 'var(--radius)',
            padding: '8px 24px',
            marginBottom: '24px',
          }}
        >
          {items.map(item => (
            <div key={item.slug} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '12px', padding: '14px 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              <div>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff' }}>
                  {item.name}
                </div>
                <div style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                  {item.fixedQuantity
                    ? `${item.quantity} paquet${item.quantity > 1 ? 's' : ''} de ${item.fixedQuantity}`
                    : `Quantité : ${item.quantity}`}
                </div>
              </div>
              <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '14px', color: '#FFD600', whiteSpace: 'nowrap' }}>
                {item.price * item.quantity} MAD
              </div>
            </div>
          ))}
          <div style={{ padding: '16px 0 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                Sous-total produits
              </span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '14px', color: 'rgba(255,255,255,0.8)' }}>
                {totalPrice} MAD
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                Frais de livraison
              </span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '14px', color: shippingFee === 0 ? '#34D399' : 'rgba(255,255,255,0.8)' }}>
                {shippingFee} MAD
              </span>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              paddingTop: '8px', marginTop: '2px', borderTop: '1px solid rgba(255,255,255,0.1)',
            }}>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '14px', color: 'rgba(255,255,255,0.75)' }}>
                Total général
              </span>
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 900, fontSize: '20px', color: '#FFD600' }}>
                {orderTotal} MAD
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.18 }}
          style={{ marginBottom: '24px' }}
        >
          <FreeShippingProgress compact />
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
              type="text" required name="Nom complet" value={fullName}
              onChange={e => setFullName(e.target.value)}
              onFocus={focusField} onBlur={blurField}
              style={fieldStyle}
              placeholder="Ton nom et prénom"
            />
          </Field>

          <Field label="Téléphone">
            <input
              type="tel" required name="Téléphone" value={phone}
              onChange={e => setPhone(e.target.value)}
              onFocus={focusField} onBlur={blurField}
              style={fieldStyle}
              placeholder="06 XX XX XX XX"
            />
          </Field>

          <Field label="Cité">
            <input
              type="text" required name="Cité" value={city}
              onChange={e => setCity(e.target.value)}
              onFocus={focusField} onBlur={blurField}
              style={fieldStyle}
              placeholder="Ta cité / résidence"
            />
          </Field>

          <Field label="Adresse complète">
            <textarea
              required rows={3} name="Adresse complète" value={address}
              onChange={e => setAddress(e.target.value)}
              onFocus={focusField} onBlur={blurField}
              style={{ ...fieldStyle, resize: 'vertical', fontFamily: 'Rubik, sans-serif' }}
              placeholder="Bâtiment, chambre, repères..."
            />
          </Field>

          {submitError && (
            <p style={{
              fontFamily: 'Rubik, sans-serif', fontSize: '14px', lineHeight: 1.6,
              color: '#FF6B6B', background: 'rgba(255,107,107,0.1)',
              border: '1px solid rgba(255,107,107,0.35)',
              borderRadius: 'var(--radius-sm)', padding: '14px 18px', margin: 0,
            }}>
              {submitError}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              background: '#FFD600', color: '#06071E',
              fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '17px',
              padding: '17px 30px', borderRadius: '100px',
              boxShadow: '0 0 40px rgba(255,214,0,0.35)',
              marginTop: '8px', width: '100%',
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
            whileHover={reduce || isSubmitting ? {} : { scale: 1.03, boxShadow: '0 0 60px rgba(255,214,0,0.55)' }}
            whileTap={reduce || isSubmitting ? {} : { scale: 0.97 }}
          >
            {isSubmitting ? 'Envoi en cours...' : 'Confirmer la commande'}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { useCart, PROMO_DISCOUNT_RATE } from '../context/CartContext'

const fieldStyle = {
  flex: 1,
  minWidth: 0,
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 'var(--radius-sm)',
  padding: '12px 16px',
  color: '#fff',
  fontFamily: 'Rubik, sans-serif',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
  textTransform: 'uppercase',
}

function focusField(e) { e.currentTarget.style.borderColor = '#FFD600' }
function blurField(e) { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)' }

export default function PromoCodeField({ compact = false }) {
  const {
    items, appliedPromoCode, isPromoActive, promoBelowMinimum, promoDiscount, applyPromoCode, removePromoCode,
    isStickerPromo, stickerPending, stickerDiscountedItemName,
  } = useCart()
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState('')
  const [isChecking, setIsChecking] = useState(false)

  const hasPromoExcludedItem = items.some(i => i.promoExcluded)

  const handleApply = async (e) => {
    e.preventDefault()
    if (isChecking) return
    setIsChecking(true)
    const result = await applyPromoCode(inputValue)
    setIsChecking(false)
    if (result.success) {
      setError('')
      setInputValue('')
    } else {
      setError(result.message)
    }
  }

  const handleRemove = () => {
    removePromoCode()
    setError('')
    setInputValue('')
  }

  if (appliedPromoCode) {
    return (
      <div style={{
        background: isPromoActive ? 'rgba(52,211,153,0.1)' : 'rgba(255,214,0,0.1)',
        border: `1px solid ${isPromoActive ? 'rgba(52,211,153,0.35)' : 'rgba(255,214,0,0.35)'}`,
        borderRadius: 'var(--radius-sm)',
        padding: compact ? '14px 18px' : '16px 20px',
        display: 'flex', flexDirection: 'column', gap: '8px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'Outfit, sans-serif', fontWeight: 800,
            fontSize: compact ? '13px' : '14px',
            color: isPromoActive ? '#34D399' : '#FFD600',
          }}>
            {isStickerPromo
              ? (isPromoActive ? `✅ Code appliqué : -${promoDiscount} DH` : `⏳ Code ${appliedPromoCode} en attente`)
              : isPromoActive
                ? `✅ Code ${appliedPromoCode} appliqué : -${Math.round(PROMO_DISCOUNT_RATE * 100)}% (-${promoDiscount} MAD)`
                : `⏳ Code ${appliedPromoCode} en attente`}
          </span>
          <button
            type="button"
            onClick={handleRemove}
            style={{
              background: 'transparent', border: 'none',
              color: 'rgba(255,255,255,0.5)',
              fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '12px',
              textDecoration: 'underline', cursor: 'pointer', padding: 0,
            }}
          >
            Retirer
          </button>
        </div>

        {promoBelowMinimum && (
          <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            Il te manque quelques DH d&apos;achat pour que la réduction s&apos;applique. Elle se réactive automatiquement dès que le minimum est atteint.
          </p>
        )}

        {isStickerPromo && isPromoActive && (
          <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', lineHeight: 1.5, color: 'rgba(255,255,255,0.6)', margin: 0, overflowWrap: 'anywhere' }}>
            🎯 Code sticker {appliedPromoCode} : -15 % sur 1 × {stickerDiscountedItemName}
          </p>
        )}

        {stickerPending && (
          <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', lineHeight: 1.5, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            Ce code s&apos;applique à un produit à l&apos;unité (hors packs). Il se réactive dès que tu en ajoutes un au panier.
          </p>
        )}

        {!isStickerPromo && isPromoActive && hasPromoExcludedItem && (
          <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            ℹ️ Les produits déjà en promo ne sont pas concernés par ce code.
          </p>
        )}

        <p style={{ fontFamily: 'Rubik, sans-serif', fontSize: '12px', lineHeight: 1.5, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
          Un seul code promo par commande : retire celui-ci pour en utiliser un autre.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={e => { setInputValue(e.target.value); if (error) setError('') }}
          onFocus={focusField} onBlur={blurField}
          placeholder="Code promo"
          aria-label="Code promo"
          style={fieldStyle}
        />
        <button
          type="submit"
          disabled={isChecking}
          style={{
            background: '#FFD600', color: '#06071E',
            fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '13px',
            padding: '0 22px', borderRadius: 'var(--radius-sm)',
            border: 'none', whiteSpace: 'nowrap', cursor: isChecking ? 'wait' : 'pointer',
            opacity: isChecking ? 0.7 : 1,
          }}
        >
          {isChecking ? '…' : 'Appliquer'}
        </button>
      </div>
      {error && (
        <p style={{
          fontFamily: 'Rubik, sans-serif', fontSize: '13px', lineHeight: 1.5,
          color: '#FF6B6B', margin: 0,
        }}>
          {error}
        </p>
      )}
    </form>
  )
}

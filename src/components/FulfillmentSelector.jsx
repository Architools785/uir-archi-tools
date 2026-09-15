import { useCart, FULFILLMENT_DELIVERY, FULFILLMENT_PICKUP } from '../context/CartContext'

const OPTIONS = [
  { value: FULFILLMENT_DELIVERY, icon: '🚚', label: 'Livraison sur le campus' },
  { value: FULFILLMENT_PICKUP, icon: '🏃', label: 'Je viens chercher ma commande' },
]

export default function FulfillmentSelector({ compact = false }) {
  const { fulfillmentMethod, setFulfillmentMethod } = useCart()

  return (
    <div
      role="radiogroup"
      aria-label="Mode de récupération de la commande"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
      }}
    >
      {OPTIONS.map(opt => {
        const selected = fulfillmentMethod === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setFulfillmentMethod(opt.value)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: selected ? 'rgba(255,214,0,0.14)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${selected ? 'rgba(255,214,0,0.55)' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: 'var(--radius-sm)',
              padding: compact ? '12px 14px' : '16px 18px',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 0.2s, border-color 0.2s',
            }}
          >
            <span style={{ fontSize: compact ? '18px' : '20px', lineHeight: 1 }}>{opt.icon}</span>
            <span style={{
              fontFamily: 'Outfit, sans-serif', fontWeight: 700,
              fontSize: compact ? '13px' : '14px',
              color: selected ? '#FFD600' : 'rgba(255,255,255,0.75)',
              lineHeight: 1.3,
            }}>
              {opt.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}

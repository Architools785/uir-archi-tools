import { packUnitValue, packSavings } from '../data/packs'

// Bloc prix d'un pack (carte et fiche) : valeur à l'unité barrée, prix du
// pack en gros, et l'économie réalisée uniquement si elle est positive.
export default function PackPrice({ pack, large = false, center = false }) {
  const unitValue = packUnitValue(pack)
  const savings = packSavings(pack)

  return (
    <div style={{
      display: 'flex', alignItems: 'center', flexWrap: 'wrap',
      justifyContent: center ? 'center' : 'flex-start',
      gap: large ? '12px' : '10px',
    }}>
      <span style={{
        fontFamily: 'Outfit, sans-serif', fontWeight: 900,
        fontSize: large ? '26px' : '20px',
        color: '#06071E', background: '#FFD600',
        padding: large ? '8px 22px' : '5px 16px', borderRadius: '100px',
      }}>
        {pack.price} DH
      </span>
      {unitValue > pack.price && (
        <span style={{
          fontFamily: 'Outfit, sans-serif', fontWeight: 600,
          fontSize: large ? '16px' : '14px',
          color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through',
        }}>
          <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
            Valeur à l&apos;unité :
          </span>
          {unitValue} DH
        </span>
      )}
      {savings > 0 && (
        <span style={{
          display: 'inline-flex', alignItems: 'center',
          background: 'rgba(52,211,153,0.14)', border: '1px solid rgba(52,211,153,0.4)',
          color: '#34D399', fontFamily: 'Outfit, sans-serif', fontWeight: 800,
          fontSize: large ? '13px' : '12px',
          padding: '5px 12px', borderRadius: '100px',
        }}>
          Tu économises {savings} DH
        </span>
      )}
    </div>
  )
}

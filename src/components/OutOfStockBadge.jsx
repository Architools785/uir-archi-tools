// Badge "Rupture de stock" réutilisé sur les cartes, le pack mis en avant,
// la fiche produit et le panier. Rouge (couleur d'erreur du site) sur fond
// bleu marine, même typographie que les autres badges.
export default function OutOfStockBadge({ size = 'md', style }) {
  const small = size === 'sm'
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      background: '#06071E', color: '#FF6B6B',
      border: '1px solid rgba(255,107,107,0.6)',
      fontFamily: 'Outfit, sans-serif', fontWeight: 800,
      fontSize: small ? '10px' : '11px',
      letterSpacing: '1px', textTransform: 'uppercase',
      padding: small ? '3px 10px' : '6px 14px', borderRadius: '100px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
      whiteSpace: 'nowrap',
      ...style,
    }}>
      <span aria-hidden="true" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#FF6B6B' }} />
      Rupture de stock
    </span>
  )
}

// Message bloquant affiché dans le panier et au checkout quand un article
// passé en rupture est encore dans le panier.
export function OutOfStockNotice({ items, onRemove }) {
  return (
    <div role="alert" style={{
      fontFamily: 'Rubik, sans-serif', fontSize: '14px', lineHeight: 1.6,
      color: 'rgba(255,255,255,0.8)', background: 'rgba(255,107,107,0.1)',
      border: '1px solid rgba(255,107,107,0.35)',
      borderRadius: 'var(--radius-sm)', padding: '16px 20px',
    }}>
      <strong style={{ display: 'block', fontFamily: 'Outfit, sans-serif', fontSize: '15px', color: '#FF6B6B', marginBottom: '6px' }}>
        {items.length > 1 ? 'Certains produits sont' : 'Un produit est'} en rupture de stock
      </strong>
      Retire {items.length > 1 ? 'ces produits' : 'ce produit'} de ton panier pour pouvoir finaliser ta commande :
      <ul style={{ listStyle: 'none', marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map(item => (
          <li key={item.slug} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#fff' }}>{item.name}</span>
            {onRemove && (
              <button
                type="button"
                onClick={() => onRemove(item.slug)}
                style={{
                  background: 'rgba(255,107,107,0.15)', border: '1px solid rgba(255,107,107,0.45)',
                  color: '#FF6B6B', fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '12px',
                  padding: '6px 14px', borderRadius: '100px',
                }}
              >
                Retirer du panier
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

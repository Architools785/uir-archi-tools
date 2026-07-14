import LegalPage from '../components/LegalPage'

const SECTIONS = [
  {
    heading: '1. Objet',
    paragraphs: [
      'Cette politique explique quelles données sont collectées lorsque tu utilises le site ou passes commande auprès de UIR Archi Tools, et comment elles sont utilisées.',
    ],
  },
  {
    heading: '2. Données collectées',
    paragraphs: [
      'Le site ne comporte ni formulaire, ni compte utilisateur, ni paiement en ligne : il ne collecte donc aucune donnée personnelle par lui-même.',
      'Les seules données échangées le sont directement via WhatsApp au moment de la commande : ton nom, ton numéro de téléphone, les produits souhaités et le lieu de remise sur le campus de l\'UIR.',
    ],
  },
  {
    heading: '3. Finalité du traitement',
    paragraphs: [
      'Ces informations sont utilisées uniquement pour traiter ta commande, organiser la livraison sur le campus et te contacter si nécessaire au sujet de cette commande.',
    ],
  },
  {
    heading: '4. Partage des données',
    paragraphs: [
      'Tes données ne sont ni vendues, ni partagées avec des tiers à des fins commerciales. Elles restent dans nos échanges WhatsApp et ne sont utilisées que par UIR Archi Tools.',
    ],
  },
  {
    heading: '5. Conservation',
    paragraphs: [
      'Les échanges WhatsApp liés à une commande sont conservés le temps nécessaire au suivi de la commande et, le cas échéant, à la gestion d\'une réclamation.',
    ],
  },
  {
    heading: '6. Cookies',
    paragraphs: [
      'Le site est une vitrine statique et n\'utilise pas de cookies de suivi publicitaire ni de traceurs tiers.',
    ],
  },
  {
    heading: '7. Tes droits',
    paragraphs: [
      'Tu peux à tout moment demander à consulter, corriger ou supprimer les informations que nous avons échangées, en nous contactant directement via WhatsApp ou Instagram.',
    ],
  },
  {
    heading: '8. Sécurité',
    paragraphs: [
      'Les échanges se font via WhatsApp, une messagerie chiffrée de bout en bout. Nous ne demandons jamais d\'informations bancaires, aucun paiement n\'étant effectué sur le site ou par ce canal.',
    ],
  },
  {
    heading: '9. Modifications',
    paragraphs: [
      'Cette politique peut être mise à jour ponctuellement. La version applicable est celle publiée sur cette page.',
    ],
  },
  {
    heading: '10. Contact',
    paragraphs: [
      'Pour toute question relative à tes données, contacte-nous via WhatsApp ou Instagram depuis la page Nous contacter.',
    ],
  },
]

export default function Privacy() {
  return (
    <LegalPage
      badge="Informations légales"
      title="Politique de confidentialité"
      intro="Nous accordons de l'importance à la confidentialité de tes informations. Voici comment elles sont traitées."
      updated="13 juillet 2026"
      sections={SECTIONS}
    />
  )
}

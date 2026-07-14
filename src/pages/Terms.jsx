import LegalPage from '../components/LegalPage'

const SECTIONS = [
  {
    heading: '1. Objet',
    paragraphs: [
      'Les présentes Conditions Générales d\'Utilisation (CGU) encadrent l\'utilisation du site UIR Archi Tools et les commandes de matériel d\'architecture passées auprès de nous. En consultant ce site ou en passant commande via WhatsApp, tu acceptes les présentes conditions.',
    ],
  },
  {
    heading: '2. Présentation du service',
    paragraphs: [
      'UIR Archi Tools est un service étudiant qui propose du matériel d\'architecture (carton plume, papiers, critériums, gommes électriques, colle, mines, etc.) livré directement sur le campus de l\'UIR.',
      'Le site sert de vitrine. Les stocks et prix du jour sont communiqués via les stories du compte Instagram @uir.archi.tools, et les commandes se font uniquement par message WhatsApp. Il n\'y a pas de création de compte ni de paiement en ligne sur le site.',
    ],
  },
  {
    heading: '3. Commandes',
    paragraphs: [
      'Toute commande se fait en envoyant un message WhatsApp indiquant les produits souhaités. La commande est considérée comme confirmée une fois que nous te répondons pour valider la disponibilité, le prix et les modalités de livraison.',
      'Nous nous réservons le droit de refuser ou d\'annuler une commande en cas de rupture de stock, d\'erreur manifeste sur un prix, ou d\'informations insuffisantes pour la livraison.',
    ],
  },
  {
    heading: '4. Prix et disponibilité',
    paragraphs: [
      'Les prix et quantités disponibles sont indicatifs et peuvent varier selon le stock réel, consultable via les stories Instagram. Le prix définitif est celui confirmé par message au moment de la commande.',
    ],
  },
  {
    heading: '5. Livraison',
    paragraphs: [
      'La livraison est assurée uniquement sur le campus de l\'UIR. Le lieu et le créneau de remise sont convenus directement par message avec le client au moment de la commande.',
      'Les délais annoncés sont donnés à titre indicatif et peuvent varier selon la disponibilité et le nombre de commandes en cours.',
    ],
  },
  {
    heading: '6. Paiement',
    paragraphs: [
      'Aucun paiement en ligne n\'est effectué sur le site. Le règlement se fait directement entre le client et UIR Archi Tools, selon les modalités convenues par message (espèces à la livraison sauf accord contraire).',
    ],
  },
  {
    heading: '7. Annulation et modification',
    paragraphs: [
      'Une commande peut être modifiée ou annulée tant qu\'elle n\'a pas encore été préparée ou livrée, en le signalant directement par WhatsApp.',
    ],
  },
  {
    heading: '8. Réclamations',
    paragraphs: [
      'En cas de produit manquant, endommagé ou non conforme à la commande, contacte-nous rapidement via WhatsApp afin que nous puissions trouver une solution (échange, complément ou remboursement selon le cas).',
    ],
  },
  {
    heading: '9. Responsabilité',
    paragraphs: [
      'UIR Archi Tools s\'efforce de fournir des produits conformes à la description communiquée. Notre responsabilité ne saurait être engagée en cas d\'usage inapproprié des produits ou de retard indépendant de notre volonté (indisponibilité fournisseur, imprévu logistique, etc.).',
    ],
  },
  {
    heading: '10. Propriété intellectuelle',
    paragraphs: [
      'Le contenu du site (textes, visuels, identité de marque) et du compte Instagram @uir.archi.tools est la propriété de UIR Archi Tools et ne peut être réutilisé sans autorisation.',
    ],
  },
  {
    heading: '11. Modification des CGU',
    paragraphs: [
      'Ces conditions peuvent être mises à jour à tout moment. La version en vigueur est celle publiée sur cette page.',
    ],
  },
  {
    heading: '12. Droit applicable et contact',
    paragraphs: [
      'Les présentes CGU sont soumises au droit marocain. Pour toute question, contacte-nous via WhatsApp ou Instagram depuis la page Nous contacter.',
    ],
  },
]

export default function Terms() {
  return (
    <LegalPage
      badge="Informations légales"
      title="Conditions générales d'utilisation"
      intro="Ces conditions s'appliquent à toute personne utilisant le site UIR Archi Tools ou passant commande auprès de nous."
      updated="13 juillet 2026"
      sections={SECTIONS}
    />
  )
}

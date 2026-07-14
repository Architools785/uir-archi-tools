import LegalPage from '../components/LegalPage'

const SECTIONS = [
  {
    heading: 'Qui sommes-nous',
    paragraphs: [
      'UIR Archi Tools est un service créé par et pour les étudiants d\'architecture de l\'UIR. Notre objectif : te faire gagner du temps en te livrant le matériel dont tu as besoin directement sur le campus, sans avoir à sortir le chercher en ville.',
    ],
  },
  {
    heading: 'Notre mission',
    paragraphs: [
      'Simplifier l\'accès au matériel d\'architecture — carton plume, papiers, critériums, gommes électriques, colle, mines et plus — avec des prix pensés pour les étudiants et un service rapide, sans détour.',
    ],
  },
  {
    heading: 'Comment ça marche',
    paragraphs: [
      'Le stock et les prix du jour sont partagés sur nos stories Instagram. Une fois que tu sais ce qu\'il te faut, un message WhatsApp suffit pour passer commande. On confirme, on prépare, on livre sur le campus.',
    ],
  },
]

export default function About() {
  return (
    <LegalPage
      badge="À propos"
      title="UIR Archi Tools"
      intro="Le matériel d'archi, livré sur ton campus."
      sections={SECTIONS}
    />
  )
}

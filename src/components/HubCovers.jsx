// Illustrations vectorielles des deux cartes de la page /boutique.
// 100 % SVG inline : aucun fichier image externe.

const LINE = '#E0E7FF'
const NEON = '#FFD600'
const FILL = '#1e1b4b'

const svgProps = {
  viewBox: '0 0 600 400',
  preserveAspectRatio: 'xMidYMid slice',
  width: '100%',
  height: '100%',
  fill: 'none',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  style: { display: 'block' },
}

// Dégradé, grille de plan et filtre glow partagés. Les ids sont préfixés pour
// que les deux SVG puissent cohabiter sur la même page.
function Defs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#1e1b4b" />
        <stop offset="1" stopColor="#312e81" />
      </linearGradient>
      <radialGradient id={`${id}-halo`} cx="0.5" cy="0.55" r="0.5">
        <stop offset="0" stopColor={NEON} stopOpacity="0.16" />
        <stop offset="1" stopColor={NEON} stopOpacity="0" />
      </radialGradient>
      <pattern id={`${id}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M40 0H0V40" stroke="#A5B4FC" strokeOpacity="0.09" strokeWidth="1" />
      </pattern>
      <filter id={`${id}-glow`} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  )
}

function Backdrop({ id }) {
  return (
    <>
      <rect width="600" height="400" fill={`url(#${id}-bg)`} />
      <rect width="600" height="400" fill={`url(#${id}-grid)`} />
      <ellipse cx="300" cy="220" rx="260" ry="190" fill={`url(#${id}-halo)`} />
    </>
  )
}

function Sparkle({ x, y, s = 1 }) {
  return (
    <path
      transform={`translate(${x} ${y}) scale(${s})`}
      d="M0-9C1-3 3-1 9 0C3 1 1 3 0 9C-1 3-3 1-9 0C-3-1-1-3 0-9Z"
      fill={NEON}
    />
  )
}

const range = n => Array.from({ length: n }, (_, i) => i)

export function PacksCover() {
  const id = 'cover-packs'
  return (
    <svg {...svgProps}>
      <Defs id={id} />
      <Backdrop id={id} />

      {/* Filigrane : colonnade et arches */}
      <g stroke="#A5B4FC" strokeOpacity="0.2" strokeWidth="1.2">
        {range(6).map(i => {
          const x = 30 + i * 108
          return (
            <g key={i}>
              <path d={`M${x} 400V150M${x + 14} 400V150`} />
              <path d={`M${x - 6} 150H${x + 20}M${x - 3} 143H${x + 17}`} />
              {i < 5 && <path d={`M${x + 14} 150A47 47 0 0 1 ${x + 108} 150`} />}
            </g>
          )
        })}
        <path d="M0 88H600M0 78H600" />
        <path d="M0 372H600" strokeDasharray="6 8" />
      </g>

      {/* Orbite pointillée autour du kit */}
      <ellipse cx="300" cy="215" rx="215" ry="120" stroke={NEON} strokeOpacity="0.3" strokeWidth="1.2" strokeDasharray="2 9" />

      <g stroke={LINE} strokeWidth="2.5">
        {/* Intérieur de la boîte + rabats arrière */}
        <path d="M200 232L300 192L400 232" strokeOpacity="0.55" />
        <path d="M300 192V262" strokeOpacity="0.3" strokeDasharray="4 6" />
        <path d="M200 232L168 200L268 160L300 192" fill={FILL} fillOpacity="0.7" />
        <path d="M300 192L332 160L432 200L400 232" fill={FILL} fillOpacity="0.7" />

        {/* Règle qui sort de la boîte */}
        <g transform="rotate(-13 262 250)">
          <rect x="248" y="86" width="28" height="190" rx="3" fill={FILL} fillOpacity="0.85" />
          {range(11).map(i => (
            <path key={i} strokeWidth="1.6" d={`M248 ${100 + i * 14}h${i % 2 ? 8 : 13}`} />
          ))}
        </g>

        {/* Gomme flottante */}
        <g transform="rotate(18 470 128)">
          <rect x="440" y="112" width="60" height="32" rx="7" fill={FILL} fillOpacity="0.85" />
          <path d="M462 112V144" />
          <path d="M448 122H455" strokeWidth="1.6" strokeOpacity="0.6" />
        </g>

        {/* Équerre flottante */}
        <g transform="rotate(-8 120 190)">
          <path d="M84 232V140L158 232Z" fill={FILL} fillOpacity="0.85" />
          <path d="M100 216V178L130 216Z" strokeWidth="1.6" />
        </g>
      </g>

      {/* Crayon néon */}
      <g filter={`url(#${id}-glow)`} stroke={NEON} strokeWidth="2.5" transform="rotate(14 334 250)">
        <path d="M324 280V128L334 100L344 128V280" fill={FILL} />
        <path d="M324 128H344M334 128V280" strokeWidth="1.6" />
        <path d="M331 108L334 100L337 108Z" fill={NEON} />
      </g>

      {/* Faces avant de la boîte (masquent le bas des outils) */}
      <g stroke={LINE} strokeWidth="2.5">
        <path d="M200 232L300 272V352L200 312Z" fill={FILL} />
        <path d="M300 272L400 232V312L300 352Z" fill="#26235f" />
        <path d="M200 232L182 262L282 302L300 272" fill="#26235f" />
        <path d="M400 232L418 262L318 302L300 272" fill={FILL} />
      </g>

      {/* Ruban néon + étincelles */}
      <g filter={`url(#${id}-glow)`}>
        <path d="M250 300V332M350 300V332" stroke={NEON} strokeWidth="3" />
        <path d="M250 300L241 282M350 300L359 282" stroke={NEON} strokeWidth="3" />
        <Sparkle x={300} y={318} s={0.9} />
        <Sparkle x={505} y={232} s={1.1} />
        <Sparkle x={150} y={98} s={0.8} />
        <Sparkle x={398} y={78} s={0.6} />
        <Sparkle x={86} y={300} s={0.55} />
      </g>
    </svg>
  )
}

export function UnitCover() {
  const id = 'cover-unit'
  return (
    <svg {...svgProps}>
      <Defs id={id} />
      <Backdrop id={id} />

      {/* Filigrane : plan d'étage, arche et cotes */}
      <g stroke="#A5B4FC" strokeOpacity="0.2" strokeWidth="1.2">
        <path d="M40 60H250V190H40ZM250 110H330V190H250" />
        <path d="M120 190V150M120 150A40 40 0 0 1 160 190" />
        <path d="M40 120H110M150 120H250" />
        <path d="M40 40H250M40 34V46M250 34V46" strokeDasharray="5 6" />
        <path d="M400 400V250A70 70 0 0 1 540 250V400M414 400V250A56 56 0 0 1 526 250V400" />
        <path d="M388 250H552" />
        <circle cx="470" cy="250" r="96" strokeDasharray="3 9" />
        <path d="M0 340H360" strokeDasharray="6 8" />
      </g>

      <g stroke={LINE} strokeWidth="2.5">
        {/* Carton plume : deux plaques empilées */}
        <path d="M396 292L486 256L566 290L476 326Z" fill={FILL} fillOpacity="0.9" />
        <path d="M396 292V302L476 336L566 300V290" />
        <path d="M476 326V336" />
        <path d="M396 310V318L476 352L566 316V308" strokeOpacity="0.6" />
        <path d="M476 344V352" strokeOpacity="0.6" />
        <path d="M430 291L484 270" strokeWidth="1.6" strokeOpacity="0.5" />

        {/* Règle graduée */}
        <g transform="rotate(-16 190 290)">
          <rect x="46" y="275" width="290" height="32" rx="4" fill={FILL} fillOpacity="0.9" />
          {range(19).map(i => (
            <path key={i} strokeWidth="1.6" d={`M${62 + i * 14.5} 275v${i % 5 === 0 ? 15 : 8}`} />
          ))}
        </g>

        {/* Rouleau de scotch */}
        <circle cx="462" cy="122" r="50" fill={FILL} fillOpacity="0.9" />
        <circle cx="462" cy="122" r="23" />
        <path d="M447 170L512 178L520 166L500 154" />
        <path d="M427 100A42 42 0 0 1 452 82" strokeWidth="1.6" strokeOpacity="0.6" />

        {/* Cutter */}
        <g transform="rotate(38 170 130)">
          <rect x="96" y="114" width="118" height="30" rx="8" fill={FILL} fillOpacity="0.9" />
          <rect x="128" y="122" width="34" height="14" rx="4" strokeWidth="1.8" />
          <path d="M138 126V132M145 126V132M152 126V132" strokeWidth="1.4" />
          <path d="M214 118H262L244 140H214" fill={FILL} fillOpacity="0.9" />
          <path d="M230 118L222 140M246 118L236 140" strokeWidth="1.4" strokeOpacity="0.7" />
        </g>
      </g>

      {/* Critérium néon */}
      <g filter={`url(#${id}-glow)`} stroke={NEON} strokeWidth="2.5" transform="rotate(-52 330 200)">
        <rect x="220" y="191" width="176" height="18" rx="4" fill={FILL} />
        <path d="M396 193L424 198V202L396 207" fill={FILL} />
        <path d="M424 200H436" strokeWidth="2" />
        <path d="M220 195H206V205H220" />
        <path d="M232 191V183H296" strokeWidth="2" />
        <path d="M352 191V209M362 191V209M372 191V209M382 191V209" strokeWidth="1.4" />
      </g>

      <g filter={`url(#${id}-glow)`}>
        <Sparkle x={300} y={72} s={1} />
        <Sparkle x={560} y={210} s={0.7} />
        <Sparkle x={70} y={236} s={0.75} />
        <Sparkle x={352} y={352} s={0.55} />
      </g>
    </svg>
  )
}

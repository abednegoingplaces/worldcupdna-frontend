export const NATION_COLORS: Record<string, string> = {
  MEXICO: '#006847', PANAMA: '#DA121A', HAITI: '#00205B', 'CURAÇAO': '#002B7F',
  CANADA: '#FF0000', USA: '#002868', JAPAN: '#BC002D', IRAN: '#239F40',
  'SOUTH KOREA': '#CD2E3A', AUSTRALIA: '#FFCD00', QATAR: '#8D1B3D',
  'SAUDI ARABIA': '#006C35', IRAQ: '#007A3D', UZBEKISTAN: '#1EB53A', JORDAN: '#007A3D',
  MOROCCO: '#c1272d', SENEGAL: '#00853F', EGYPT: '#CE1126', TUNISIA: '#E70013',
  ALGERIA: '#006233', 'SOUTH AFRICA': '#007749', 'IVORY COAST': '#F77F00',
  GHANA: '#006B3F', 'DR CONGO': '#007FFF', 'CAPE VERDE': '#003893',
  ARGENTINA: '#74acdf', BRAZIL: '#009c3b', COLOMBIA: '#FCD116', ECUADOR: '#FFD100',
  URUGUAY: '#5EB6E4', PARAGUAY: '#D52B1E', 'NEW ZEALAND': '#000000',
  FRANCE: '#002395', SPAIN: '#c60b1e', ENGLAND: '#CF1B1B', PORTUGAL: '#006600',
  GERMANY: '#000000', NETHERLANDS: '#FF6600', BELGIUM: '#EF3340', CROATIA: '#FF0000',
  SWITZERLAND: '#FF0000', AUSTRIA: '#ED2939', SCOTLAND: '#004B84', NORWAY: '#BA0C2F',
  SWEDEN: '#FECC02', TURKEY: '#E30A17', CZECHIA: '#D7141A',
  'BOSNIA AND HERZEGOVINA': '#002F6C', ITALY: '#009246', IRELAND: '#169B62',
  BRA: '#009c3b', GER: '#000000', ARG: '#74acdf', MEX: '#006847', FRA: '#002395',
  ESP: '#c60b1e', MAR: '#C1272D', CRO: '#FF0000', KOR: '#CD2E3A',
}

export function nationGradient(name: string): string {
  const key = name.toUpperCase().trim()
  const color = NATION_COLORS[key] || '#2a2a2a'
  return `linear-gradient(135deg, ${color}cc 0%, ${color}33 50%, #0f0f0f 100%)`
}

export function nationColor(name: string): string {
  return NATION_COLORS[name.toUpperCase().trim()] || '#2a2a2a'
}

/** ISO 3166-1 alpha-2 codes used to render real flag emoji. Keyed by both the
 *  full nation name and the football-data 3-letter code where handy. */
export const NATION_ISO: Record<string, string> = {
  MEXICO: 'MX', PANAMA: 'PA', HAITI: 'HT', 'CURAÇAO': 'CW', CANADA: 'CA', USA: 'US',
  JAPAN: 'JP', IRAN: 'IR', 'SOUTH KOREA': 'KR', AUSTRALIA: 'AU', QATAR: 'QA',
  'SAUDI ARABIA': 'SA', IRAQ: 'IQ', UZBEKISTAN: 'UZ', JORDAN: 'JO', MOROCCO: 'MA',
  SENEGAL: 'SN', EGYPT: 'EG', TUNISIA: 'TN', ALGERIA: 'DZ', 'SOUTH AFRICA': 'ZA',
  'IVORY COAST': 'CI', GHANA: 'GH', 'DR CONGO': 'CD', 'CAPE VERDE': 'CV',
  ARGENTINA: 'AR', BRAZIL: 'BR', COLOMBIA: 'CO', ECUADOR: 'EC', URUGUAY: 'UY',
  PARAGUAY: 'PY', 'NEW ZEALAND': 'NZ', FRANCE: 'FR', SPAIN: 'ES', ENGLAND: 'GB',
  PORTUGAL: 'PT', GERMANY: 'DE', NETHERLANDS: 'NL', BELGIUM: 'BE', CROATIA: 'HR',
  SWITZERLAND: 'CH', AUSTRIA: 'AT', SCOTLAND: 'GB', NORWAY: 'NO', SWEDEN: 'SE',
  TURKEY: 'TR', CZECHIA: 'CZ', 'BOSNIA AND HERZEGOVINA': 'BA', ITALY: 'IT', IRELAND: 'IE',
}

/** Returns a flag emoji for a nation name (e.g. "Brazil" → 🇧🇷), or '' if unknown. */
export function nationFlag(name: string): string {
  const iso = NATION_ISO[name.toUpperCase().trim()]
  if (!iso) return ''
  return iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)))
}

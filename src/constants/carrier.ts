export const CARRIER_ID_MAP: Record<string, number> = {
  SKT: 1,
  KT: 2,
  'LG U+': 3,
}

export const CARRIER_NAME_MAP: Record<number, string> = {
  1: 'SKT',
  2: 'KT',
  3: 'LG U+',
}

export const CARRIER_OPTIONS = ['SKT', 'KT', 'LG U+'] as const

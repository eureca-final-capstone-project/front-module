export const getTelecomBadgeColor = (companyName: string): string => {
  switch (companyName) {
    case 'LGU+':
    case 'LG U+':
      return 'bg-lguplus'
    case 'SKT':
      return 'bg-skt'
    case 'KT':
      return 'bg-kt'
    default:
      return 'bg-kt'
  }
}

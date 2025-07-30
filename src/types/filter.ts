import { SortLabel, SORT_BY } from '../constants/sortBy'
import { FilterState } from '../pages/PostPage/components/FilterBar'

export interface Range {
  min: string
  max: string
}

export type MobileFilterState = FilterState & {
  sort: SortLabel
}

export const initialFilterState: MobileFilterState = {
  sort: SORT_BY[0].label,
  salesTypeIds: [],
  telecomCompanyIds: [],
  statuses: [],
  selectedDataRange: null,
  appliedDataRange: { min: '', max: '' },
  selectedPriceRange: null,
  appliedPriceRange: { min: '', max: '' },
}

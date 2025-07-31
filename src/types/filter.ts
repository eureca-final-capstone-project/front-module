import { SortLabel, SORT_BY, MYPAGE_SORT, MyPageSortLabel } from '../constants/sortBy'
import { FilterState } from '../pages/PostPage/components/FilterBar'
import { FilterState as MyFilterState } from '../pages/MyPostPage/components/FilterBar'

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

export type MyMobileFilterState = MyFilterState & {
  sort: MyPageSortLabel
}

export const initialMyFilterState: MyMobileFilterState = {
  sort: MYPAGE_SORT[0].label,
  filter: 'ALL',
  status: 'ALL',
}

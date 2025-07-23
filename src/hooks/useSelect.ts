import { useState } from 'react'

const useSelect = (initialList: number[]) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const toggleId = (id: number) => {
    setSelectedIds(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]))
  }

  const selectAll = () => setSelectedIds(initialList)
  const clearAll = () => setSelectedIds([])

  const isSelected = (id: number) => selectedIds.includes(id)

  return { selectedIds, toggleId, selectAll, clearAll, isSelected }
}

export default useSelect

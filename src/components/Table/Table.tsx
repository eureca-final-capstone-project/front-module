import { Fragment, ReactNode, useState } from 'react'
import ArrowBottomIcon from '@/assets/icons/arrow-bottom.svg?react'

interface TableProps<T> {
  columns: { header: string; key: keyof T }[]
  data: T[]
  renderCell?: (key: keyof T, row: T) => ReactNode
  isClickable?: (row: T) => boolean
  isArrow?: boolean
  onRowClick?: (row: T) => void
  renderDetailTable?: (row: T) => ReactNode
}

const Table = <T,>({
  columns,
  data,
  renderCell,
  isClickable,
  isArrow = true,
  onRowClick,
  renderDetailTable,
}: TableProps<T>) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const handleRowClick = (row: T, index: number) => {
    onRowClick?.(row)
    if (expandedRows.includes(index)) {
      setExpandedRows(prev => prev.filter(i => i !== index))
    } else {
      setExpandedRows(prev => [...prev, index])
    }
  }

  return (
    <table className="w-full table-auto border-collapse overflow-hidden rounded-lg ring ring-gray-100">
      {/* 테이블 헤더 */}
      <thead className="bg-gray-50">
        <tr className="font-regular">
          <th className="px-3 py-4 opacity-0"></th>
          {columns.map(col => {
            const colSpan = col.key === 'email' ? 3 : 1
            return (
              <th
                key={String(col.key)}
                className="text-pri-900 px-3 py-4 text-left font-semibold"
                colSpan={colSpan}
              >
                {col.header}
              </th>
            )
          })}
        </tr>
      </thead>
      {/* 테이블 내용 */}
      <tbody className="bg-gray-10 text-gray-700">
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 3} className="px-3 py-4 text-center">
              데이터가 없습니다.
            </td>
          </tr>
        ) : (
          <>
            {data.map((row, rowIndex) => {
              const clickable = isClickable?.(row) ?? false
              return (
                <Fragment key={rowIndex}>
                  <tr
                    className={`border-t border-gray-100 ${clickable && 'cursor-pointer'}`}
                    onClick={() => clickable && handleRowClick(row, rowIndex)}
                  >
                    <td
                      className={`py-4 pl-4 text-right ${clickable && isArrow ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <ArrowBottomIcon
                        className={`w-3 text-gray-700 transition-transform duration-300 ease-in-out ${
                          expandedRows.includes(rowIndex) ? '-rotate-180' : ''
                        }`}
                      />
                    </td>
                    {columns.map(col => (
                      <td
                        key={String(col.key)}
                        className={`${col.key === 'email' ? 'max-w-47' : 'max-w-130'} overflow-hidden px-3 py-4 text-ellipsis whitespace-nowrap`}
                        colSpan={col.key === 'email' ? 3 : 1}
                      >
                        {renderCell ? renderCell(col.key, row) : String(row[col.key])}
                      </td>
                    ))}
                  </tr>

                  {clickable && (
                    <tr>
                      <td colSpan={columns.length + 3}>
                        <div
                          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                            expandedRows.includes(rowIndex)
                              ? 'max-h-screen opacity-100'
                              : 'max-h-0 opacity-0'
                          }`}
                        >
                          {renderDetailTable?.(row)}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              )
            })}
          </>
        )}
      </tbody>
    </table>
  )
}

export default Table

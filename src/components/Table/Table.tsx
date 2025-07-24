import { Fragment, ReactNode, useState } from 'react'

interface TableProps<T> {
  columns: { header: string; key: keyof T }[]
  data: T[]
  renderCell?: (key: keyof T, row: T) => ReactNode
  isExpandable?: (row: T) => boolean
  renderDetailTable?: (row: T) => ReactNode
}

const Table = <T,>({
  columns,
  data,
  renderCell,
  isExpandable,
  renderDetailTable,
}: TableProps<T>) => {
  const [expandedRowIndex, setExpandedRowIndex] = useState<number | null>(null)

  const handleRowClick = (index: number) => {
    setExpandedRowIndex(prev => (prev === index ? null : index))
  }

  return (
    <table className="w-full table-auto border-collapse overflow-hidden rounded-lg ring ring-gray-100">
      {/* 테이블 헤더 */}
      <thead className="bg-gray-50">
        <tr>
          <th className="px-3 py-4 opacity-0"></th>
          {columns.map(col => {
            const colSpan = col.key === 'email' ? 3 : 1
            return (
              <th key={String(col.key)} className="px-4 py-4 text-left" colSpan={colSpan}>
                {col.header}
              </th>
            )
          })}
        </tr>
      </thead>
      {/* 테이블 내용 */}
      <tbody className="bg-gray-10">
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 1} className="px-4 py-4 text-center">
              데이터가 없습니다.
            </td>
          </tr>
        ) : (
          <>
            {data.map((row, rowIndex) => {
              const expandable = isExpandable?.(row) ?? false
              return (
                <Fragment key={rowIndex}>
                  <tr
                    className="border-t border-gray-100"
                    onClick={() => expandable && handleRowClick(rowIndex)}
                  >
                    <td className="px-2 py-4 text-right opacity-0">{'>'}</td>
                    {columns.map(col => (
                      <td
                        key={String(col.key)}
                        className="px-3 py-4"
                        colSpan={col.key === 'email' ? 3 : 1}
                      >
                        {renderCell ? renderCell(col.key, row) : String(row[col.key])}
                      </td>
                    ))}
                  </tr>

                  {/* 상세 테이블 내용 */}
                  {expandable && expandedRowIndex === rowIndex && renderDetailTable?.(row)}
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

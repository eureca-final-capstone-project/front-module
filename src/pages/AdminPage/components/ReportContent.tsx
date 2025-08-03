interface ReportContentProps {
  reportContent: string
}

const ReportContent = ({ reportContent }: ReportContentProps) => {
  return (
    <section className="space-y-6">
      <h2 className="text-fs20 font-medium">신고 내용</h2>
      <div className="bg-gray-10 space-y-3 rounded-xs border border-gray-100 p-3 shadow-none">
        {reportContent}
      </div>
    </section>
  )
}

export default ReportContent

interface SectionDescriptionProps {
  text: string
}

const SectionDescription = ({ text }: SectionDescriptionProps) => {
  return (
    <p
      className="bg-pri-100 py-1.5 text-center text-base leading-snug font-medium text-gray-800 sm:rounded-t-md sm:text-lg"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  )
}

export default SectionDescription

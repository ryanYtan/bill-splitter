import {Tax} from "../hooks/useBill";

interface TaxItemProps {
  tax: Tax
  addTax: (title: string, percentage: number) => void
  deleteTax: (tax: Tax) => void
}

const TaxItem = (props: TaxItemProps) => {
  const { tax, addTax, deleteTax } = props

  return (
    <div>
      Tax Item
    </div>
  )
}

export default TaxItem
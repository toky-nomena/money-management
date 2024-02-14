import { decimalFormatter, integerLotFormatter } from '../formatters'

function getMaxLot(lot: number): number {
  if (lot <= 10) {
    return lot
  }

  if (lot < 1000) {
    return Math.ceil(lot / 10)
  }

  return 100
}

export function Lot({ lot }: { lot: number }) {
  const maxLot = getMaxLot(lot)

  const quotient = Math.floor(lot / maxLot)

  if (maxLot < 10) {
    return (
      <>
        {lot % 1 != 0
          ? decimalFormatter.format(lot)
          : integerLotFormatter.format(lot)}
      </>
    )
  }

  const remainder = integerLotFormatter.format(quotient)

  return (
    <>
      {maxLot} x {remainder} ({integerLotFormatter.format(lot)})
    </>
  )
}

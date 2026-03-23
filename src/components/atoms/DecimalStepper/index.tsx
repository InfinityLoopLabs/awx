import { FC, useState } from 'react'
import { Button, TextField } from '@mui/material'

type OwnPropertyType = {
  step: number | bigint
  label: number | bigint
}

export const DecimalStepper: FC<OwnPropertyType> = ({
  step,
  label = 'decimal',
}) => {
  const [decimalValue, setDecimalValue] = useState<bigint>(0n)

  // Если мы хотим сделать контролируемый компонент, то было бы неплохо
  // прокидывать value, onChange в пропсы и синхронизировать через useEffect

  // Input
  const onChangeDecimalValueHandler = (value: string) => {
    const normalizedValue = value.replace(',', '.').trim()

    if (Number.isNaN(normalizedValue)) {
      return
    }

    setDecimalValue(BigInt(normalizedValue))
  }
  // Input

  // Buttons
  const onClickDecimalValueHandler = (action: '+' | '-') => {
    setDecimalValue(prev => {
      switch (action) {
        case '+':
          return prev + BigInt(step)
        case '-':
          return prev - BigInt(step)
        default:
          return prev
      }
    })
  }
  // Buttons

  return (
    <>
      <Button onClick={() => onClickDecimalValueHandler('-')}>-</Button>
      <TextField
        label={label}
        variant="outlined"
        value={decimalValue}
        onChange={event => {
          onChangeDecimalValueHandler(event.target.value)
        }}
      />
      <Button onClick={() => onClickDecimalValueHandler('+')}>+</Button>
    </>
  )
}

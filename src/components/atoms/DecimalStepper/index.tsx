import { FC, useState } from 'react'
import { Button, TextField } from '@mui/material'
import Decimal from 'decimal.js'

type OwnPropertyType = {
  step: number | bigint
  label: number | bigint
}

export const DecimalStepper: FC<OwnPropertyType> = ({
  step,
  label = 'decimal',
}) => {
  const [decimalValue, setDecimalValue] = useState<Decimal>(new Decimal(0))
  const [hasError, setHasError] = useState<boolean>(false)

  const onChangeInputHandler = (value: string) => {
    if (!value) {
      setHasError(true)

      return
    }

    try {
      const normalized = value.replace(/,/g, '.')
      const nextValue = new Decimal(normalized)
      setDecimalValue(nextValue)
      setHasError(false)
    } catch (_) {
      setHasError(true)
    }
  }

  const onClickDecimalValueHandler = (action: '+' | '-') => {
    let stepDecimal: Decimal

    try {
      stepDecimal = new Decimal(
        typeof step === 'bigint' ? step.toString() : String(step),
      )
    } catch (error) {
      setHasError(true)

      return
    }

    setDecimalValue(prev => {
      const nextValue =
        action === '+' ? prev.add(stepDecimal) : prev.sub(stepDecimal)

      setHasError(false)

      return nextValue
    })
  }

  const controlSize = 56

  const buttonStyles = {
    width: controlSize,
    height: controlSize,
  }

  return (
    <div
      style={{
        display: 'inline-flex',
        gap: 8,
      }}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onClickDecimalValueHandler('-')}
        sx={buttonStyles}>
        -
      </Button>
      <TextField
        label={label}
        variant="outlined"
        inputMode="decimal"
        error={hasError}
        value={decimalValue.toString()}
        onChange={event => {
          onChangeInputHandler(event.target.value)
        }}
        sx={{
          '& .MuiInputBase-root': {
            height: controlSize,
          },
        }}
      />
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onClickDecimalValueHandler('+')}
        sx={buttonStyles}>
        +
      </Button>
    </div>
  )
}

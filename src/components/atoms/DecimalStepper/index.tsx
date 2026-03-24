import { FC, useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import Decimal from 'decimal.js'

type OwnPropertyType = {
  step: number
  label: string
}

export const DecimalStepper: FC<OwnPropertyType> = ({
  step,
  label = 'decimal',
}) => {
  const [decimalValue, setDecimalValue] = useState<Decimal>(new Decimal(0))
  const [hasError, setHasError] = useState<boolean>(false)

  const onChangeInputHandler = (value: string) => {
    try {
      const normalized = value.replace(/,/g, '.')

      if (!normalized.trim()) {
        setDecimalValue(new Decimal(0))
        setHasError(false)

        return
      }

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
      stepDecimal = new Decimal(String(step))
    } catch (_) {
      setHasError(true)

      return
    }

    setHasError(false)

    setDecimalValue(prev => {
      switch (action) {
        case '+': {
          return prev.add(stepDecimal)
        }
        case '-': {
          return prev.sub(stepDecimal)
        }
        default:
          return prev
      }
    })
  }

  useEffect(() => {
    try {
      const stepDecimal = new Decimal(String(step))

      if (stepDecimal.isZero()) {
        setHasError(false)

        return
      }

      const remainder = decimalValue.mod(stepDecimal)
      setHasError(!remainder.isZero())
    } catch (_) {
      setHasError(true)
    }
  }, [decimalValue, step])

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

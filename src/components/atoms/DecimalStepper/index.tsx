import { FC, useEffect, useState } from 'react'
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

  // Можно обойтись без этого state, но я хочу писать знаки "," "." с ручного ввода
  const [inputValue, setInputValue] = useState<string>('0')

  const [hasError, setHasError] = useState<boolean>(false)

  const onChangeInputHandler = (value: string) => {
    const sanitized = value.replace(/,/g, '.').replace(/[^0-9.-]/g, '')

    setInputValue(sanitized)
  }

  // useEffect(() => {}, [inputValue])

  // Если мы хотим сделать контролируемый компонент, то было бы неплохо
  // прокидывать value, onChange в пропсы и синхронизировать через useEffect

  // Buttons
  const onClickDecimalValueHandler = (action: '+' | '-') => {}
  // Buttons

  // CSS
  const controlSize = 56

  const buttonStyles = {
    width: controlSize,
    minWidth: controlSize,
    height: controlSize,
    borderRadius: 0,
    borderColor: hasError ? 'error.main' : undefined,
    color: hasError ? 'error.main' : undefined,
  }
  // CSS

  return (
    <div
      style={{
        display: 'inline-flex',
        gap: 8,
      }}>
      <Button
        variant="outlined"
        color={hasError ? 'error' : 'primary'}
        onClick={() => onClickDecimalValueHandler('-')}
        sx={buttonStyles}>
        -
      </Button>
      <TextField
        label={label}
        variant="outlined"
        inputMode="decimal"
        error={hasError}
        value={inputValue}
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
        color={hasError ? 'error' : 'primary'}
        onClick={() => onClickDecimalValueHandler('+')}
        sx={buttonStyles}>
        +
      </Button>
    </div>
  )
}

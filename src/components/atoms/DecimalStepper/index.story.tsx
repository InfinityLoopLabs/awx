import type { Meta, StoryObj } from '@storybook/react'
import { DecimalStepper } from './index'

const meta = {
  title: 'Atoms/DecimalStepper',
  component: DecimalStepper,
  args: {
    step: 0.1,
    label: 'Decimal Stepper',
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DecimalStepper>

type StoryType = StoryObj<typeof meta>

export const Playground: StoryType = {
  args: {
    step: 0.1,
    label: 'Decimal Stepper',
  },
}

export default meta

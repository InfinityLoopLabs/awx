import type { Meta, StoryObj } from '@storybook/react'
import { DecimalStepper } from './index'

const meta = {
  title: 'Atoms/DecimalStepper',
  component: DecimalStepper,
  args: {
    step: 0.1,
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof DecimalStepper>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    step: 0.1,
  },
}

export const IntegerStep: Story = {
  args: {
    step: 1,
  },
}

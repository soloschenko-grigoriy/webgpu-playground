import { fail } from '../fail'

export const getCanvas = () => {
  const canvas = document.querySelector('canvas')
  if (!canvas) {
    fail('No canvas detected')
    throw new Error('No canvas detected')
  }

  const context = canvas?.getContext('webgpu') as GPUCanvasContext
  if (!context) {
    fail('No context detected')
    throw new Error('No context detected')
  }

  return { canvas, context }
}

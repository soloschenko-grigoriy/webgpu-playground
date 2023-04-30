export const getCanvas = () => {
  const canvas = document.querySelector('canvas')
  if (!canvas) {
    throw new Error('No canvas detected')
  }

  const context = canvas?.getContext('webgpu') as GPUCanvasContext
  if (!context) {
    throw new Error('No context detected')
  }

  return { canvas, context }
}

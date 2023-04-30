export const getFormat = (device: GPUDevice, context: GPUCanvasContext) => {
  const format = navigator.gpu.getPreferredCanvasFormat()
  context.configure({
    device,
    format,
  })

  return format
}

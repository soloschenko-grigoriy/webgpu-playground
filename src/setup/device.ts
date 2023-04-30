export const getDevice = async (): Promise<GPUDevice> => {
  if (!navigator.gpu) {
    throw new Error('this browser does not support WebGPU')
  }

  const adapter = await navigator.gpu.requestAdapter()
  if (!adapter) {
    throw new Error('this browser supports webgpu but it appears disabled')
  }

  const device = await adapter.requestDevice()
  if (!device) {
    throw new Error('need a browser that supports WebGPU')
  }

  device.lost.then((info) => {
    throw new Error(`WebGPU device was lost: ${info.message}`)
  })

  return device
}

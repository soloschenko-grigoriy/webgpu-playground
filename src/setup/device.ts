import { fail } from '../fail'

export const getDevice = async (): Promise<GPUDevice> => {
  const adapter = await navigator.gpu?.requestAdapter()
  const device = await adapter?.requestDevice()
  if (!device) {
    fail('need a browser that supports WebGPU')
    throw new Error('need a browser that supports WebGPU')
  }

  return device
}

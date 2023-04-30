import { fail } from './fail'
import { getModule } from './modules'
import { getPipeline } from './pipelines'
import { render } from './render'

export async function main() {
  const adapter = await navigator.gpu?.requestAdapter()
  const device = await adapter?.requestDevice()
  if (!device) {
    fail('need a browser that supports WebGPU')
    return
  }

  const canvas = document.querySelector('canvas')
  const context = canvas?.getContext('webgpu') as GPUCanvasContext
  if (!context) {
    fail('No context detected')
    return
  }

  const format = navigator.gpu.getPreferredCanvasFormat()
  context.configure({
    device,
    format,
  })

  const pipeline = getPipeline(device, getModule(device), format)

  render(context, device, pipeline)
}

main()

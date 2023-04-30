import { fail } from './fail'
import { getDoublingComputeModule, getSimpleVSFSModule } from './modules'
import { getSimpleComputePipeline, getSimplePipeline } from './pipelines'
import { simpleComputeRender, simpleRender } from './renderers'

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

  simpleRender(context, device, getSimplePipeline(device, getSimpleVSFSModule(device), format))
  simpleComputeRender(device, getSimpleComputePipeline(device, getDoublingComputeModule(device)))
}

main()

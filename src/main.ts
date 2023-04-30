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
  if (!canvas) {
    fail('No canvas detected')
    return
  }

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

  simpleComputeRender(device, getSimpleComputePipeline(device, getDoublingComputeModule(device)))

  const pipeline = getSimplePipeline(device, getSimpleVSFSModule(device), format)
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const canvas = entry.target as HTMLCanvasElement
      const width = entry.contentBoxSize[0].inlineSize
      const height = entry.contentBoxSize[0].blockSize

      canvas.width = Math.min(width, device.limits.maxTextureDimension2D)
      canvas.height = Math.min(height, device.limits.maxTextureDimension2D)

      simpleRender(context, device, pipeline)
    }
  })

  observer.observe(canvas)
}

main()

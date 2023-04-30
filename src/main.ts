import { getDoublingComputeModule, getSimpleVSFSModule } from './modules'
import { getSimpleComputePipeline, getSimplePipeline } from './pipelines'
import { simpleComputeRender, simpleRender } from './renderers'
import { getCanvas, getDevice, getFormat } from './setup'

export async function main() {
  const device = await getDevice()
  const { canvas, context } = getCanvas()
  const format = getFormat(device, context)

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

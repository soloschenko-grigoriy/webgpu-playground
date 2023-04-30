import { fail } from './fail'

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

  const module = device.createShaderModule({
    label: 'our hardcoded red triangle shaders',
    code: `
          @vertex fn vs(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4f {
              var pos = array<vec2f, 3>(
                  vec2f(0.0, 0.5), //  center top
                  vec2f(-0.5, -0.5), // left bottom
                  vec2f(0.5, -0.5), // right bottom
              );

              return vec4f(pos[vertexIndex], 0.0, 1.0);
          }

          @fragment fn fs() -> @location(0) vec4f {
              return vec4f(1.0, 0.0, 0.0, 1.0);
          }
      `,
  })

  const pipeline = device.createRenderPipeline({
    label: 'our hardcoded red triangle pipeline',
    layout: 'auto',
    vertex: {
      module,
      entryPoint: 'vs',
    },
    fragment: {
      module,
      entryPoint: 'fs',
      targets: [{ format }],
    },
  })

  function render(device: GPUDevice) {
    const renderPassDescriptor: GPURenderPassDescriptor = {
      label: 'our basic canvas renderPass',
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          clearValue: [0.0, 0.3, 0.3, 1],
          loadOp: 'clear',
          storeOp: 'store',
        },
      ],
    }

    const encoder = device.createCommandEncoder({ label: 'our encoder' })
    const pass = encoder.beginRenderPass(renderPassDescriptor)
    pass.setPipeline(pipeline)
    pass.draw(3)
    pass.end()

    const commandBuffer = encoder.finish()
    device.queue.submit([commandBuffer])
  }

  render(device)
}

main()
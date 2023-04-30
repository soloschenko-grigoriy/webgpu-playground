export const simpleRender = (context: GPUCanvasContext, device: GPUDevice, pipeline: GPURenderPipeline) => {
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

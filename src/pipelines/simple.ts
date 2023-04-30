export const getSimplePipeline = (device: GPUDevice, module: GPUShaderModule, format: GPUTextureFormat) =>
  device.createRenderPipeline({
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

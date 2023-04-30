export const getSimpleComputePipeline = (device: GPUDevice, module: GPUShaderModule) =>
  device.createComputePipeline({
    label: 'doubling compute pipeline',
    layout: 'auto',
    compute: {
      module,
      entryPoint: 'computeSmth',
    },
  })

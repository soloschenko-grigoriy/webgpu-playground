export const getDoublingComputeModule = (device: GPUDevice) =>
  device.createShaderModule({
    label: 'doubling compute module',
    code: `
        @group(0) @binding(0) var <storage, read_write> data: array<f32>;

        @compute @workgroup_size(1) fn computeSmth(@builtin(global_invocation_id) id: vec3<u32>){
            let i = id.x;
            data[i] = data[i] * 2.0; 
        }
    `,
  })

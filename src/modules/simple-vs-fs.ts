export const getSimpleVSFSModule = (device: GPUDevice) =>
  device.createShaderModule({
    label: 'our hardcoded red triangle shaders',
    code: `
        @vertex fn vs(@builtin(vertex_index) vertexIndex: u32) -> @builtin(position) vec4f {
            var pos = array<vec2f, 3>(
                vec2f(0.0, 0.5), // center top
                vec2f(-0.5, -0.5), // left bottom
                vec2f(0.5, -0.5), // right bottom
            );
        
            return vec4f(pos[vertexIndex], 0.0, 1.0);
        }

        @fragment fn fs() -> @location(0) vec4f {
            return vec4f(1.0, 1.0, 0.0, 1.0);
        }
      `,
  })

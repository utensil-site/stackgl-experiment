var vec2 = require('gl-vec2');

var glNow = require("gl-now");
var createShader = require('gl-shader');
var createBuffer = require("gl-buffer");
var createVAO = require("gl-vao");
var divideTriangle = require('./divideTriangle');

export default function drawTriangles(domId, config) {

  var shader, vao;

  var firstFrame = true;

  var triangles = divideTriangle(
    vec2.fromValues(-0.7, 0),
    vec2.fromValues(0, -0.7),
    vec2.fromValues(0.7, 0.7),
    config.level, config.gasket);

  var shell = config.lastShell ? config.lastShell : glNow({
    element: 'main'
  });

  if(config.lastShell) {
    init();
  }

  config.lastShell = shell;

  function init() {
    var gl = shell.gl;

    //Create shader
    shader = createShader(gl,
      require('./glsl/dummy/vert.glsl'),
      require('./glsl/dummy/frag.glsl'));

    shader.attributes.position.location = 0;

    //Create vertex array object
    vao = createVAO(gl, [
      { "buffer": createBuffer(gl, triangles),
        "type": gl.FLOAT,
        "size": 2
      }
    ]);
  }

  shell.on('gl-init', init);

  shell.on('gl-render', function(t) {
    var gl = shell.gl;

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    gl.clearColor(0,0,0,0);
    gl.clearDepth(1.0);
    gl.clearStencil(0);

    //Bind shader
    shader.bind();

    //Bind vertex array object and draw it
    vao.bind();

    if(config.wireframe) {
      for (var i = 0; i < triangles.length / 2; i += 3) {
        vao.draw(gl.LINE_LOOP, 3, i);
      }
    } else {
      vao.draw(gl.TRIANGLES, triangles.length / 2);
    }

    //Set uniforms
    if(config.animation && !firstFrame) {
      shader.uniforms.t += 0.01;
    } else {
      shader.uniforms.t = 0.0;
    }
    shader.uniforms.theta = config.degrees / 360.0 * 3.141592653;
    shader.uniforms.omega = 3.141592653 / 9.0;

    //Unbind vertex array when fini
    vao.unbind();

    firstFrame = false;
  });
}

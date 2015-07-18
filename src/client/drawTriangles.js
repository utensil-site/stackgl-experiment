var vec2 = require('gl-vec2');

var glNow = require("gl-now");
var createShader = require('gl-shader');
var createBuffer = require("gl-buffer");
var createVAO = require("gl-vao");
var divideTriangle = require('./divideTriangle');

var lastShell = null;

export default function drawTriangles(domId, config) {

  if(lastShell) {
    lastShell.paused = true;
    $('#main').empty();
  }

  var shell = glNow({
    element: 'main'
  });

  lastShell = shell;

  var shader, vao;

  var triangles = divideTriangle(
    vec2.fromValues(-0.5, 0),
    vec2.fromValues(0, -0.5),
    vec2.fromValues(0.5, 0.5),
    config.level);

  shell.on('gl-init', function() {
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

  });

  shell.on('gl-render', function(t) {
    var gl = shell.gl;

    //Bind shader
    shader.bind();

    //Bind vertex array object and draw it
    vao.bind()
    vao.draw(gl.TRIANGLES, triangles.length / 2);

    //Set uniforms
    if(config.animation) {
      shader.uniforms.t += 0.01;
    }
    shader.uniforms.theta = config.degrees / 360.0 * 3.141592653;
    shader.uniforms.omega = 3.141592653 / 9.0;

    //Unbind vertex array when fini
    vao.unbind();
  });
}

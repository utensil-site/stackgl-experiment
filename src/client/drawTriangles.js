var vec2 = require('gl-vec2');

var glNow = require("gl-now");
var createShader = require('gl-shader');
var createBuffer = require("gl-buffer");
var createVAO = require("gl-vao");
var divideTriangle = require('./divideTriangle');

export default function drawTriangles(domId, config) {

  var shader, vao;

  var firstFrame = true;
  var posOffset = vec2.fromValues(0, 0);

  var triangles = divideTriangle(
    vec2.fromValues(-0.7, 0),
    vec2.fromValues(0, -0.7),
    vec2.fromValues(0.7, 0.7),
    config.level, config.gasket);

  var shell = config.lastShell ? config.lastShell : glNow({
    element: 'main'
  });

  function bindKeys() {
    console.log("Bind keyboard commands");
    ["move-left", "move-right", "move-up", "move-down"].forEach(function (vk) {
      shell.unbind(vk);
    });

    //Bind keyboard commands
    shell.bind("move-left", "left", "A");
    shell.bind("move-right", "right", "D");
    shell.bind("move-up", "up", "W");
    shell.bind("move-down", "down", "S");
  }

  if(config.lastShell) {
    init();
  }

  bindKeys();

  config.lastShell = shell;

  $("#main").click(function () {
    $('#main').focus();
  });

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

  //Fired once per game tick
  function interact() {
    if(shell.wasDown("move-left")) {
      posOffset[0] -= 0.01;
      console.log(posOffset);
    }
    if(shell.wasDown("move-right")) {
      posOffset[0] += 0.01;
      console.log(posOffset);
    }
    if(shell.wasDown("move-up")) {
      posOffset[1] += 0.01;
      console.log(posOffset);
    }
    if(shell.wasDown("move-down")) {
      posOffset[1] -= 0.01;
      console.log(posOffset);
    }

    console.log(shell.bindings);
  }

  shell.on('gl-render', function(t) {
    var gl = shell.gl;

    interact();

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
    shader.uniforms.posOffset = posOffset;

    //Unbind vertex array when fini
    vao.unbind();

    firstFrame = false;
  });
}

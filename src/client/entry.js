require('babel/polyfill');
require('./vendor/bootstrap-3.3.5/css/bootstrap.min.css');
//require('./vendor/bootcards-1.1.2/css/bootcards-desktop.min.css');
require('./assets/less/index.less');
require('script!./vendor/jquery.min.js');
require('script!./vendor/bootstrap-3.3.5/js/bootstrap.min.js');
//require('script!./vendor/bootcards-1.1.2/js/bootcards.min.js');

//Initialize shell
var glNow = require("gl-now");
var createShader = require('gl-shader');
var createBuffer = require("gl-buffer");
var createVAO = require("gl-vao");
var divideTriangle = require('./divideTriangle');
var drawTriangles = require('./drawTriangles');

var config = {
  level: 5,
  degrees: 90,
  animation: true
};

drawTriangles('main', config);

$('#refresh').click(function () {
  var level = $('#tessellation-level').val();
  var degrees = $('#twist-degree').val();

  config.level = /\d+/.test(level) ? parseInt(level) : 5;
  config.degrees = /\d+/.test(degrees) ? parseInt(degrees) : 90;
  config.animation = $('#whether-animation').is(':checked') == true;

  console.log($('#whether-animation').attr('checked'));

  try {
    drawTriangles('main', config);
  } catch (e) {
    console.error(e);
  } finally {

  }

  return false;
});

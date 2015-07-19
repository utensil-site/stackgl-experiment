var vec2 = require('gl-vec2');

function triangle(a, b, c) {
  var ret = [];
  [a, b, c].forEach(function (v) {
    ret.push(v[0]);
    ret.push(v[1]);
  });
  return ret;
}

function divideTriangle(a, b, c, count, gasket) {

  //console.log('divideTriangle', a, b, c, count);

  // check for end of recursion
  if ( count === 0 ) {
      return triangle( a, b, c );
  } else {
      //bisect the sides
      var ab = vec2.create(), ac = vec2.create(), bc = vec2.create();
      vec2.lerp(ab, a, b, 0.5);
      vec2.lerp(ac, a, c, 0.5);
      vec2.lerp(bc, b, c, 0.5);

      --count;

      var centerTriangle = gasket ? [] : divideTriangle(ac, bc, ab, count, gasket);

      // three new triangles
      return centerTriangle.concat(
        divideTriangle(a, ab, ac, count, gasket),
        divideTriangle(c, ac, bc, count, gasket),
        divideTriangle(b, bc, ab, count, gasket)
      );
  }
}

module.exports = divideTriangle;

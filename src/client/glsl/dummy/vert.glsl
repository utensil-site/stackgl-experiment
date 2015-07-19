precision highp float;
attribute vec3 position;
uniform float theta;
uniform float omega;
uniform float t;
uniform vec2 posOffset;

varying vec2 uv;
void main() {
  vec4 pos = vec4(position, 1.0);
  float x = pos.x + posOffset.x;
  float y = pos.y + posOffset.y;
  float d = sqrt(pow(x, 2.0) + pow(y, 2.0));
  float angle = (theta + omega * t) * d;
  pos.x = x * cos(angle) - y * sin(angle);
  pos.y = x * sin(angle) + y * cos(angle);
  gl_Position = pos;
  uv = position.xy;
}

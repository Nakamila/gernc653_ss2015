#ifdef GL_ES
precision mediump float;
#endif
# define PI 3.14159265359

uniform vec2 u_resolution;
uniform float u_time;

vec3 colorB = vec3(0.5,0.709,0.);
vec3 colorA = vec3(0.317,0.031,0.619);

// emotion: enxious - feeling sick and afraid all mixed up

void main() {
    vec3 color = vec3(0.0);

//float pct = (tan(cos(PI*(u_time/2.0))));

//float pct = (1.0 - abs(u_time));

//float pct = fract(u_time) - ceil (u_time);

//float pct = abs(tan(abs( fract(u_time) - ceil(u_time))));;
 
//   float pct = (tan(u_time));

float pct = clamp(ceil(u_time),0.0, 1.0) - fract (abs (tan(u_time)));

    // Mix uses pct (a value from 0-1) to 
    // mix the two colors
    color = mix(colorA, colorB, pct); 

    gl_FragColor = vec4(color,1.0);
}
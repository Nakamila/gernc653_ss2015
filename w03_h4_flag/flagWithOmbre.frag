#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorB = vec3(0.709,0.090,0.239);
vec3 colorA = vec3(0.031,0.309,0.423);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.y);
    
     pct.r = step(0.5, st.y);
     pct.g = clamp (tan(( st.x)*PI), 0.2, 0.9);
     pct.b = step(st.y,0.8);

    color = mix(colorA, colorB, pct);

    gl_FragColor = vec4(color,1.0);
}
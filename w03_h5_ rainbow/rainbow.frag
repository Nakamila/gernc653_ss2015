  // I have the colors in the right order but don't know how to mix the last part from magenta to cyan

#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(1.0, 1.0, 0.0);
vec3 colorB = vec3(1.0, 0.0,0.0);
vec3 colorC = vec3(1.0, 0.0,1.0);
vec3 colorD = vec3(0.0, 1.0,1.0);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);
    
    pct.r = smoothstep(0.0, 0.3, st.x);
  pct.g = smoothstep(0.0, 0.3, st.x);
    pct.b = smoothstep(0.0, 1.0, st.x);

  
   if (st.x <0.33){
        color = mix(colorA, colorB, pct); 
    } 
    if ( st.x>0.33 && st.x < 0.66){
       color = mix(colorB, colorC, pct); 
   } 
    if (st.x>0.66){
       color = mix(colorC, colorD,pct); 
   }

    gl_FragColor = vec4(color,1.0);
}


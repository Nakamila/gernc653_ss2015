#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

//aqua to pink
vec3 colorA = vec3(0.031,0.309,0.423);
vec3 colorB = vec3(0.619,0.411,0.105);

// //yellow to dark blue
// vec3 colorA = vec3(0.129,0.180,0.423);
// vec3 colorB = vec3(1.,0.588,0.0);


float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(u_time);
    
     pct.r = smoothstep(0.0, 1.0, st.y);
     pct.g =  clamp (sin(st.y*0.7), 0.0, 0.5);
     pct.b = 1.0 - pow(abs(sin(PI*(u_time/5.0))),0.4);

    color = mix(colorA, colorB, pct);

 

    gl_FragColor = vec4(color,1.0);
}
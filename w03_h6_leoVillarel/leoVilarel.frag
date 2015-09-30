#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 colorA = vec3(0.9, 0.30,0.5);
vec3 colorB = vec3(0.5,0.2,0.6);


float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.x);
    
     pct.r = smoothstep(0.,0.9, st.y*(tan(u_time)));
     pct.g = clamp (tan((- st.y)*PI), 0.0, 0.9) * (sin(u_time));
     pct.b = pow(st.x,0.1);

    color = mix(colorA, colorB, pct);

    

    gl_FragColor = vec4(color,1.0);
}
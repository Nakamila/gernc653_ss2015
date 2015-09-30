#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// // brigth colors - aqua and redish
vec3 colorA = vec3(0.709,0.090,0.239);
vec3 colorB = vec3(0.031,0.309,0.423);

// brigth colors - aqua and redish  - inverted
// vec3 colorA = vec3(0.931,0.509,0.923);
// vec3 colorB = vec3(0.709,0.790,0.339);


//aqua and lilac
// vec3 colorA = vec3(0.031,0.309,0.423);
// vec3 colorB = vec3(0.709,0.431,0.619);


// aqua and dark blue
// vec3 colorA = vec3(0.309,0.7,0.7);
// vec3 colorB = vec3(0.3,0.309,0.423);

// // yellow and 
// vec3 colorA = vec3 (0.3, 0.93, 0.);
// vec3 colorB = vec3(0.,0.3,0.9);

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) - 
          smoothstep( pct, pct+0.01, st.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    vec3 pct = vec3(st.y);
    
//     pct.r = 1. - smoothstep(0.3*st.y,0.7, st.y);
//      pct.g = clamp (tan((-st.y)*PI), 0.0, 0.9)+ tan (st.x*(-0.9));
//      pct.b = pow(st.x*0.5,0.1);
    
    
//best
     pct.r = smoothstep(0.,0.9*st.x, st.y) ;
     pct.g = clamp (tan((st.y)*PI), 0.3, 0.9) + cos (st.x);
     pct.b =pow(st.x,0.2);
    
//      pct.r = 1. - smoothstep(0.3,0.7, st.y);
//      pct.g = clamp (tan((st.y*0.9)*PI), 0.3, 0.9);
//      pct.b = 1. - smoothstep(0.7,0.9, st.y);

    color = mix(colorA, colorB, pct);


    gl_FragColor = vec4(color,1.0);
}
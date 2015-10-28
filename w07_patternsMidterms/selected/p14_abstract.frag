#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float box(vec2 st, vec2 size){
    st += .5;
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,
                        size+vec2(0.001),
                        st);
    uv *= smoothstep(size,
                    size+vec2(0.001),
                    vec2(1.0)-st);
    return uv.x*uv.y;
}

float rectC(vec2 st, float size){
    return  box(st, vec2(size, size)) - (1.-smoothstep((size)-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0));
   
}

float stripes(vec2 st) {
    return step(st.y/4.,st.x/2.);
}
 

vec2 tile(vec2 st) {
    return floor(st);
}
vec2 brick(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x += .5;
    }
    return st;
}

vec2 truchet(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x = 1.-st.x;
    }
    if (mod(st_i.x,2.) == 1.) {
        st.y = 1.-st.y;
    }
    return st;
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    
   
    
    vec3 color = vec3(st.x, st.y, 0.5);
    


    
    st *= 2.;
    
    st = truchet(st*3.);
    st = brick(st*2.);
    
  
    
    vec2 st_f = fract(st);
     st_f -= vec2(0.5);
    // rotate the space
    st_f = rotate2d( sin(u_time)*PI ) * st_f;
    // move it back to the original place
    st_f += vec2(0.5);
    
    float pct = stripes(st_f) + rectC (st_f, .5);
    color -= pct;
    
    
    gl_FragColor = vec4(color,1.0);
}
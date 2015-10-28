#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));

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



void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st-=0.5;
    
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.);
 
    pos = matrix * pos;
    
    color = vec3(0.0);
    
    
    color += rectC (pos.xy, 0.8);

    
    gl_FragColor = vec4( color ,1.);
}
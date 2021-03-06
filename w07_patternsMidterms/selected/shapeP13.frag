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



float moon(vec2 st, float size){
    return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0) - ( 1.-smoothstep(size*0.7-(size*0.7*0.01),
                         size*0.7+(size*0.7*0.01),
                         dot(st-0.1,st-0.1)*4.0)) ;
}



void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st-=0.5;
    
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.);
 
    pos = matrix * pos;
    
    color = vec3(0.0);
    
    
    color += moon (pos.xy, 0.2);

    
    gl_FragColor = vec4( color ,1.);
}
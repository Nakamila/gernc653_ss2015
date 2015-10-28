#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415
#define TWOPI 6.283

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

float cross(vec2 st, float size){
    return  box(st, vec2(size,size/12.)) + 
            box(st, vec2(size/12.,size));
   
}

float stripes(vec2 st) {
    return step(st.y/4.,st.x/2.);
}
 
float circle(vec2 st, float size){
  return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0);
}

//blurried circle
float circleB(vec2 st, float size){
  return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.9),
                         dot(st,st)*4.0);
}





float poly(float n, float x, float y, vec2 st){
    st = st-vec2(2.*x-1.,2.*y-1.);
    float a = atan(st.x,st.y)+PI;
    float r = TWOPI/float(n);
    return (cos(floor(.5+a/r)*r-a)*length(st));
}




mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution;
  
    vec3 color = vec3(0.0);


  float d = 0.;
   
  
  
    
    vec2 st_f = fract(st);
    st_f -= vec2(0.5);
    //rotate the space
   st_f = rotate2d( 0.2 ) * st_f;
   st_f = scale( vec2(fract(sin(1.5)+1.0) )) * st_f;

    
     d = 10.*poly(5.,.5,.5,st_f); // Number of sides, x position, y position, st
    
    
    
    float pct = cross(st_f, 2.0) + circle (st_f - 0.5, 0.4);
    color += pct + (1.-vec3(smoothstep(.1,.41,d*0.5)));
    
    
  gl_FragColor = vec4(color,1.0);
}
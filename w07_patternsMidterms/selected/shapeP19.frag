#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415
#define TWOPI 6.283

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;





//blurried circle
float circleB(vec2 st, float size){
  return 1.-smoothstep(size-(size*0.9),
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
    //vec3 color = vec3 (st.x, st.y, 0.5);

  float d, d2 = 0.;

	
  
  
    
    vec2 st_f = fract(st);
    st_f -= vec2(0.5);
    //rotate the space

	st_f+= 0.5;


    d2 = poly(5.,.7,.80, st_f); // to make a polygon 5 sides
    
    
    float pct =  circleB (st_f - 0.4, 0.001)+ circleB (st_f-0.6, 0.01 * abs(sin (u_time))) + circleB (st_f - 0.2, 0.0017 *abs(cos (u_time))) + circleB (st_f - 0.8, 0.0017 * abs(tan (u_time)));
    color -= pct - (1.-vec3(smoothstep(.1,0., d2*0.5))); // smoothstep to make the "star"
    
    
  gl_FragColor = vec4(color,1.0);
}
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (float x) {
    return fract(sin(x)*10e5);
}

float time (float t){
  return floor((u_time)*t);    

}

void main(){
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    st *= vec2(10.,10.);
   // st.y += u_time*0.5;
 
    
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    

    vec3 color = vec3(random(time(2.)+i_st.x)); 
   
    
    if (mod(i_st.x,2.) == 1.){ 
    color -= vec3(random(-time(0.)+i_st.y));
    }
    
//       if (i_st.x == 2.){ 
//     color -= vec3(random(time(20.)+i_st.y));
//     }
    
//     if (i_st.x == 3.){ 
//     color -= vec3(random(-time(4.)+i_st.y));
//     }
     
//      if (i_st.x == 4.){ 
//     color -= vec3(random(time(8.)+i_st.y));
//     }
  
    
        color *= vec3 (0., 1.0, .0);
    
  gl_FragColor = vec4(color,1.);
    
} 
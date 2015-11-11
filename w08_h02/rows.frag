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
    
    st *= vec2(100.,10);
    st.x += u_time*0.5;
 
    
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    

     vec3 color = vec3(random(time(2.)+i_st.x)); 
   
    if (i_st.y == 1.){ 
    color = vec3(random(-time(50.)+i_st.x));
    }
    
      if (i_st.y == 2.){ 
    color = vec3(random(time(20.)+i_st.x));
    }
    
    if (i_st.y == 3.){ 
    color = vec3(random(-time(4.)+i_st.x));
    }
     
     if (i_st.y == 4.){ 
    color = vec3(random(time(8.)+i_st.x));
    }
     if (i_st.y == 5.){ 
    color = vec3(random(-time(10.)+i_st.x));
    }
     if (i_st.y == 6.){ 
    color = vec3(random(time(50.)+i_st.x));
    }
     if (i_st.y == 7.){ 
    color = vec3(random(-time(20.)+i_st.x));
    }
    
       if (i_st.y == 8.){ 
    color = vec3(random(-time(10.)+i_st.x));
    }
       if (i_st.y == 9.){ 
    color = vec3(random(-time(5.)+i_st.x));
    }
    
    
  gl_FragColor = vec4(color,1.);
    
} 
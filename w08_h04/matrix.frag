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
    
    st *= vec2(100.,50.);
    
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);


    float pct = random(-time(8.)-i_st.y);
    
    if (i_st.x == 1.){ 
    pct += random(-time(10.)-i_st.y);
    }

    vec3 color = vec3(step(pct,f_st.y)-step(0.1,f_st.x));
    color *= vec3 (0., 1.0, .0);
   
	gl_FragColor = vec4(color,1.0); 
}
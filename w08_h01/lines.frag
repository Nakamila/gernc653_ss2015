#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (float x) {
    return fract(sin(x)*10e5);
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    st *= vec2(30.,2);
    st.x += u_time*0.5;
 
    
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    
    float time = floor(tan(u_time)*.5);
     vec3 color = vec3(random(time+i_st.x)); 
   
    if (i_st.y == 1.){ 
        color = vec3(random(-time+i_st.x));
    }
    
   
    
    
    gl_FragColor = vec4(color,1.0);
    
}
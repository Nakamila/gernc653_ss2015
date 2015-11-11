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
    
    st *= vec2(20.,8);
    
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);
    
    float time = floor(u_time*8.);

    float pct = random(time-i_st.y);

    if (i_st.y == 1.){ 
 		 pct -= random((-time)-i_st.y);
    }

    vec3 color = vec3(step(pct,f_st.x)-step(0.7,f_st.y));
    color *= vec3 (st.x/10., st.y/10., 1.0);
   
	gl_FragColor = vec4(color,1.0); 
}
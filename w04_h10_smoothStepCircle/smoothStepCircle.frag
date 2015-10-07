#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    st*= 2.0;
    st.x-= 0.5;
    st.y-=0.5;
    
    float pct = 0.0;
    


    // b. The LENGTH of the vector 
    //    from the pixel to the center 
     vec2 toCenter = vec2(0.5)-st;
     pct = smoothstep(length(toCenter),0.6, 0.59);

 

    vec3 color = vec3(pct);

	gl_FragColor = vec4( color, 1.0 );
}
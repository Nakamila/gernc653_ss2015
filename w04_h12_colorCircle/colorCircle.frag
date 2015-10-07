

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
 
     vec2 toCenter = vec2(0.5)-st;
     pct = smoothstep(length(toCenter),0.594, 0.59);


    vec2 color = vec2(pct);

    // add red
    
	gl_FragColor = vec4( 1.0, color, 1.0 );
}
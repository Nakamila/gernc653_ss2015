#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    st*= 2.0;
    st.x-= .5;
    st.y-= .5;
    
    
    float pct = 0.0;

    // a. The DISTANCE from the pixel to the center
    pct = distance(st,vec2(0.5));

   

    vec3 color = vec3(pct);

	gl_FragColor = vec4( color, 1.0 );
}
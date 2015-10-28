#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;



float circle(vec2 st, float size){
	return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0);
}

//blurried circle


void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    
   
    
    vec3 color = vec3 (0.0);



    vec2 st_f = fract(st);
   


    
    float pct =  circle (st_f - 0., 0.2) + circle (st_f - 0.4, 0.4) ;
    color += pct;
    
    
	gl_FragColor = vec4(color,1.0);
}
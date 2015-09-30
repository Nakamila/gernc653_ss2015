#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_resolution;


float F (float x, float p, float w){
return (smoothstep(p-0.5*w, p, x) + smoothstep (p+0.5*w, p, x)) -1.0;
        
}
void main() {
    vec2 st = gl_FragCoord.xy/ u_resolution.xy;
	vec3 color = vec3 (0.0);
	

	float pct = F(st.x, pow(tan(PI*(u_time/0.9)),0.6),.2);
 		pct += F(st.y, pow(tan(PI*(u_time/0.9)),0.6),.2);



 // not quite   
// float pct = F (st.x, 1.0 - pow(max(0.0, abs(tan(u_time*0.9))-0.8), 3.5), .1);
//   pct += F (st.y, 1.0 - pow(max(0.0, abs(tan(u_time*0.9))-0.8), 3.5), .1);


    
    color = vec3 (step(0.8, pct*0.5));
    gl_FragColor = vec4 (color, 1.0);
    
}

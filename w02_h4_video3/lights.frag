#ifdef GL_ES
precision mediump float;
#endif

uniform float u_time;
uniform vec2 u_resolution;


float F (float x, float p, float w){

		float k = pow(p+w,p+w) / (pow(p,p)*pow(w,w));
	return k * pow( x, p ) * pow( 1.0-x, w );
//return (smoothstep(p-0.5*w, p, x) + smoothstep (p+0.5*w, p, x)) -1.0;
        
}
void main() {
    vec2 st = gl_FragCoord.xy/ u_resolution.xy;
	vec3 color = vec3 (0.0);
	
    vec2 p = vec2(abs(tan(u_time*0.7)), sin(u_time*0.9))*0.5 +0.6;


    float pct = F(st.x, p.x,.1);
    pct += F(st.y, p.y,.1);
    
    
  color = vec3 (step(0.9, pct*0.5));
    gl_FragColor = vec4 (color, 1.0);
    
}

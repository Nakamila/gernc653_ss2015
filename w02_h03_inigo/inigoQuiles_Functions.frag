#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform float u_time;
uniform vec2 u_resolution;


float F (float x, float p, float w){

// //Exponential Step
	return exp (-p*pow(x,w));

//Power curve

	// float k = pow(p+w,p+w) / (pow(p,p)*pow(w,w));
	// return k * pow( x, p ) * pow( 1.0-x, w );


// Parabola
//   return pow( 4.0*x*(1.0-x), p );

//return (smoothstep(p-0.5*w, p, x) + smoothstep (p+0.5*w, p, x)) -1.0;
        
}
void main() {
    vec2 st = gl_FragCoord.xy/ u_resolution.xy;
	vec3 color = vec3 (0.0);
	
	
	//float pct = F(st.x, pow(tan(cos(PI*(u_time/2.0))),1.0 - abs(u_time)),.4);
	float pct = F(st.x, 1.0 - pow(abs(cos(u_time*0.7)),.5),.5);


    color = vec3 (pct);
    gl_FragColor = vec4 (color, 1.0);
    
}
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
	
    
   
//	float pct = F(st.x, 1.0 - pow(abs(cos(u_time*0.7)),.5),.1);
//	float pct = F(st.x, 1.0 - pow(abs(cos(u_time*0.7)),1.0),.4);
//	float pct = F(st.x, 1.0 - pow(abs(cos(u_time*0.7)),1.5),.4);
//	float pct = F(st.x, 1.0 - pow(abs(cos(u_time*0.7)),2.0),.4);
//	float pct = F(st.x, 1.0 - pow(abs(cos(u_time*0.7)),2.5),.4);  
//	float pct = F(st.x, 1.0 - pow(abs(cos(u_time*0.7)),3.0),.4);  
//	float pct = F(st.x, 1.0 - pow(abs(cos(u_time*0.7)),3.5),.4); 


//  float pct = F(st.x, pow(cos(PI*(cos(u_time/2.0))),.5),.4);
//  float pct = F(st.x, pow(cos(PI*(cos(u_time/2.0))),1.0),.4);
//	float pct = F(st.x, pow(cos(PI*(cos(u_time/2.0))),1.5),.4);
//	float pct = F(st.x, pow(cos(PI*(cos(u_time/2.0))),2.0),.4);
//	float pct = F(st.x, pow(cos(PI*(cos(u_time/2.0))),2.5),.4);
//	float pct = F(st.x, pow(cos(PI*(cos(u_time/2.0))),3.0),.4);
//	float pct = F(st.x, pow(cos(PI*(u_time/2.0)),3.5),.4);
//float pct = F(st.x, pow(tan(PI*(u_time/0.7)),0.5),.4); // without cos

//	float pct = F(st.x, 1.0 - pow(abs(sin(PI*(u_time/2.0))),0.5),.4);
//	float pct = F(st.x, 1.0 - pow(abs(sin(PI*(u_time/2.0))),1.0),.4);
//	float pct = F(st.x, 1.0 - pow(abs(sin(PI*(u_time/2.0))),1.5),.4);
//	float pct = F(st.x, 1.0 - pow(abs(sin(PI*(u_time/2.0))),2.0),.4);
//	float pct = F(st.x, 1.0 - pow(abs(sin(PI*(u_time/2.0))),2.5),.4);
//	float pct = F(st.x, 1.0 - pow(abs(sin(PI*(u_time/2.0))),3.0),.4);
//	float pct = F(st.x, 1.0 - pow(abs(sin(PI*(u_time/2.0))),3.5),.4);

//	float pct = F (st.x, pow(min(cos(PI *(u_time/2.0)), 1.0 - abs(u_time)), 0.5), 0.4);
//	float pct = F (st.x, pow(min(cos(PI *(u_time/2.0)), 1.0 - abs(u_time)), 1.0), 0.4);
//	float pct = F (st.x, pow(min(cos(PI *(u_time/2.0)), 1.0 - abs(u_time)), 1.5), 0.4);
//	float pct = F (st.x, pow(min(cos(PI *(u_time/2.0)), 1.0 - abs(u_time)), 2.0), 0.4);
//	float pct = F (st.x, pow(min(cos(PI *(u_time/2.0)), 1.0 - abs(u_time)), 2.5), 0.4);
//	float pct = F (st.x, pow(min(cos(PI *(u_time/2.0)), 1.0 - abs(u_time)), 3.0), 0.4);
//	float pct = F (st.x, pow(min(cos(PI *(u_time/2.0)), 1.0 - abs(u_time)), 3.5), 0.4);

//	float pct = F (st.x, 1.0 - pow(max(0.0, abs(sin(u_time*2.0)-1.0)), 0.5), .4);
	float pct = F (st.x, 1.0 - pow(max(0.0, abs(sin(u_time*2.0)-1.0)), 1.0), .4);
//	float pct = F (st.x, 1.0 - pow(max(0.0, abs(sin(u_time*2.0)-1.0)), 1.5), .4);
//	float pct = F (st.x, 1.0 - pow(max(0.0, abs(sin(u_time*2.0)-1.0)), 2.0), .4);
//	float pct = F (st.x, 1.0 - pow(max(0.0, abs(sin(u_time*2.0)-1.0)), 2.5), .4);
//	float pct = F (st.x, 1.0 - pow(max(0.0, abs(sin(u_time*2.0)-1.0)), 3.0), .4);
//	float pct = F (st.x, 1.0 - pow(max(0.0, abs(sin(u_time*2.0)-1.0)), 3.5), .4);



//	float pct = F(st.x, pow(tan(cos(PI*(u_time/2.0))),1.0 - abs(u_time)),.4);



    color = vec3 (pct);
    gl_FragColor = vec4 (color, 1.0);
    
}

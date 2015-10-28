#ifdef GL_ES
precision mediump float;
#endif
#define PI 3.1415

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float box(vec2 st, vec2 size){
    st += .5;
    size = vec2(0.5) - size*0.5;
    vec2 uv = smoothstep(size,
                        size+vec2(0.001),
                        st);
    uv *= smoothstep(size,
                    size+vec2(0.001),
                    vec2(1.0)-st);
    return uv.x*uv.y;
}

float rectC(vec2 st, float size){
    return  box(st, vec2(size, size)) - (1.-smoothstep((size)-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0));
   
}

float cross(vec2 st, float size){
    return  box(st, vec2(size,size/12.)) + 
            box(st, vec2(size/12.,size));
   
}


 
float circle(vec2 st, float size){
	return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.1),
                         dot(st,st)*4.0);
}



mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    
   
    
    vec3 color = vec3(0.0);


    
    vec2 st_f = fract(st);
     st_f -= vec2(0.5);

    
    float pct = circle(st_f,0.2) - rectC (st_f, .5) + cross(st_f, 2.0);
    color += pct;
    
    
	gl_FragColor = vec4(color,1.0);
}
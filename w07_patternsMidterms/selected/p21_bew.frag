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

float stripes(vec2 st) {
    return step(st.y/4.,st.x/2.);
}
 
float circle(vec2 st, float size){
	return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0);
}

//blurried circle
float circleB(vec2 st, float size){
	return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.9),
                         dot(st,st)*4.0);
}


float moon(vec2 st, float size){
    return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0) - ( 1.-smoothstep(size*0.7-(size*0.7*0.01),
                         size*0.7+(size*0.7*0.01),
                         dot(st-0.1,st-0.1)*4.0)) ;
}

vec2 tile(vec2 st) {
    return floor(st);
}
vec2 brick(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x += .5;
    }
    return st;
}

vec2 truchet(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.x = 1.-st.x;
    }
    if (mod(st_i.x,2.) == 1.) {
        st.y = 1.-st.y;
    }
    return st;
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    
   
    
    vec3 color = vec3(0.0);

    st *= 2.;
    
    st = truchet(st*5.);
    //st = brick(st*4.);
 	
     st *= 2.;
    
    vec2 st_i = floor(st);


    
    if (mod(st_i.y, 2.) == 1.) {
        st.x += cos(u_time*0.5);
    }
   
    if (mod(st_i.x, 2.) == 1.) {
        st.y += sin(u_time*0.5);
       
    }
    if (mod(st_i.y, 3.) == 1.) {
        st.x += cos(u_time*0.5);
    }
   
    if (mod(st_i.x, 3.) == 1.) {
        st.y += sin(u_time*0.5);
       
    }
   
    
   st*= 0.5;
    vec2 st_f = fract(st);
   // color.rb = st_f;
    st *= 2.;




    
    float pct =  + circle (st_f - 0.5, 0.4) + cross (st_f -1., 0.9) + cross (st_f, 0.9);
    color += pct;
    
    
	gl_FragColor = vec4(color,1.0);
}
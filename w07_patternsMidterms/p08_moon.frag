#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));

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
    return  box(st, vec2(size/20.,size/5.)) + 
            box(st, vec2(size/5.,size/20.)) + (1.-smoothstep((size)-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*9.))
        ;
   
}

float circle(vec2 st, float size){
	return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0);
}


float moon(vec2 st, float size){
    return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0) - ( 1.-smoothstep(size*0.7-(size*0.7*0.01),
                         size*0.7+(size*0.7*0.01),
                         dot(st-0.4,st-0.4)*4.0)) ;
}

mat3 translationMatrix(vec2 f) {
    return mat3(vec3(1.0,0.0,0.0),
               	vec3(0.0,1.0,0.0),
               	vec3(f.x,f.y,1.0));
}

void translate(vec2 f) {
    matrix = translationMatrix(f) * matrix;
}


mat3 rotationMatrix(float a) {
    return mat3(vec3(cos(a),-sin(a),0.0),
               	vec3(sin(a),cos(a),0.0),
               	vec3(0.0,0.0,1.0));
}

void rotate(float a) {
    matrix = rotationMatrix(a) * matrix;
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

vec2 truchetI(vec2 st){
    vec2 st_i = floor(st);
    if (mod(st_i.y,2.) == 1.) {
        st.y = 1.-st.x;
    }
    if (mod(st_i.x,2.) == 1.) {
        st.x = 1.-st.y;
    }
    return st;
}

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    st *= 10.5 ;
    st = fract(st);
        
 st = truchetI(st*.5);
    st = brick(st*2.0);


    
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.);
    
   translate(vec2(-0.3*sin(u_time), 0.05-abs(cos(u_time))));
    rotate(sin(u_time));
    
    pos = matrix * pos;
    
   
    float pct = moon(st_f.xy-.30, .5) + circle(st_f.xy-.8, .2);
    color += pct;  
 

    
    gl_FragColor = vec4( color ,1.);
}
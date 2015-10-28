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



float moon(vec2 st, float size){
    return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0) - ( 1.-smoothstep(size*0.7-(size*0.7*0.01),
                         size*0.7+(size*0.7*0.01),
                         dot(st-0.1,st-0.1)*4.0)) ;
}

float circle(vec2 st, float size){
	return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0);
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
    
    vec3 color = vec3(0.,0.,0.0);
   
    st *= 15.;
    
    vec2 st_i = floor(st);

    if (mod(st_i.y, 2.) == 1.){
        st.x = 1.- st.x * (2.);
        
    }

      if (mod(st_i.y, 2.) == 1.){
        st.x = 1.- st.x * (2.);
        
    }
    
   st*= 0.5;
    vec2 st_f = fract(st);
  //  color.rb = st_f;
    st *= 2.;
    
    
    
    vec3 pos = vec3(st_f,1.);

    pos = matrix * pos;
   
   

    float pct = moon(st_f.xy-.30, .5) + circle(st_f.xy-.8, .2);
    color += pct;        
    



    
    gl_FragColor = vec4( color ,1.);
}
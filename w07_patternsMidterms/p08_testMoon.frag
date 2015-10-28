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
   // st*= 5.;
   // st.xy -= 3.;
//     st *= 10.5 ;
//     st = fract(st);
        
//  st = truchetI(st*.5);
//     st = brick(st*2.0);
//    //  st = tile(st*2.5);

    st *= 15.;
    
    vec2 st_i = floor(st);

    
    //   if (mod(st_i.y, 2.) == 1.) {
    //     st.y -= .5 *u_time;
    // }
    
    // if (mod(st_i.y, 2.) == 1.){
    //     st.x = (1.- st.x)* (u_time*0.1);
        
    // }
    // if (mod(st_i.x, 2.) == 1.){
    //     st.y = 1.- st.y * (u_time*0.06);
        
    // }
    //   if (mod(st_i.x, 2.) == 1.) {
    //     st.x -= .5 *u_time;
    // }
    
   // st*= 0.5;
    vec2 st_f = fract(st);
    color.rb = st_f;
    st *= 2.;
    
    
    
    vec3 pos = vec3(st_f,1.);

    pos = matrix * pos;
    
   //  translate(vec2(-0.5));
   //	rotate((45.+ u_time/3.0));
   //translate(vec2(-0.3));
  //  translate(vec2(-0.3*sin(u_time), 0.05-abs(cos(u_time))));
    rotate(sin(u_time));
 	//translate(vec2 (0.2));
    
    

    float pct = moon(pos.xy-.28, .2) + circle(pos.xy-.48, .05);
    color += pct;        
    



    
    gl_FragColor = vec4( color ,1.);
}
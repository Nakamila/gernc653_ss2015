#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1416

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;

uniform vec2 u_mouse;
uniform float u_time;

mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));

mat3 scaleMatrix(vec2 f) {
    return mat3(vec3(f.x,0.0,0.0),
                vec3(0.0,f.y,0.0),
                vec3(0.0,0.0,1.0));
}

void scale(in vec2 f) {
    matrix = scaleMatrix(f) * matrix;
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


vec2 rotate2d (vec2 st, float angle) {
    st -= 0.5;
    st =  mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle)) * st;
    st += 0.5;
    return st;
}


mat2 rotate2D(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}



vec2 kaleidoscope (vec2 st){

    st *= 4.0;


    float f = 0.0;    
    f += step(1., mod(st.x,2.0));
    f += step(1., mod(st.y,2.0))*2.0;

   
    st = fract(st);

    // rotate the cells so the center is mirrored 
    if(f == 1.0){
        st = rotate2d( st,-PI*0.5);
    } else if(f == 2.0){
        st = rotate2d(st,-PI);
    } else if(f == 3.0){
        st = rotate2d(st,PI*0.5);
    }

    return st;
    }




void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

     // st *= 2.0;
     
    st = kaleidoscope (st);
  
   vec2 st_f = fract(st);
   //st_f += vec2(0.5);
    //rotate the space
   st_f = rotate2D( 0.2 * u_time) * st_f;

    
    vec4 color = vec4(st.x,st.y,0.0,1.0);
    


    color = texture2D(u_tex0,st_f);

    gl_FragColor = color;
}
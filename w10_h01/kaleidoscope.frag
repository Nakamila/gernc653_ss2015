#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1416

uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

uniform vec2 u_resolution;

uniform vec2 u_mouse;
uniform float u_time;


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

vec2 rotate2d (vec2 st, float angle) {
    st -= 0.5;
    st =  mat2(cos(angle),-sin(angle),
                sin(angle),cos(angle)) * st;
    st += 0.5;
    return st;
}

vec2 kaleidoscope (vec2 st){

    st *= 2.0;


    float f = 0.0;    
    f += step(1., mod(st.x,2.0));
    f += step(1., mod(st.y,2.0))*2.0;

   
    st = fract(st);

    // rotate the cells so the center is mirrored 
    if(f == 1.0){
        st = rotate2d(st,PI);
    } else if(f == 2.0){
        st = rotate2d(-st,PI);
    } else if(f == 3.0){
        st = rotate2d(st,PI);
    }

    return st;
    }




void main () {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

     // st *= 2.0;

    st = kaleidoscope (st);

    
    vec4 color = vec4(st.x,st.y,0.0,1.0);
    


    color = texture2D(u_tex0,st);

    gl_FragColor = color;
}
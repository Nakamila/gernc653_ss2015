
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat3 matrix = mat3(vec3(1.,0.,0.),
                   vec3(0.,1.,0.),
                   vec3(0.,0.,1.));


float circle(vec2 st, float radius) {
    st -= .5;
    return 1.0-step(radius*.5,dot(st,st)*2.);
}

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

float cross(vec2 st, float size){
    return  box(st, vec2(size,size/4.)) + 
            box(st, vec2(size/4.,size));
   
}

mat3 rotationMatrix(float a) {
    return mat3(vec3(cos(a),-sin(a),0.0),
                vec3(sin(a),cos(a),0.0),
                vec3(0.0,0.0,1.0));
}

void rotate(float a) {
    matrix = rotationMatrix(a) * matrix;
}
    
float stripes(vec2 st){
	return step(st.y, st.x);    
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution;
    vec3 color = vec3(0.);
    vec3 pos = vec3(st,1.);

    //rotate(tan(sin(u_time)+.6));   
    pos = matrix * pos; 
    st *= 10.;


    vec2 st_i = floor(st);

    if (mod(st_i.y, 2.) == 1.) {
        st.y -= .5 *u_time;
    }
      if (mod(st_i.x, 2.) == 1.) {
        st.x -= .5 *u_time;
    }
    
   // st*= 0.5;
    vec2 st_f = fract(st);
    color.rb = st_f;
    st *= 2.;
    
    //float pct = circle(st, 1.5);
    
    //color += pct;
 
    
	gl_FragColor = vec4(color,1.);
}

#ifdef GL_ES
precision mediump float;
#define white vec3(1., 1.,1.)
#define black vec3(0.0)
#endif

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



float rect(vec2 st, float size){
    return  box(st, vec2(size/2., size));
   
}

float line(vec2 st, float size){
    return  box(st, vec2(size, size));
   
}


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


void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.);
    
    
   translate(vec2(-1.0) * (sin(u_time*0.6) + (cos(u_time*0.6))));
   scale (vec2 (2.0));

    
    pos = matrix * pos;
    
    color = vec3(st.x,st.y,0.54);
    

    
    float size = tan (u_time*0.5);
	
    color -= rect (pos.xy, 100.) - rect (pos.xy, 0.5); 
 
    
  
    gl_FragColor = vec4( color ,1.);
}
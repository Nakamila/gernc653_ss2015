#ifdef GL_ES
precision mediump float;
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

float cross(vec2 st, float size){
    return  box(st, vec2(size/2000.,size/5.)) + 
            box(st, vec2(size/5.,size/2000.));
   
}


float rect(vec2 st, float size){
    return  box(st, vec2(size, size));
   
}

float rectC(vec2 st, float size){
    return  box(st, vec2(size, size)) - (1.-smoothstep((size)-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0));
   
}

float circle(vec2 st, float size){
	return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0);
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
    
   translate(vec2(-.5));
   rotate(sin(u_time));

    
    pos = matrix * pos;
    
    color = vec3(.0,st.y,0.);
    

    
    
    // uiFixed
    color -= rect (pos.xy, 0.03);
    color -= cross(pos.xy, 10.);
    color -= circle(pos.xy, 0.09) - circle(pos.xy, 0.083);
    color -= circle(pos.xy, 0.2) - circle(pos.xy, 0.19);
    color -= circle(pos.xy, 0.4) - circle(pos.xy, 0.39);
    color -= circle(pos.xy, 0.6) - circle(pos.xy, 0.59);
    color -= circle(pos.xy, 0.8) - circle(pos.xy, 0.79); 
    color -= circle(pos.xy, 0.9) - circle(pos.xy, 0.89);
    color += circle(pos.xy, 1.1) - circle(pos.xy, 1.21);

    //uiMoving objects
    color+= cross(st-(tan(0.2*u_time)), 0.02);
    color+= rect(st-(sin(u_time)), 0.02);
    color+= circle(1.-(st-(cos(u_time))), 0.005);

    
    gl_FragColor = vec4( color ,1.0);
}
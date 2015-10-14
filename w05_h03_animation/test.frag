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

]

float circle(vec2 st, float size){
	return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.1),
                         dot(st,st)*4.0);
}

//circle line blurried

float circleB(vec2 st, float size){
	return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.9),
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
//     st *= 2.;
//     st = 1.- fract(st)  ;

    
    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.);
    
   translate(vec2(-0.5));
 //  scale(vec2(clamp(cos(u_time), 0.5, 0.7)));
  // rotate((u_time));
    

    
    pos = matrix * pos;
    
    color = vec3(st.x,st.y,0.67);
    
// for (int i=0; i<20; i++){
//     float increm = 0.01;
//   	increm += 0.1;
    	
//     color -= circle (pos.xy+increm, 0.002);
// }
    


   // turn background black
   	color-= circle (pos.xy, 10.0);
    
 //	float size = tan(u_time);
    float size = clamp (sin(u_time), 0.0, 0.06);
    float size2 = clamp (tan(u_time*0.2), 0.0, 0.5); 
    
    //substract the shapes
    color += circleB (pos.xy, size2);
    color += circleB (pos.xy+0.1, size*0.5);
    color += circleB (pos.xy+0.2, 0.1 - size);
    color += circleB (pos.xy+0.3, 0.5- size2);
    color += circleB (pos.xy+0.4, 0.002);
    color += circleB (pos.xy+0.5, 0.002);
    color += circleB (pos.xy+0.6, 0.002);
    color += circleB (pos.xy+0.7, 0.002);
    color += circleB (pos.xy+0.8, 0.002);
    color += circleB (pos.xy+0.9, 0.002);
    
 

    
    gl_FragColor = vec4( color ,1.);
}
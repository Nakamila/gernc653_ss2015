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



float circle(vec2 st, float size){
	return 1.-smoothstep(size-(size*0.01),
                         size+(size*0.01),
                         dot(st,st)*4.0);
}

//blurried line circle
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

    vec3 color = vec3(0.0);
    vec3 pos = vec3(st,1.);
    
    
   translate(vec2(-.5));
 
   rotate((u_time*2.0));
    

    
    pos = matrix * pos;
    
    color = vec3(0.,0.,0.54);
      
    float size = 1. - tan (u_time*0.5);


    	

  // circles
    
  	color += (circle (pos.xy, 0.009) - circle (pos.xy, 0.05));
   	color += circle (pos.xy, 0.09) - circle (pos.xy, 0.15);
    color += circle (pos.xy, 0.19) - circle (pos.xy, 0.25);
    color += circle (pos.xy, 0.29) - circle (pos.xy, 0.35);
    color += circle (pos.xy, 0.39) - circle (pos.xy, 0.45);
	  color += circle (pos.xy, 0.49) - circle (pos.xy, 0.55);
    color += circle (pos.xy, 0.59) - circle (pos.xy, 0.65);
    color += circle (pos.xy, 0.69) - circle (pos.xy, 0.75);
    color += circle (pos.xy, 0.79) - circle (pos.xy, 0.85);
    color += circle (pos.xy, 0.99) - circle (pos.xy, 1.95);
    
   // circle black to white
    color += circleB (st-0.5, size);
    
    gl_FragColor = vec4( color ,1.);
}
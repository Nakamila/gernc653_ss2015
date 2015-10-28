

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
    float size = 3.0;
    st*=size;
    st.x-=size*0.5;
    st.y-=size*0.5;

    st*= 2.;
     st = fract(st);
    vec2 toCenter = (vec2(0.5)-(abs(st*(tan(u_time*3.)))));
    pct = length(toCenter);

  

    vec2 color = vec2(pct);

    gl_FragColor = vec4( 1.0, color, 1.0 );
}
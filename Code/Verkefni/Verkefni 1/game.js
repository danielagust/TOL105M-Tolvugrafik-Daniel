import Car from "./obj_car.js"
import Sidewalk from "./obj_sidwalk.js";

// startup
var canvas = document.getElementById( "gl-canvas" );
    
var gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" ); }

//  Configure WebGL

gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 0.2, 0.2, 0.2, 1.0 );

//  Load shaders and initialize attribute buffers

var program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );


var vPosition = gl.getAttribLocation( program, "vPosition" );

gl.enableVertexAttribArray( vPosition );

// lanes 
var lanes = [];
var lane_count = 3;
var sidwalk_width = 0.5;
var lane_mid_list = [];
var lanes;
var wrap_line = 1.4;
var car_list = [];

make_lanes();
console.log(lane_mid_list);
var car = car  = new Car(vec2(0.2,0.1),wrap_line, vec2(0.0,lane_mid_list[2]));
car.set_webstuff(gl, program);
car.Color = vec4(1.0,0.0,0.0,1.0);

var sidewalk_bottom = new Sidewalk(vec2(0.0,sidwalk_width), 1);
sidewalk_bottom.Color = vec4(0.5,0.5,0.5,1.0);
sidewalk_bottom.set_webstuff(gl, program);

var sidewalk_top = new Sidewalk(vec2(0.0,sidwalk_width), -1);
sidewalk_top.Color = vec4(0.5,0.5,0.5,1.0);
sidewalk_top.set_webstuff(gl, program);




function make_lanes(){
    // var dis = sidwalk_width + sidwalk_width;
    // console.log(1/(lane_count + 1));
    // var lane_diff = (sidwalk_width - - sidwalk_width)/lane_count;
    // var lane_pos = [];
    // console.log(lane_diff);
    // var temp = -sidwalk_width;
    // // lane_pos_list.push(lane_pos)
    // for ( var i = 0; i < lane_count; ++i ){
        
    //     lane_pos_list.push(temp);
    //     temp = temp + lane_diff;
    // }

    // // diff = (y-x)/n;     
    // // d = x;
    // // for(1 to n)
    // //     d = d + diff
    // //     print(d)
    // console.log(lane_pos_list);
    lanes = splitRange(-sidwalk_width, sidwalk_width, lane_count);
    var mid;
    for ( var i = 0; i < lanes.length; ++i ){
        mid = (lanes[i][0]+lanes[i][1])/2
        lane_mid_list.push(mid);
        
    }
}

function splitRange(rangeStart, rangeEnd, numIntervals) {
    const intervalSize = (rangeEnd - rangeStart) / numIntervals;
    const intervals = [];

    for (let i = 0; i < numIntervals; i++) {
        const start = rangeStart + i * intervalSize;
        const end = start + intervalSize;
        intervals.push([start, end]);
    }
    return intervals;
}
        

export default function run(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    

    render();


}

function move(){
    car.move_right_wrap(0.003);
    car.render();
}
function move_list(){

}

function render(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    sidewalk_bottom.render();
    sidewalk_top.render();
    move();
   
    car.render();
    move();
    
    
    

    window.requestAnimationFrame(render);
}


// export default class Game{
//     constructor(){
        


        

    
        

//         this.render();
//     }
//     move(){
//         car.move_right_wrap(0.001);
//         car.render(gl, program);
//     }

//     render(){
//         gl.clear( gl.COLOR_BUFFER_BIT );
//         // for ( var i = 0; i < vertices.length; i+=3 ){
//         //     gl.uniform4fv( colorLoc, vec4(Math.random(), Math.random(), Math.random(), 1.0) );
//         //     gl.drawArrays( gl.TRIANGLES, i, i+3 );
//         // }
        
//         car.render(gl, program);
//         this.move();
//         console.log("hello");
//         window.requestAnimationFrame(this.render);
//     }
// }
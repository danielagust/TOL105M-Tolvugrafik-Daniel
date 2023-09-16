import Lane from "./obj_Lane.js";
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
var lane_count = 3; // number of lanes
var num_cars = 3; // per lane
var lane_mid_list = []; // mid point of the lane

var sidwalk_width = 0.3;

var wrap_line = 1.4;
var car_list = []; // temp list to make the cars

var width_car = 0.2;
var height_car = 0.1;


make_lanes(); // makes lanes

// var car = car  = new Car(vec2(0.2,0.1),wrap_line, vec2(0.0,lane_mid_list[2]));
// car.set_webstuff(gl, program);
// car.Color = vec4(1.0,0.0,0.0,1.0);

var sidewalk_bottom = new Sidewalk(vec2(0.0,sidwalk_width), 1);
sidewalk_bottom.Color = vec4(0.5,0.5,0.5,1.0);
sidewalk_bottom.set_webstuff(gl, program);

var sidewalk_top = new Sidewalk(vec2(0.0,sidwalk_width), -1);
sidewalk_top.Color = vec4(0.5,0.5,0.5,1.0);
sidewalk_top.set_webstuff(gl, program);

(main_lane_maker(-sidwalk_width, sidwalk_width, lane_count))



function render_cars(){
    for ( var i = 0; i < lanes.length; ++i ){
        for ( var j = 0; j < lanes[i].Cars.length; ++j ){
            lanes[i].Cars[j].render();
            console.log(lanes[i].Cars[j]);
        }
    }
}

function new_cars(lane){
    for (let i = 0; i < num_cars; i++){
        new_car(lane, i); 
     }
     
}
/**
 * make new car for the lanes
 * @param {Lane} lane 
 * @param {number} i 
 */
function new_car(lane, i){
    var mid_lane = (lane.lane_Star_and_End[0]+lane.lane_Star_and_End[1])/2
    var collum = collum_maker(-wrap_line,wrap_line,num_cars+1)[i];
    var mid_collum = (collum[0]+collum[1])/2
    var offset = Math.random();
    var car  = new Car(vec2(width_car, height_car),wrap_line, vec2(mid_collum + offset,mid_lane));
    car.set_webstuff(gl, program);
    car.Color = vec4(1.0,0.0,0.0,1.0);
    console.log(car);
    car_list.push(car);
    // console.log(car);
}


function make_lanes(){

    lanes = collum_maker(-sidwalk_width, sidwalk_width, lane_count);
    var mid;
    for ( var i = 0; i < lanes.length; ++i ){
        mid = (lanes[i][0]+lanes[i][1])/2
        lane_mid_list.push(mid);
        
    }
}

function main_lane_maker(rangeStart, rangeEnd, numIntervals) {
    const intervalSize = (rangeEnd - rangeStart) / numIntervals;
    
    var speed = 0.003;
    // console.log(numIntervals)
    var temp_lanes = [];

    for (let i = 0; i < numIntervals; i++) {
        const start = rangeStart + i * intervalSize;
        const end = start + intervalSize;
        // intervals.push(new Lane([start, end], speed , num_cars, collum_maker(-1,1,num_cars+1)));
        temp_lanes.push(new Lane([start, end], speed, num_cars, collum_maker(-1,1,num_cars+1)[i]));
        
        // intervals[i].set_webstuff(gl, program);
        // console.log(lanes[i].cars)
        
    }
    // console.log(temp_lanes, "hello")
    lanes = temp_lanes;

    for (let i = 0; i < temp_lanes.length; i++){
        // console.log(temp_lanes[i]);
        new_cars(temp_lanes[i])
        // console.log(car_list);
        // console.log(temp_lanes)
        lanes[i].Cars = car_list;
        
        car_list = [];
    }

    
    // console.log(lanes)
    
}

function collum_maker(rangeStart, rangeEnd, numIntervals) {
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
    
    render_cars();

    render();


}

// function move(){
//     car.move_right_wrap(0.003);
//     car.render();
// }
function lane_car_mover(){
    for (let i = 0; i < lanes.length; i++){
        for (let j = 0; j < lanes[i].Cars.length; j++){
            lanes[i].Cars[j].move_right_wrap(0.003);
            lanes[i].Cars[j].render();
        }
    }
}


function render(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    sidewalk_bottom.render();
    sidewalk_top.render();
    

   lane_car_mover();

    
    window.requestAnimationFrame(render);
}



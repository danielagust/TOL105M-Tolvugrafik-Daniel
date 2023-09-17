import Lane from "./obj_Lane.js";
import Car from "./obj_car.js"
import Sidewalk from "./obj_sidwalk.js";
import Frog from "./obj_frog.js";

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



var then = 0;

// lanes 
var lanes = [];
var lane_count = 5; // number of lanes
var num_cars = 3; // per lane
var lane_mid_list = []; // mid point of the lane

var sidwalk_width = 0.4; // donsent count for lanes count
var car_speed = 0.2;

var wrap_line = 1.4;
var car_list = []; // temp list to make the cars

var width_car = 0.2;
var height_car = 0.1;

var car_speed_lane = [];

const min_pos = -0.4; // offset for the cars pos
const max_pos = 0.4; // offset for the cars pos

const max_car_speed = 0.07;
const min_car_speed = -0.03

const frog_size = 0.05;

var start = vec2(0.0,-0.9);

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


var frog = new Frog(vec2(frog_size,frog_size), start);
frog.Color = vec4(1.0,0.5,0.5,1.0);
frog.set_webstuff(gl, program);
// console.log(frog);

var Forward_key = 87; // w key
var Backward_key = 83; // s key
var Left_key = 65; // a key
var Right_key = 68; // d key

var frog_speed = 0.1;

(main_lane_maker(-sidwalk_width, sidwalk_width, lane_count))



function render_cars(){
    for ( var i = 0; i < lanes.length; ++i ){
        for ( var j = 0; j < lanes[i].Cars.length; ++j ){
            lanes[i].Cars[j].render();
            // console.log(lanes[i].Cars[j]);
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
    
    var collum = collum_maker(-wrap_line-0.5,wrap_line+0.5,num_cars+1)[i];
    var mid_collum = (collum[0]+collum[1])/2
    
    
    var offset = Math.random() * (max_pos - min_pos) + min_pos;
    
    var car  = new Car(vec2(width_car, height_car),wrap_line, vec2(mid_collum + offset,mid_lane));
    car.set_webstuff(gl, program);
    car.Color = random_color();
    // console.log(car);
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
    rangeStart = rangeStart-rangeEnd/numIntervals

    rangeEnd = rangeEnd + 0.0
    const intervalSize = (rangeEnd - rangeStart) / (numIntervals);
    
    var speed = 0.003;
    // console.log(numIntervals)
    var temp_lanes = [];
    
    var start = rangeStart;
    

    for (let i = 0; i < numIntervals; i++) {
        
        start = rangeStart + i * intervalSize;
        const end = start + intervalSize;
        // intervals.push(new Lane([start, end], speed , num_cars, collum_maker(-1,1,num_cars+1)));
        temp_lanes.push(new Lane([start, end], speed, num_cars, collum_maker(-1,1,num_cars+1)[i]));
        
       
        // start = rangeStart + i * intervalSize;
        
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


        

export  function run(){
    // gl.clear( gl.COLOR_BUFFER_BIT );
    
    // render_cars();
    event_keyboard();
    speed_maker();
    

    window.requestAnimationFrame(render);


}

export  function KeyDownChecker(evtobj,id) {

    var target = evtobj.target || evtobj.srcElement;

    // if (evtobj.keyCode == 75 && evtobj.ctrlKey) {
    //     AddUsers(target.id);

    //     return false;
    // }
    // alert(target.id);
    if (target.id == "forward"){
        Forward_key = evtobj.keyCode;
        // console.log("hello2");
    }
    if (target.id == "backward"){
        Backward_key = evtobj.keyCode;
        // console.log("hello2");
    }
    if (target.id == "left"){
        Left_key = evtobj.keyCode;
        // console.log("hello2");
    }
    if (target.id == "right"){
        Right_key = evtobj.keyCode;
        // console.log("hello2");
    }
    // console.log("hello3");
    document.getElementById(target.id).value = "";
}


function event_keyboard(){
    // var Forward_key = 87; // w key
    // var Backward_key = 83; // s key
    // var Left_key = 65; // a key
    // var Right_key = 68; // d key


    // $(this).on('keydown', function(event) {
    //     // if (event.keyCode == 13) {
    //     //   alert('hi.')
    //     // }
    //     alert(event.keyCode)
    // })

    document.getElementById('forward').disabled = true;  
    document.getElementById('backward').disabled = true; 
    document.getElementById('left').disabled = true; 
    document.getElementById('right').disabled = true; 
    document.getElementById("test").disabled = true;

    $(document).on('keydown', function(event) {
        // console.log("hello");
        // w key
        if (event.keyCode == Forward_key) {
            frog.move_forward(frog_speed)
        }
        // s key
        if (event.keyCode == Backward_key) {
            frog.move_backward(frog_speed);
        }
        // a key
        if (event.keyCode == Left_key) {
            // alert('Left_key')
            frog.move_left(frog_speed);
        }
        // d key
        if (event.keyCode == Right_key) {
            frog.move_right(frog_speed);
        }
    })
}

// function move(){
//     car.move_right_wrap(0.003);
//     car.render();
// }

function new_speed(now){
     // Convert to seconds
     now *= 0.001;
     // Subtract the previous time from the current time
     var deltaTime = now - then;
     // Remember the current time for the next frame.
    //  console.log("now new ", now);
    //  console.log("then new ", then);
     then = now;
    //  console.log("deltaTime new ", deltaTime);
     return deltaTime;
}

function speed_maker(){
    for (let i = 0; i < lanes.length; i++){
        car_speed_lane.push(Math.random() * (max_car_speed - min_car_speed) + min_car_speed);
        
    }
}

function lane_car_mover(deltaTime){
    // Convert to seconds
    // now *= 0.001;
    // // Subtract the previous time from the current time
    // var deltaTime = now - then;
    // // Remember the current time for the next frame.
    // console.log("now old ", now);
    // console.log("then old ", then);
    // then = now;
    // console.log("deltaTime old ", deltaTime);
    // console.log(deltaTime);
    // var offset;
    for (let i = 0; i < lanes.length; i++){
        // offset = Math.random() * (max_car_speed - min_car_speed) + min_car_speed;
        for (let j = 0; j < lanes[i].Cars.length; j++){
            lanes[i].Cars[j].move_right_wrap((car_speed+car_speed_lane[i])*deltaTime );
            lanes[i].Cars[j].render();
        }
    }
}

function random_color(){
    return vec4(Math.random(),Math.random(),Math.random(),1.0);
}


function render(now){
    gl.clear( gl.COLOR_BUFFER_BIT );
    
    sidewalk_bottom.render();
    sidewalk_top.render();
    
    // sleepFor(1000);
    var deltaTime = new_speed(now);
    lane_car_mover(deltaTime);

    frog.render();

//     var bufferId = gl.createBuffer();
// gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
// gl.bufferData( gl.ARRAY_BUFFER, flatten(frog.position), gl.STATIC_DRAW );

// var vPosition = gl.getAttribLocation( program, "vPosition" );
// gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
// gl.enableVertexAttribArray( vPosition );
// var colorLoc = gl.getUniformLocation( program, "fColor" );
// // gl.clear( gl.COLOR_BUFFER_BIT );
// gl.uniform4fv( colorLoc, vec4(2.0, 1.0, 1.0, 1.0) );
// gl.drawArrays( gl.POINTS, 0, vec2(0.0,-0.0).length );
    window.requestAnimationFrame(render);
}


// function sleepFor(sleepDuration){
//     var nowx = new Date().getTime();
//     while(new Date().getTime() < nowx + sleepDuration){ 
//         /* Do nothing */ 
//     }
// }



/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Wíragrindarteningur teiknaður tvisvar frá mismunandi
//     sjónarhorni til að fá víðsjónaráhrif (með gleraugum)
//
//    Hjálmtýr Hafsteinsson, október 2023
/////////////////////////////////////////////////////////////////
// import obj_Direction from "./helpers/obj_Direction.js";
// import obj_Position from "./helpers/obj_Position.js";
// import obj_Camera from "./helpers/obj_camera.js";
// import * as Helper from './helpers/Helper_func.js';
var canvas;
var gl;

var NumVertices  = 24;

var points = [];
var colors = [];

var vBuffer;
var vPosition;

var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var zDist = -3.0;
var xDist = 0.0;
var eyesep = 0.2;

var proLoc;
var mvLoc;
var colorLoc;


// function dir () {
//     return 
// }

// var left = 0.0;
// var right = 0.0;
// var up = 0.0;
// var down = 0.0;
// var 

// the 8 vertices of the cube
var lenght = 2.0;
var height = 2.0;
var width = 2.0

var Forward_key = 87; // w key
var Backward_key = 83; // s key
var Left_key = 65; // a key
var Right_key = 68; // d key
var Up_key = 32; // space key
var Down_key = 16; // shift key


var dir = {
    left:0.0,
    right:0.0,
    up:0.0,
    down:0.0,
    forward:0.0,
    backward:0.0,
    rl:0.0,
    fb:0.0,
    ud:0.0
}

var mv = lookAt( vec3(xDist, 0.0, zDist),
                  vec3(xDist, 0.0, zDist+2.0),
                  vec3(0.0, 1.0, 0.0) );

var v = [
    vec3( -lenght, -height,  width ),
    vec3( -lenght,  height,  width ),
    vec3(  lenght,  height,  width ),
    vec3(  lenght, -height,  width ),
    vec3( -lenght, -height, -width ),
    vec3( -lenght,  height, -width ),
    vec3(  lenght,  height, -width ),
    vec3(  lenght, -height, -width )
];

var lines = [ v[0], v[1], v[1], v[2], v[2], v[3], v[3], v[0],
              v[4], v[5], v[5], v[6], v[6], v[7], v[7], v[4],
              v[0], v[4], v[1], v[5], v[2], v[6], v[3], v[7]
            ];
function move(deltaTime, mv){
    // var mv = mat4();
    // mv = camera.move_forward(dir.forward*deltaTime, mv);
    // mv = camera.move_backward(dir.backward*deltaTime, mv);
    // mv = camera.move_right(dir.right*deltaTime, mv);
    // mv = camera.move_left(dir.left*deltaTime, mv);
    // mv = camera.move_down(dir.down*deltaTime, mv);
    // mv = camera.move_up(dir.up*deltaTime, mv);
    
    // mv = camera.move_forward(dir.forward*deltaTime, mv);
    // mv = camera.move_backward(dir.backward*deltaTime, mv);
    // mv = camera.move_right(dir.right*deltaTime, mv);
    // mv = camera.move_left(dir.left*deltaTime, mv);
    // mv = camera.move_down(dir.down*deltaTime, mv);
    // mv = camera.move_up(dir.up*deltaTime, mv);

    mv = camera.move_fbv2(dir.fb*deltaTime, mv);
    mv = camera.move_udv2(dir.ud*deltaTime, mv);
    mv = camera.move_rlv2(dir.rl*deltaTime, mv);
    // camera.yDist = spinY+1;
    
    dir = {
        left:0.0,
        right:0.0,
        up:0.0,
        down:0.0,
        forward:0.0,
        backward:0.0,
        rl:0.0,
        fb:0.0,
        ud:0.0
    }
    return mv
}
var speed = 1.5;
window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.95, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(lines), gl.STATIC_DRAW );

    vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    colorLoc = gl.getUniformLocation( program, "wireColor" );
    
    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );

    var proj = perspective( 50.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));
    

    if(flip2){
        window.addEventListener("keydown", function(e){
            switch( e.keyCode ) {
                case Forward_key:	// upp �r
                    // zView += 0.2;
                    dir.fb += speed;
                    break;
                case Backward_key:	// ni�ur �r
                    // zView -= 0.2;
                    dir.fb -= speed;
                    break;
                case Left_key:
                    dir.rl += speed;
                    break;
                case Right_key:
                    dir.rl -= speed;
                    break;
                case Up_key:
                    dir.ud += speed;
                    break;
                case Down_key:
                    dir.ud -= speed;
                    break;
    
                
             }
            //  alert(e.keyCode);
         }  );
    }else{
           // Event listener for keyboard
      window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {
           case Forward_key:	// áfram ör
                mv = mouseLook("w", spinY);
                break;
           case Backward_key:	// tilbaka ör
                mv = mouseLook("s", spinY);
                break;
           case Left_key: // vinstri ör
                mv = mouseLook("a", spinY);
                break;
           case Right_key: // hægri ör
                mv = mouseLook("d", spinY);
                break;
        }
    }  );
    }

    // Atbur�afall fyrir lyklabor�
    
    
    //event listeners for mouse
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.offsetX;
        origY = e.offsetY;
        e.preventDefault();         // Disable drag and drop
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
    	    spinY = ( spinY + (e.offsetX - origX) ) % 360;
            spinX = ( spinX + (origY - e.offsetY) ) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
            if (!flip2){
                 mv = mouseLook("", spinY);
            }
            
        }
    } );
    
    // // Event listener for keyboard
    //  window.addEventListener("keydown", function(e){
    //      switch( e.keyCode ) {
    //         case Forward_key:	// áfram ör
    //             zDist += 0.1;
    //             break;
    //         case Backward_key:	// tilbaka ör
    //             zDist -= 0.1;
    //             break;
    //         case Left_key: // vinstri ör
    //             xDist +=0.1;
    //             break;
    //         case Right_key: // hægri ör
    //             xDist -= 0.1;
    //      }
    //  }  );  

   

    // Event listener for mousewheel
     window.addEventListener("mousewheel", function(e){
         if( e.wheelDelta > 0.0 ) {
             zDist += 0.1;
         } else {
             zDist -= 0.1;
         }
     }  );  

    render();
}

var flip2 = false;
function lock(mv, deltaTime){
    if(flip2){
        var mv  = camera.new_posv3();
        // mv = mult( mv, mult( rotateX(spinX), rotateY(spinY) ) );
        mv = move(deltaTime, mv)
        mv = mult( mv, mult( rotateX(spinX), rotateY(spinY) ) );
        
        return mv
        flip2 = false
        var mv = mat4();
        // mv = camera.move_forward(2.0, mv);
        // mv = camera.move_backward(2.0, mv);
        mv = camera.move_right(1.0, mv);
        mv = camera.move_right(1.0, mv);
        // mv = camera.move_left(2.0, mv);
        return mv
    }
    else{
    //    mv = mouseLook("",spinY) 
    }
    return mv
}
// var camera = new obj_Camera(new obj_Position(0.0,0.0,0.0), new obj_Direction(0.0,0.0,1.0), vec3(0.0,spinY,0.0), spinY)
function render(now)
{
    // var deltaTime = Helper.new_speed(now);
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Vinstra auga...
    var mv = lookAt( vec3(0.0-eyesep/2.0, 0.0, zDist),
                      vec3(0.0, 0.0, zDist+2.0),
                      vec3(0.0, 1.0, 0.0) );
    // var mv = lookAt( vec3(xDist, 0.0, zDist),
    //                   vec3(xDist, 0.0, zDist+2.0),
    //                   vec3(0.0, 1.0, 0.0) );
    if(flip2){
        
    }
    
    mv = mult( mv, mult( rotateX(spinX), rotateY(spinY) ) );
    // mv = lock(mv, deltaTime);
    
    // var mv = mouseLook("",spinY)
    // mv = camera.rotate(spinX, spinY, mv);
    // mv = mouseLook("", spinY);
    // dir.fb += speed

    // Vinstri mynd er í rauðu...
    // mv = mult(mv, translate(0.0,0.0,0.0))
    gl.uniform4fv( colorLoc, vec4(1.0, 0.0, 0.0, 1.0) );
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.LINES, 0, NumVertices );

    // Hægra auga...
    // mv = lookAt( vec3(0.0+eyesep/2.0, 0.0, zDist),
    //                   vec3(0.0, 0.0, zDist+2.0),
    //                   vec3(0.0, 1.0, 0.0) );
    // mv = mult( mv, mult( rotateX(spinX), rotateY(spinY) ) );

    // // Hægri mynd er í grænbláu (cyan)...
    // gl.uniform4fv( colorLoc, vec4(0.0, 1.0, 1.0, 1.0) );
    // gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    // gl.drawArrays( gl.LINES, 0, NumVertices );

    requestAnimFrame( render );
}


/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Wíragrindarteningur teiknaður tvisvar frá mismunandi
//     sjónarhorni til að fá víðsjónaráhrif (með gleraugum)
//
//    Hjálmtýr Hafsteinsson, október 2023
/////////////////////////////////////////////////////////////////
// import obj_Camera from "./helpers/obj_camera.js";
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

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
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
            mv = mouseLook("", spinY);
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

var flip2 = true;
function lock(mv){
    if(flip2){
        
        flip2 = false
        var mv = mat4();
        // mv = camera.move_forward(2.0, mv);
        // mv = camera.move_backward(2.0, mv);
        mv = camera.move_right(1.0, mv);
        mv = camera.move_right(1.0, mv);
        // mv = camera.move_left(2.0, mv);
        return mv
    }
    return mv
}
// var camera = new obj_Camera(vec3(0.0,0.0,2.0), vec3(0.0,0.0,-1.0), vec3(0.0,1.0,0.0), 1.0)
function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Vinstra auga...
    // var mv = lookAt( vec3(0.0-eyesep/2.0, 0.0, zDist),
    //                   vec3(0.0, 0.0, zDist+2.0),
    //                   vec3(0.0, 1.0, 0.0) );
    // var mv = lookAt( vec3(xDist, 0.0, zDist),
    //                   vec3(xDist, 0.0, zDist+2.0),
    //                   vec3(0.0, 1.0, 0.0) );
    //                 //   var mv  = camera.new_pos();
    // mv = mult( mv, mult( rotateX(spinX), rotateY(spinY) ) );
    // var mv = mouseLook("",spinY)
    // mv = camera.rotate(spinX, spinY, mv);
    // mv = mouseLook("", spinY);
    // mv = lock(mv);

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


/////////////////////////////////////////////////////////////////
//    S�nid�mi � T�lvugraf�k
//     Fiskur samsettur �r ferhyrndu spjaldi (b�kur) og
//     �r�hyrningi (spor�ur).  H�gt er a� sn�a me� m�sinni og
//     f�ra til me� upp- og ni�ur-�rvum (e�a m�sarhj�li).
//
//    Hj�lmt�r Hafsteinsson, okt�ber 2023
/////////////////////////////////////////////////////////////////
import obj_Direction from "./helpers/obj_Direction.js";
import obj_Size from "./helpers/obj_Size.js";
import * as Helper from './helpers/Helper_func.js';
import obj_Fish from "./obj_Fish.js"
import obj_Position from "./helpers/obj_Position.js";
var canvas;
var gl;

var NumVertices  = 9;
var NumBody = 6;
var NumTail = 3;
var numfin1 = 3;

var size_body = new obj_Size(0.5,0.2,0.0);

var body_length = 0.5; // 0.5
var body_height = 0.2;
var body_width = 0.0;
var body_middle = 0.2;

var size_tail = new obj_Size(0.15,0.15,0.0);

var tail_length = 0.15;
var tail_height = 0.15;

var size_fin = new obj_Size(0.1,0.02,0.0);

var fin_length = 0.1;
var fin_height = 0.02;

var fish = new obj_Fish([size_body,size_tail,size_fin], 2.0, new obj_Position(0.0,0.0,0.0))
var fish2 = new obj_Fish([size_body,size_tail,size_fin], 2.0, new obj_Position(1.0,0.0,0.0))


// Hn�tar fisks � xy-planinu
var vertices = [
    // l�kami (spjald)
    vec4( -size_body.length,  size_body.width, 0.0, 1.0 ),
	vec4(  body_middle,  size_body.height, size_body.width, 1.0 ),
	vec4(  size_body.length,  0.0, size_body.width, 1.0 ),
	
    vec4(  size_body.length,  0.0, size_body.width, 1.0 ),
	vec4(  body_middle, -size_body.height, size_body.width, 1.0 ),
	vec4( -size_body.length,  0.0, size_body.width, 1.0 ),
	// spor�ur (�r�hyrningur)
    vec4( -0.0,  0.0, 0.0, 1.0 ),
    vec4( -size_tail.length,  size_tail.height, 0.0, 1.0 ),
    vec4( -size_tail.length, -size_tail.height, 0.0, 1.0 ),

    vec4( -0.0,  0.0, 0.0, 1.0 ),
    vec4( -size_fin.length,  size_fin.height, 0.0, 1.0 ),
    vec4( -size_fin.length, -size_fin.height, 0.0, 1.0 )
];

// function calculate_center(){
//     return vec3((-tail_length+body_length)/2, (-body_height+body_height)/2, (-body_width+body_width)/2);
// }
function calculate_centerv2(){
    return vec3((-size_tail.length+size_body.length)/2, (-size_body.height+size_body.height)/2, (-size_body.width+size_body.width)/2);
}
console.log(calculate_centerv2())
// console.log(calculate_center())
function get_ofset(){
    var temp = calculate_centerv2();
    return(vec3(-temp[0], -temp[1], -temp[2]))
}


var movement = false;     // Er m�sarhnappur ni�ri?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var rotTail = 0.0;        // Sn�ningshorn spor�s
var incTail = 2.0;        // Breyting � sn�ningshorni

var rotFin1 = 0.0;        // Sn�ningshorn spor�s
var incFin1 = 0.2;        // Breyting � sn�ningshorni

var rotFin2 = 0.0;        // Sn�ningshorn spor�s
var incFin2 = -0.2;        // Breyting � sn�ningshorni

var zView = 2.0;          // Sta�setning �horfanda � z-hniti

var proLoc;
var mvLoc;
var colorLoc;
var flip = false;

function testing(program){
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    
    
    // console.log("hello")

    colorLoc = gl.getUniformLocation( program, "fColor" );

    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    gl.enableVertexAttribArray( vPosition );

    // Setjum ofanvarpsfylki h�r � upphafi
    var proj = perspective( 90.0, 1.0, 0.1, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));
    flip = true;
    
}
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
    
    
   

    // var vPosition = gl.getAttribLocation( program, "vPosition" );
    // gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    
    
    if(!fish_flip){
        testing(program);
    }
    else{
        fish.set_webstuff(gl, program);
        fish2.set_webstuff(gl, program);
    }
    
    // fish.set_webstuff(gl, program);
    

    // colorLoc = gl.getUniformLocation( program, "fColor" );

    // proLoc = gl.getUniformLocation( program, "projection" );
    // mvLoc = gl.getUniformLocation( program, "modelview" );

    // Setjum ofanvarpsfylki h�r � upphafi
    // var proj = perspective( 90.0, 1.0, 0.1, 100.0 );
    // gl.uniformMatrix4fv(proLoc, false, flatten(proj));
    

    // Atbur�af�ll fyrir m�s
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
    	    spinY += (e.offsetX - origX) % 360;
            spinX += (e.offsetY - origY) % 360;
            origX = e.offsetX;
            origY = e.offsetY;
        }
    } );
    
    // Atbur�afall fyrir lyklabor�
     window.addEventListener("keydown", function(e){
         switch( e.keyCode ) {
            case 38:	// upp �r
                zView += 0.2;
                break;
            case 40:	// ni�ur �r
                zView -= 0.2;
                break;
         }
     }  );  

    // Atbur�afall fyri m�sarhj�l
     window.addEventListener("mousewheel", function(e){
         if( e.wheelDelta > 0.0 ) {
             zView -= 0.2;
         } else {
             zView += 0.2;
         }
     }  );  

    render();
}

var fish_look_x = 2.1;
var fish_look_y = 60;
var fish_look_z = 1.1;

var dir  = new obj_Direction(-1.0,-0.0,0.0);
var timer = 0.0; //tick

// class Timerv2{
//     constructor(start) {
//         this.timer = start;
//     }
// }
// var timer2 = new Timerv2(0.1);

var speed = 0.1;
console.log(Helper.angle_to_degre(dir.yaw));

var fish_flip = true

function tester(mv){
    if(!flip&& fish_flip){
        
        fish.render(mv);
        fish2.render(mv);
        
        
    }
    if(flip&& !fish_flip){
        test(mv);
        
    }
}
function test(mv){
    mv = mult(mv, translate(get_ofset())) // move to center
    // mv = mult( mv, rotateX(Helper.angle_to_degre(dir.yaw)) );
    mv = mult( mv, rotateZ(Helper.angle_to_degre(dir.yaw)) );
    mv = mult( mv, rotateY(Helper.angle_to_degre(dir.pitch)) );
    // mv = mult( mv, rotateY(Helper.angle_to_degre(Math.PI)) );
   

    // mv = mult( mv, rotateZ(Helper.angle_to_degre(dir.theta)) );
    // mv = mult( mv, rotateX(Helper.angle_to_degre(dir.phi)) );
    // mv = mult( mv, rotate(dir.phi_cor, vec3()) );
    // mv = mult( mv, rotateZ(fish_look_z) );
    
   
    
    // mv =  mult(mv, translate(0.5,0.2,0.2)); // pos
    
    
    var mv2 = mv;
    var mv3 = mv;

    rotTail += incTail;
    if( rotTail > 35.0  || rotTail < -35.0 )
        incTail *= -1;

    rotFin1 += incFin1;
    if( rotFin1 > 35.0  || rotFin1 < -0.0 )
        incFin1 *= -1;

    rotFin2 += incFin2;
    if( rotFin2 > 0.0  || rotFin2 < -35.0 )
        incFin2 *= -1;

	gl.uniform4fv( colorLoc, vec4(0.2, 0.6, 0.9, 1.0) );

	// Teikna l�kama fisks (�n sn�nings)
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, 0, NumBody );
    
    var move = body_length; // 0.5
    // Teikna spor� og sn�a honum
    
	mv = mult( mv, translate ( -move, 0.0, 0.0 ) );
    mv = mult( mv, rotateY( rotTail ) );
	mv = mult( mv, translate ( move, 0.0, 0.0 ) );
    mv = mult( mv, translate ( -move, 0.0, 0.0 ) );
    
 
    
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.drawArrays( gl.TRIANGLES, NumBody, NumTail );

    var move2 = 0.2
    mv2 = mult( mv2, translate ( move2, 0.0, 0.0 ) );
    mv2 = mult( mv2, rotateY( rotFin1 ) );
	// mv2 = mult( mv2, translate ( move2, 0.0, 0.0 ) );
    // mv2 = mult( mv2, translate ( -move2, 0.0, 0.01 ) );

    gl.uniform4fv( colorLoc,  vec4(1.0, 1.0, 1.0, 1.0));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv2));
    gl.drawArrays( gl.TRIANGLES, NumBody+3, numfin1 );

    var move2 = -0.2
    mv2 = mv3;
    mv2 = mult( mv2, translate ( -move2, 0.0, 0.0 ) );
    mv2 = mult( mv2, rotateY( rotFin2 ) );
	mv2 = mult( mv2, translate ( move2, 0.0, 0.0 ) );
    mv2 = mult( mv2, translate ( -move2, 0.0, -0.01 ) );

    gl.uniform4fv( colorLoc,  vec4(1.0, 1.0, 1.0, 1.0));
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv2));
    gl.drawArrays( gl.TRIANGLES, NumBody+3, numfin1 );
}



function render(now)
{
    
    var deltaTime = Helper.new_speed(now);

    timer += speed * (deltaTime);
    
    // dir.pitch_set = timer % 2*Math.PI
    // dir.yaw_set = timer % 2*Math.PI
    
   
    // console.log(dir.x);
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var mv = lookAt( vec3(0.0, 0.0, zView), vec3(0.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0) );
    mv = mult( mv, rotateX(spinX) );
    mv = mult( mv, rotateY(spinY) );
    // fish.render(mv);
    // fish.render(mv);
    tester(mv);

    

   
    window.requestAnimationFrame(render);
    // requestAnimFrame( render );
}


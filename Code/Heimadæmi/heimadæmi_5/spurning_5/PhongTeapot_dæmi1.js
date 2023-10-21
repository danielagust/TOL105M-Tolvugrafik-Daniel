/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Utah tepotturinn litaður með Phong litun.  Notar útfærslu
//     á tepottinum sem fylgir kennslubókinni.  Hægt að snúa
//     honum með músinni og færa nær með skrunhjóli
//
//    Hjálmtýr Hafsteinsson, október 2023
/////////////////////////////////////////////////////////////////

var normalMatrix, normalMatrixLoc;

var movement = false;     // Do we rotate?
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var zDist = -5.0;

var at = vec3(0.0, 0.0, 0.0);
var up = vec3(0.0, 1.0, 0.0);
    
var fovy = 50.0;
var near = 0.2;
var far = 100.0;

var va = vec4(0.0, 0.0, -1.0,1);
var vb = vec4(0.0, 0.942809, 0.333333, 1);
var vc = vec4(-0.816497, -0.471405, 0.333333, 1);
var vd = vec4(0.816497, -0.471405, 0.333333,1);

var x_pos = 1.0;
var y_pos = 1.0;
    
var lightPosition = vec4(x_pos, y_pos, 1.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );
var materialShininess = 150.0;

var flag = true;

var program;
var canvas, render, gl;

var points = [];
var normals = [];
var num_iteration =5;

var Forward_key = 38; // w key
var Backward_key = 40; // s key
var Left_key = 37; // a key
var Right_key = 39; // d key

var speed= 0.1;
var numkeys = [
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57
]

var self = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true
]

function reset_self(){
    self = [
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true,
        true
    ] 
}

function set_self(index){
    self[index] = false
}



function self_main(index){
    num_iteration = index;
    if (self[index]){
        run();
        reset_self();
        set_self(index);
    }
}


function event_keyboard(){
    window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {
            case Forward_key:	// upp �r
                // zView += 0.2;
                y_pos += speed;
                get_light();
                break;
            case Backward_key:	// ni�ur �r
                // zView -= 0.2;
                y_pos-= speed;
                get_light();
                break;
            case Left_key:
                x_pos -= speed;
                get_light();
                
                break;
            case Right_key:
                x_pos += speed;
                get_light();
                break;
            
            case numkeys[1]:
                self_main(1)
                
                break;
            case numkeys[2]:
                self_main(2)
                break;
            case numkeys[3]:
                self_main(3)
                break;
            case numkeys[4]:
                self_main(4)
                break;
            case numkeys[5]:
                self_main(5)
                break;
            case numkeys[6]:
                self_main(6)
                break;
            case numkeys[7]:
                self_main(7)
                break;
            case numkeys[8]:
                self_main(8)
                break;
            case numkeys[9]:
                self_main(9)
                break;
            // case Down_key:
            //     dir.ud -= speed;
            //     break;

            
         }
        //  alert(e.keyCode);
        // console.log("hello")
     }  );

    canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.clientX;
        origY = e.clientY;
        e.preventDefault();         // Disable drag and drop
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
    	    spinY = ( spinY + (e.clientX - origX) ) % 360;
            spinX = ( spinX + (origY - e.clientY) ) % 360;
            origX = e.clientX;
            origY = e.clientY;
        }
    } );
    
    // Event listener for mousewheel
     window.addEventListener("wheel", function(e){
         if( e.deltaY > 0.0 ) {
             zDist += 0.2;
         } else {
             zDist -= 0.2;
         }
     }  );  
 
}


var vBuffer;
var nBuffer
var myTeapot = teapot(num_iteration);
onload = function init(){
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );

    gl.clearColor( 0.9, 1.0, 1.0, 1.0 );

    vBuffer = gl.createBuffer();
    nBuffer = gl.createBuffer();

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    gl.enable(gl.DEPTH_TEST);
    //event listeners for mouse
    event_keyboard()
    run();
}



function get_light(){
    lightPosition = vec4(x_pos, y_pos, 1.0, 0.0 );

    ambientProduct = mult(lightAmbient, materialAmbient);
    diffuseProduct = mult(lightDiffuse, materialDiffuse);
    specularProduct = mult(lightSpecular, materialSpecular);

    gl.uniform4fv( gl.getUniformLocation(program, "ambientProduct"), flatten(ambientProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "diffuseProduct"), flatten(diffuseProduct) );
    gl.uniform4fv( gl.getUniformLocation(program, "specularProduct"), flatten(specularProduct) );	
    gl.uniform4fv( gl.getUniformLocation(program, "lightPosition"), flatten(lightPosition) );
    gl.uniform1f( gl.getUniformLocation(program, "shininess"), materialShininess );


}
function run() {

    

    myTeapot = teapot(num_iteration);
    myTeapot.scale(0.5, 0.5, 0.5);

    console.log(myTeapot.TriangleVertices.length);
    
    // myTeapot = teapot(num_iteration);
    points = myTeapot.TriangleVertices;
    normals = myTeapot.Normals;


    
    // console.log("hello", lightPosition)

    
    // vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );


    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );


   

    var vNormal = gl.getAttribLocation( program, "vNormal" );
    gl.vertexAttribPointer( vNormal, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vNormal);

     // nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, flatten(normals), gl.STATIC_DRAW );

    projectionMatrix = perspective( fovy, 1.0, near, far );
    gl.uniformMatrix4fv( gl.getUniformLocation(program, "projectionMatrix"), false, flatten(projectionMatrix));
    normalMatrixLoc = gl.getUniformLocation( program, "normalMatrix" );

    projectionMatrix = perspective( fovy, 1.0, near, far );

    
    get_light();

    
    
    render();
}

var render = function(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    

    // gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    // gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    mv = lookAt( vec3(0.0, 0.0, zDist), at, up );
    mv = mult( mv, rotateX( spinX ) );
    mv = mult( mv, rotateY( spinY ) );

    gl.uniformMatrix4fv( gl.getUniformLocation(program, "modelViewMatrix"), false, flatten(mv) );
    normalMatrix = [
        vec3(mv[0][0], mv[0][1], mv[0][2]),
        vec3(mv[1][0], mv[1][1], mv[1][2]),
        vec3(mv[2][0], mv[2][1], mv[2][2])
    ];

    gl.uniformMatrix3fv(normalMatrixLoc, false, flatten(normalMatrix) );

    gl.drawArrays( gl.TRIANGLES, 0, points.length);
    requestAnimFrame(render);
  }

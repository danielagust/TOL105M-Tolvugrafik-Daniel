/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Ferningur skoppar um gluggann.  Notandi getur breytt
//     hraðanum með upp/niður örvum.
//
//    Hjálmtýr Hafsteinsson, september 2023
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

var locBox;
var if_spadi;

var program;
var vPosition;

var bufferId_box;
var bufferId_spadi;

var mouseX;             // Old value of x-coordinate  
var movement = false;   // Do we move the paddle?


// Núverandi staðsetning miðju ferningsins
var box = vec2( 0.0, 0.0 );

// Stefna (og hraði) fernings
var dX;
var dY;

// Svæðið er frá -maxX til maxX og -maxY til maxY
var maxX = 1.0;
var maxY = 1.0;

// Hálf breidd/hæð ferningsins
var boxRad = 0.05;

// Ferningurinn er upphaflega í miðjunni
var box_vertices = new Float32Array([-0.05, -0.05, 0.05, -0.05, 0.05, 0.05, -0.05, 0.05]);

var spadi_vertices = [
    vec2( -0.1, -0.9 ),
    vec2( -0.1, -0.86 ),
    vec2(  0.1, -0.86 ),
    vec2(  0.1, -0.9 ) 
];

// startup



window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.8, 0.8, 0.8, 1.0 );

    //  Load shaders and initialize attribute buffers

    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );


    vPosition = gl.getAttribLocation( program, "vPosition" );

    gl.enableVertexAttribArray( vPosition );
    locBox = gl.getUniformLocation( program, "boxPos" );
    if_spadi = gl.getUniformLocation( program, "if_spadi" );

    // canvas = document.getElementById( "gl-canvas" );
    
    // gl = WebGLUtils.setupWebGL( canvas );
    // if ( !gl ) { alert( "WebGL isn't available" ); }
    
    // gl.viewport( 0, 0, canvas.width, canvas.height );
    // gl.clearColor( 0.8, 0.8, 0.8, 1.0 );
    
    // Gefa ferningnum slembistefnu í upphafi
    dX = Math.random()*0.1-0.05;
    dY = Math.random()*0.1-0.05;

    //
    //  Load shaders and initialize attribute buffers
    //
    // var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    // gl.useProgram( program );
    
    // Load the data into the GPU
    bufferId_box = gl.createBuffer();
    bufferId_spadi = gl.createBuffer();
    // gl.bindBuffer( gl.ARRAY_BUFFER, bufferId_box );
    // gl.bufferData( gl.ARRAY_BUFFER, flatten(box_vertices), gl.DYNAMIC_DRAW );

    // Associate out shader variables with our data buffer
    // var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    // gl.enableVertexAttribArray( vPosition );

    

    // Meðhöndlun örvalykla
    window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {
            case 38:	// upp ör
                dX *= 1.1;
                dY *= 1.1;
                break;
            case 40:	// niður ör
                dX /= 1.1;
                dY /= 1.1;
                break;
        }
    } );



    canvas.addEventListener("mousedown", function(e){
        movement = true;
        mouseX = e.offsetX;
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
            var xmove = 2*(e.offsetX - mouseX)/canvas.width;
            mouseX = e.offsetX;
            for(var i=0; i<4; i++) {
                spadi_vertices[i][0] += xmove;
            }

            gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(spadi_vertices));
        }
    } );

    render();
}
var test = vec2(0.0,1.0);

function render() {
    
    // Láta ferninginn skoppa af veggjunum
    if (Math.abs(box[0] + dX) > maxX - boxRad) dX = -dX;
    if (Math.abs(box[1] + dY) > maxY - boxRad) dY = -dY;

    // Uppfæra staðsetningu
    box[0] += dX;
    box[1] += dY;
    
    gl.clear( gl.COLOR_BUFFER_BIT );
    //
    // test[0] += 1.0 ;

    // box
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId_box );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(box_vertices), gl.DYNAMIC_DRAW );
    // gl.uniform1fv( if_spadi, flatten(vec2(0.0,0.0)) );    
    gl.uniform2fv( locBox, flatten(box) );
    gl.uniform2fv( if_spadi, flatten( vec2(0.0,0.0)) );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );


    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId_spadi );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(spadi_vertices), gl.DYNAMIC_DRAW );

    gl.uniform2fv( if_spadi, flatten(test) );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
    




    window.requestAnimFrame(render);
}

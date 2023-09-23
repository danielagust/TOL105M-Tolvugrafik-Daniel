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

var pos_spade = vec2(0.0, -0.9)
var pos_box = vec2(0.0, -0.0)
var box = pos_box

const width_spade = 0.15;
const height_spade = 0.02;

const width_box = boxRad;
const height_box = boxRad;

var hitbox = [];
// Ferningurinn er upphaflega í miðjunni
// var box_vertices = new Float32Array([-0.05, -0.05, 0.05, -0.05, 0.05, 0.05, -0.05, 0.05]);
// var box_vertices = [
//     vec2(-0.05, -0.05),
//     vec2(0.05, -0.05),
//     vec2(0.05, 0.05),
//     vec2(-0.05, 0.05)
// ];


var box_vertices = [];
box_vertices.push(add(vec2(- width_box,- height_box), pos_box)); // bottom left
box_vertices.push(add(vec2(- width_box,height_box), pos_box)); // top left
box_vertices.push(add(vec2( width_box, height_box), pos_box)); // top right
box_vertices.push(add(vec2( width_box,- height_box), pos_box)); // bottom right

// var spadi_vertices = [
//     vec2( -0.1, -0.9 ),
//     vec2( -0.1, -0.86 ),
//     vec2(  0.1, -0.86 ),
//     vec2(  0.1, -0.9 ) 
// ];

var spadi_vertices = [];


spadi_vertices.push(add(vec2(- width_spade,- height_spade), pos_spade)); // bottom left
spadi_vertices.push(add(vec2(- width_spade,height_spade), pos_spade)); // top left
spadi_vertices.push(add(vec2( width_spade, height_spade), pos_spade)); // top right
spadi_vertices.push(add(vec2( width_spade,- height_spade), pos_spade)); // bottom right
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
    bufferId_hitbox = gl.createBuffer();
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

            // gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(spadi_vertices));
            render_spade();
            // console.log("hit", collision(box_vertices, spadi_vertices));
        }
    } );

    colorLoc = gl.getUniformLocation( program, "fColor" );
    make_hitbox();
    // move_hitbox();
    // // move_box();
    // move_hitbox();
    // move_box();
    // move_hitbox();
  
    
    
    // render_hitbox();
    render();
}
var colorLoc;

function collision( box_col, spadi ) {
        
    const ref_corner = 1;
   
    // return (
    //   box1.hitbox[ref_corner].x + box1.width >= box2.hitbox[ref_corner].x && // box1 right collides with box2 left
    //   box2.hitbox[ref_corner].x + box2.width >= box1.hitbox[ref_corner].x && // box2 right collides with box1 left
    //   box1.hitbox[0].y + box1.height >= box2.hitbox[0].y && // box1 bottom collides with box2 top
    //   box2.hitbox[0].y + box2.height  >= box1.hitbox[0].y // box1 top collides with box2 bottom
    // )

    return (
        box_col[ref_corner][0] + width_box >= spadi[ref_corner][0] && // box right collides with spadi left
        spadi[ref_corner][0] + width_spade >= box_col[ref_corner][0] && // spadi right collides with box left
        box_col[0][1] + height_box >= spadi[0][1] && // box bottom collides with spadi top
        spadi[0][1] + height_spade  >= box_col[0][1] // box top collides with spadi bottom
      )

  }

var test = vec2(0.0,1.0);

function render_spade(){
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId_spadi );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(spadi_vertices), gl.DYNAMIC_DRAW );

    gl.uniform2fv( if_spadi, flatten(test) );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

var bufferId_hitbox;
function render_hitbox(){
    // box
    gl.uniform4fv( colorLoc, vec4(0.0, 0.0, 1.0, 1.0) );  
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId_hitbox );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(hitbox), gl.DYNAMIC_DRAW );
    // gl.uniform1fv( if_spadi, flatten(vec2(0.0,0.0)) );    
    // gl.uniform2fv( locBox, flatten(box) );
    gl.uniform2fv( if_spadi, flatten( vec2(0.0,1.0)) );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}


function render_box(){
    // box
    gl.uniform4fv( colorLoc, vec4(1.0, 0.0, 0.0, 1.0) );  
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId_box );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(box_vertices), gl.DYNAMIC_DRAW );
    // gl.uniform1fv( if_spadi, flatten(vec2(0.0,0.0)) );    
    gl.uniform2fv( locBox, flatten(box) );
    gl.uniform2fv( if_spadi, flatten( vec2(0.0,0.0)) );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, 4 );
}

function move_box(){
    // Láta ferninginn skoppa af veggjunum
    if (Math.abs(box[0] + dX) > maxX - boxRad) dX = -dX;
    if (Math.abs(box[1] + dY) > maxY - boxRad) dY = -dY;
    

    // Uppfæra staðsetningu
    box[0] += dX;
    box[1] += dY;
    // console.log("hello");
    
    
}

function make_hitbox(){
    hitbox.push(add(vec2(- width_box,- height_box), pos_box)); // bottom left
    hitbox.push(add(vec2(- width_box,height_box), pos_box)); // top left
    hitbox.push(add(vec2( width_box, height_box), pos_box)); // top right
    hitbox.push(add(vec2( width_box,- height_box), pos_box)); // bottom right
}
function move_hitboxv2(){
    hitbox[0] = (add(vec2(- width_box,- height_box), box)); // bottom left
    hitbox[1] = (add(vec2(- width_box,height_box), box)); // top left
    hitbox[2] = (add(vec2( width_box, height_box), box)); // top right
    hitbox[3] = (add(vec2( width_box,- height_box), box)); // bottom right 
    // for ( var i = 0; i < hitbox.length; ++i ){
    //     hitbox[i][0] += box[0];
    //     hitbox[i][1] += box[1];
    // }
    
}

function move_hitbox(){
    move_hitboxv2();
    // translatev1(box);
}

function translatev1(vector){
    for ( var i = 0; i < hitbox.length; ++i ){
        hitbox[i] = add(hitbox[i], vector);
    }
}


// move_box();
// move_hitbox();
// move_box();
// move_hitbox();

function get_top_cornor(){
    return vec2(box[0]-width_box, box[1]+height_box);
}
function get_bottom_coronor(){

    return vec2(box[0]-width_box, box[1]-height_box);
}

function render() {
    
    
    //
    // test[0] += 1.0 ;
    // move_box();
    move_box();
    

    gl.clear( gl.COLOR_BUFFER_BIT );
    

    //box
    // render_hitbox();
    
    move_hitbox();
    render_hitbox();
    
    

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(get_top_cornor()), gl.DYNAMIC_DRAW );
    // gl.uniform1fv( if_spadi, flatten(vec2(0.0,0.0)) ); 
    gl.uniform4fv( colorLoc, vec4(0.0, 1.0, 0.0, 1.0) );   
    // gl.uniform2fv( locBox, flatten(box) );
    gl.uniform2fv( if_spadi, flatten( vec2(0.0,0.0)) );
    gl.drawArrays( gl.POINTS, 0, 1 );

    render_box();
   
   

    // spadi
    render_spade();
    // console.log(hitbox);
    console.log("hit", collision(hitbox, spadi_vertices));

   
    




    window.requestAnimFrame(render);
}

/////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Forrit með tveimur mynstrum.  Sýnir vegg með
//     múrsteinsmynstri og gólf með viðarmynstri.  Það er hægt
//     að ganga um líkanið, en það er engin árekstarvörn.
//
//    Hjálmtýr Hafsteinsson, mars 2022
/////////////////////////////////////////////////////////////////
var canvas;
var gl;

var numVertices  = 6;

var program;

var pointsArray = [];
var colorsArray = [];
var texCoordsArray = [];

var texture;
var texVegg;
var texGolf;
var texRoof_top;
var texRoof_side;


// Breytur fyrir hreyfingu áhorfanda
var userXPos = 0.0;
var userZPos = 2.0;
var userIncr = 0.1;                // Size of forward/backward step
var userAngle = 270.0;             // Direction of the user in degrees
var userXDir = 0.0;                // X-coordinate of heading
var userZDir = -1.0;               // Z-coordinate of heading


var movement = false;
var spinX = 0;
var spinY = 0;
var origX;
var origY;

var zDist = -5.0;

var proLoc;
var mvLoc;

var golf_size = {
    width: 5.0,
    height: 0.0,
    length: 10.0
}

var veggur_size = {
    width: 5.0,
    height: 1.0,
    length: 0.0
}

var roof_size_top = {
    width: 5.0,
    height: 0.5,
    length: 10.0
}

var roof_size_side = {
    width: 5.0,
    height: 1.5,
    length: 0.0
}

var roof_size_side_tex = {
    width: 5.0,
    height: 5.0,
    length: 0.0
}

// Hnútar veggsins
var vertices = [
    vec4( -veggur_size.width,  0.0, 0.0, 1.0 ),
    vec4(  veggur_size.width,  0.0, 0.0, 1.0 ),
    vec4(  veggur_size.width,  veggur_size.height, 0.0, 1.0 ),
    vec4(  veggur_size.width,  veggur_size.height, 0.0, 1.0 ),
    vec4( -veggur_size.width,  veggur_size.height, 0.0, 1.0 ),
    vec4( -veggur_size.width,  0.0, 0.0, 1.0 ),
// Hnútar gólfsins (strax á eftir)
    vec4( -golf_size.width,  0.0, golf_size.length, 1.0 ),
    vec4(  golf_size.width,  0.0, golf_size.length, 1.0 ),
    vec4(  golf_size.width,  0.0,  0.0, 1.0 ),
    vec4(  golf_size.width,  0.0,  0.0, 1.0 ),
    vec4( -golf_size.width,  0.0,  0.0, 1.0 ),
    vec4( -golf_size.width,  0.0, golf_size.length, 1.0 ),
    // roof top
    vec4( -roof_size_top.width,  0.0, roof_size_top.length, 1.0 ),
    vec4(  roof_size_top.width,  0.0, roof_size_top.length, 1.0 ),
    vec4(  roof_size_top.width,  0.0,  0.0, 1.0 ),
    vec4(  roof_size_top.width,  0.0,  0.0, 1.0 ),
    vec4( -roof_size_top.width,  0.0,  0.0, 1.0 ),
    vec4( -roof_size_top.width,  0.0, roof_size_top.length, 1.0 ),
    // roof side
    vec4( -roof_size_side.width,  0.0, 0.0, 1.0 ),
    vec4(  roof_size_side.width,  0.0, 0.0, 1.0 ),
    vec4(  roof_size_side.width,  roof_size_side.height, 0.0, 1.0 ),
    vec4(  roof_size_side.width,  roof_size_side.height, 0.0, 1.0 ),
    vec4( -roof_size_side.width,  roof_size_side.height, 0.0, 1.0 ),
    vec4( -roof_size_side.width,  0.0, 0.0, 1.0 ),
];


// vec2(  0.0,  0.0 ),
//     vec2( golf_size.width*2,  0.0 ),
//     vec2( golf_size.width*2, golf_size.length ),
//     vec2( golf_size.width*2, golf_size.length ),
//     vec2(  0.0, golf_size.length ),
//     vec2(  0.0,  0.0 ),
// Mynsturhnit fyrir vegg
var texCoords = [
    vec2(  0.0, 0.0 ),
    vec2( veggur_size.width*2, 0.0 ),
    vec2( veggur_size.width*2, veggur_size.height ),
    vec2( veggur_size.width*2, veggur_size.height ),
    vec2(  0.0, veggur_size.height ),
    vec2(  0.0, 0.0 ),
// Mynsturhnit fyrir gólf
    vec2(  0.0,  0.0 ),
    vec2( golf_size.width*2,  0.0 ),
    vec2( golf_size.width*2, golf_size.length ),
    vec2( golf_size.width*2, golf_size.length ),
    vec2(  0.0, golf_size.length ),
    vec2(  0.0,  0.0 ),
    // Mynsturhnit fyrir roof_top
    vec2(  0.0,  0.0 ),
    vec2( roof_size_top.width*2,  0.0 ),
    vec2( roof_size_top.width*2, roof_size_top.length ),
    vec2( roof_size_top.width*2, roof_size_top.length ),
    vec2(  0.0, roof_size_top.length ),
    vec2(  0.0,  0.0 ),
    // Mynsturhnit fyrir roof_side
    vec2(  0.0, 0.0 ),
    vec2( roof_size_side_tex.width*2, 0.0 ),
    vec2( roof_size_side_tex.width*2, roof_size_side_tex.height ),
    vec2( roof_size_side_tex.width*2, roof_size_side_tex.height ),
    vec2(  0.0, roof_size_side_tex.height ),
    vec2(  0.0, 0.0 )

];


function make_texture(texture_id, texture, program){
    gl.bindTexture( gl.TEXTURE_2D, texture_id );
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture );
    gl.generateMipmap( gl.TEXTURE_2D );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR );
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR );

    gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);
}

window.onload = function init() {

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.9, 1.0, 1.0, 1.0 );
    
    gl.enable(gl.DEPTH_TEST);

    //
    //  Load shaders and initialize attribute buffers
    //
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    var tBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, tBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(texCoords), gl.STATIC_DRAW );
    
    var vTexCoord = gl.getAttribLocation( program, "vTexCoord" );
    gl.vertexAttribPointer( vTexCoord, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vTexCoord );

    // Lesa inn og skilgreina mynstur fyrir vegg
    var veggImage = document.getElementById("VeggImage");
    texVegg = gl.createTexture();
    make_texture(texVegg, veggImage, program)

    
    // gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);

    // Lesa inn og skilgreina mynstur fyrir gólf
    var golfImage = document.getElementById("GolfImage");
    texGolf = gl.createTexture();
    make_texture(texGolf, golfImage, program)
    
    // gl.uniform1i(gl.getUniformLocation(program, "texture"), 0);


    var roofImage = document.getElementById("RoofImage");
    texRoof_top = gl.createTexture();
    make_texture(texRoof_top, roofImage, program)

    texRoof_side = gl.createTexture();
    make_texture(texRoof_side, roofImage, program)


    proLoc = gl.getUniformLocation( program, "projection" );
    mvLoc = gl.getUniformLocation( program, "modelview" );

    var proj = perspective( 50.0, 1.0, 0.2, 100.0 );
    gl.uniformMatrix4fv(proLoc, false, flatten(proj));
    

    //event listeners for mouse
    canvas.addEventListener("mousedown", function(e){
        movement = true;
        origX = e.clientX;
    } );

    canvas.addEventListener("mouseup", function(e){
        movement = false;
    } );

    canvas.addEventListener("mousemove", function(e){
        if(movement) {
            userAngle += 0.4*(origX - e.clientX);
            userAngle %= 360.0;
            userXDir = Math.cos( radians(userAngle) );
            userZDir = Math.sin( radians(userAngle) );
            origX = e.clientX;
        }
    } );
    
    // Event listener for keyboard
     window.addEventListener("keydown", function(e){
         switch( e.keyCode ) {
            case 87:	// w
                userXPos += userIncr * userXDir;
                userZPos += userIncr * userZDir;;
                break;
            case 83:	// s
                userXPos -= userIncr * userXDir;
                userZPos -= userIncr * userZDir;;
                break;
            case 65:	// a
                userXPos += userIncr * userZDir;
                userZPos -= userIncr * userXDir;;
                break;
            case 68:	// d
                userXPos -= userIncr * userZDir;
                userZPos += userIncr * userXDir;;
                break;
         }
     }  );  

    // Event listener for mousewheel
     window.addEventListener("wheel", function(e){
         if( e.deltaY > 0.0 ) {
             zDist += 0.2;
         } else {
             zDist -= 0.2;
         }
     }  );  


    render();
 
}


function veggur_draw(mv){
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.bindTexture( gl.TEXTURE_2D, texVegg );
    gl.drawArrays( gl.TRIANGLES, 0, numVertices );
}

function top_veggur(mv){
    mv = mult(mv, translate(0.0,veggur_size.height,0.0))
    veggur_draw(mv);
}

function roof_top(mv){
    // mv = mult(mv, scalem(golf_size.width,1.0,golf_size.length))
    mv = mult(mv, translate(0.0,veggur_size.height+veggur_size.height,0.0))
    // mv = mult(mv, rotateX(90))
    mv = mult(mv, scalem(1.0,1.0,1.0))
    roof_draw_top(mv)
}

function roof_draw_top(mv){
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.bindTexture( gl.TEXTURE_2D, texRoof_top );
    gl.drawArrays( gl.TRIANGLES, numVertices*2, numVertices );
}


function roof_side(mv, angle){
    mv = mult(mv, translate(0.0,0.0,0.0))
    mv = mult(mv, translate(0.0,veggur_size.height,0.0))
    
    mv = mult(mv, rotateX(angle))
    mv = mult(mv, scalem(1.0,2.0,1.0))
    roof_draw_side(mv)
}

function roof_draw_side(mv){
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.bindTexture( gl.TEXTURE_2D, texRoof_side );
    gl.drawArrays( gl.TRIANGLES, numVertices*3, numVertices );
}




var render = function(){
    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // staðsetja áhorfanda og meðhöndla músarhreyfingu
    var mv = lookAt( vec3(userXPos, 0.5, userZPos), vec3(userXPos+userXDir, 0.5, userZPos+userZDir), vec3(0.0, 1.0, 0.0 ) );
    
    

    // Teikna gólf með mynstri

    // mv = mult(mv, translate(0.0,0.0,0.0))

    roof_top(mv)
    gl.uniformMatrix4fv(mvLoc, false, flatten(mv));
    gl.bindTexture( gl.TEXTURE_2D, texGolf );
    gl.drawArrays( gl.TRIANGLES, numVertices, numVertices );

    // Teikna vegg með mynstri
    // mv = mult(mv, rotateY(90))
    
    veggur_draw(mv)
    roof_side(mv, 60)

     // Teikna vegg með mynstri
    mv = mult(mv, translate(golf_size.width,0.0,golf_size.length/2))
    mv = mult(mv, rotateY(90))
    veggur_draw(mv)

    

     // Teikna top vegg með mynstri
    top_veggur(mv)

     // Teikna vegg með mynstri
    mv = mult(mv, rotateY(90))
    mv = mult(mv, translate(golf_size.width,0.0,-golf_size.length/2))
    veggur_draw(mv)
    
    
    roof_side(mv, 60)
    
     // Teikna vegg með mynstri
    mv = mult(mv, rotateY(90))
    mv = mult(mv, translate(-golf_size.width,0.0,golf_size.length/2))
    veggur_draw(mv)
    
    top_veggur(mv)
    

    requestAnimFrame(render);
}

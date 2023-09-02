///////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Einfaldasta WebGL forritið.  Teiknar einn rauðan þríhyrning.
//
//    Hjálmtýr Hafsteinsson, ágúst 2023
///////////////////////////////////////////////////////////////////
var gl;
var points;
var scaler = 0.1; // set the size of the triangle
var colorLoc;
const min = -1; // min size of random area
const max = 1;  // max size of random area
const count = 100; // amount of triangles

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // var vertices = new Float32Array([-1, -1, 0, 1, 1, -1]);
    var vertices = [ ];
    function  newTriTimes(vertices, count){
        for ( var i = 0; i < count; ++i ){
            vertices.push(vec2( -1, -1 ));
            vertices.push(vec2(  0,  1 ));
            vertices.push(vec2(  1, -1 )); 
        }
    }

    function newTri(vertices){
        vertices.push(vec2( -1, -1 ));
        vertices.push(vec2(  0,  1 ));
        vertices.push(vec2(  1, -1 ));
    }
    function triScaler(scaler){
        for ( var i = 0; i < vertices.length; ++i ){
            vertices[i] = scale(scaler, vertices[i]);
        }
        
    }

    function  newTriTimesPlusScale(vertices, count, scaler){
        for ( var i = 0; i < count; ++i ){
            vertices.push(scale(scaler,vec2( -1, -1 )));
            vertices.push(scale(scaler,vec2(  0,  1 )));
            vertices.push(scale(scaler,vec2(  1, -1 ))); 
        }
    }

    function trimover(){
        
        var x;
        var y;
        var movingvar
        // console.log(flatten(movingvar))
        for ( var i = 0; i < vertices.length; i+=3 ){
            x =  Math.random() * (max - min) + min;
            y = Math.random() * (max - min) + min;
            movingvar = vec2(x,y);
            vertices[i] = add(vertices[i], movingvar);
            vertices[i+1] = add(vertices[i+1], movingvar);
            vertices[i+2] = add(vertices[i+2], movingvar);
        }
    }

    function  newTriTimesPlusScalePlusMove(vertices, count, scaler){
    /**
     * Does what newTriTimes, triScaler and trimover doed
     */
        var left;
        var top;
        var right;
        var x;
        var y;
        var movingvar
        for ( var i = 0; i < count; ++i ){
            // scales
            left = scale(scaler,vec2( -1, -1 ));
            top = scale(scaler,vec2(  0,  1 ));
            right = scale(scaler,vec2(  1, -1 ));


            // moves
            x =  Math.random() * (max - min) + min;
            y = Math.random() * (max - min) + min;
            movingvar = vec2(x,y);

            left = add(left, movingvar);
            top = add(top, movingvar);
            right = add(right, movingvar);

            // adds a new tri
            vertices.push(left);
            vertices.push(top);
            vertices.push(right); 
        }
    }

    
    
    
    // version 1
    /* 
    newTri(vertices); 
    triScaler(scaler)
    trimover();
    */

    // version 2
    /* 
    newTriTimesPlusScale(vertices, count, scaler);
    trimover();
    */

    // version 3
    newTriTimesPlusScalePlusMove(vertices, count, scaler);

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.95, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate shader variables with our data buffer
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    colorLoc = gl.getUniformLocation( program, "fColor" );

    render(vertices);
};


function render(vertices) {
    gl.clear( gl.COLOR_BUFFER_BIT );
    for ( var i = 0; i < vertices.length; i+=3 ){
        gl.uniform4fv( colorLoc, vec4(Math.random(), Math.random(), Math.random(), 1.0) );
        gl.drawArrays( gl.TRIANGLES, i, i+3 );
    }
    
}

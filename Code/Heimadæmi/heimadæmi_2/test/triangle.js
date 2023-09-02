///////////////////////////////////////////////////////////////////
//    Sýnidæmi í Tölvugrafík
//     Einfaldasta WebGL forritið.  Teiknar einn rauðan þríhyrning.
//
//    Hjálmtýr Hafsteinsson, ágúst 2023
///////////////////////////////////////////////////////////////////
var gl;
var points;
var scaler = 0.1;
var colorLoc;
const min = -1;
const max = 1; 

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    // var vertices = new Float32Array([-1, -1, 0, 1, 1, -1]);
    var vertices = [
        vec2( -1, -1 ),
        vec2(  0,  1 ),
        vec2(  1, -1 )
    ];

    function newTri(vertices){
        vertices.push
    }
    function triScaler(scaler){
        for ( var i = 0; i < vertices.length; ++i ){
            vertices[i] = scale(scaler, vertices[i]);
        }
        
    }
    
    
    function trimover(){
        
        var x =  Math.random() * (max - min) + min;
        var y = Math.random() * (max - min) + min;
        var movingvar = vec2(x,y);
        console.log(flatten(movingvar))
        for ( var i = 0; i < vertices.length; ++i ){
            vertices[i] = add(vertices[i], movingvar);
        }
    }
    triScaler(scaler);
    trimover();
    
    


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
        gl.drawArrays( gl.TRIANGLES, 0, 3 );
    }
    
}

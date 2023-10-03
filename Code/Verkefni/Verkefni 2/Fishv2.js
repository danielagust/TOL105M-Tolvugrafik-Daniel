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
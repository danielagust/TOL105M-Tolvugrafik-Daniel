"use strict";

var canvas;
var gl;

var points = [];

var NumTimesToSubdivide = 5;

window.onload = function init()
{
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //
    //  Initialize our data for the Sierpinski Gasket
    //

    // First, initialize the corners of our gasket with three points.

    var vertices = [
        vec2( -1, -1 ),
        vec2(  1, -1 ),
        vec2(  1,  1 ),
        vec2(  -1,  1 )
        
    ];

    divideSquare( vertices[0], vertices[1], vertices[2],vertices[3],
                    NumTimesToSubdivide);

    //
    //  Configure WebGL
    //
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU

    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );

    // Associate out shader variables with our data bufferSquareSquare

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    render();
};

function Square( a1, c1, d1, a2, b1, c2)
{
    points.push( a1, c1, d1, a2, b1, c2 );
}

function divideSquare( a, b, c, d, count )
{

    // check for end of recursion

    if ( count === 0 ) {
        Square( a, c, d, a, b, c );
    }
    else {

        //bisect the sides

        // var ab = mix( a, b, 0.5 );
        // var ac = mix( a, c, 0.5 );
        // var bc = mix( b, c, 0.5 );

        //middle ones
        var ac = mix( a, c, 1 / 3);
        var bd = mix( b, d, 1 / 3);
        var ca = mix( c, a, 1 / 3);
        var db = mix( d, b, 1 / 3);
      

        // sides
        // ab side
            var ab = mix( a, b, 1 / 3);
            var ba = mix( b, a, 1 / 3);

        // bc side
            var bc = mix( b, c, 1 / 3);
            var cb = mix( c, b, 1 / 3);

        // cd side
            var cd = mix( c, d, 1 / 3);
            var dc = mix( d, c, 1 / 3);

        // da side
            var da = mix( d, a, 1 / 3);
            var ad = mix( a, d, 1 / 3);

        --count;

        // clockvise

        divideSquare( a, ab, ac, ad, count ); /* done */
        divideSquare( ab, ba, bd, ac, count ); /* done */
        divideSquare( ba, b, bc, bd, count ); /* done */
        divideSquare( bd, bc, cb, ca, count ); /* done  */
        divideSquare( ca, cb, c, cd, count ); /* done */
        divideSquare( db, ca, cd, dc, count ); /* done */
        divideSquare( da, db, dc, d, count ); /* done  */
        divideSquare( ad, ac, db, da, count ); /* done */

        //counter clockvise

        // divideSquare( a, ad, ac, ab, count ); /* done */
        // divideSquare( ab, ac, bd, ba, count ); /* done */
        // divideSquare( ba, bd, bc, b, count ); /* done */
        // divideSquare( bd, ca, cb, bc, count ); /* done  */
        // divideSquare( ca, cd, c, cb, count ); /* done */
        // divideSquare( db, dc, cd, ca, count ); /* done */
        // divideSquare( da, d, dc, db, count ); /*  done */
        // divideSquare( ad, da, db, ac, count ); /* done */
        
    }
}

function render()
{
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.TRIANGLES, 0, points.length );
}

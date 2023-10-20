
var zDist = -3.0;
var xDist = 0.0;
var pos = vec3(0.0,0.0,-3.0)
var dir = vec3(0.0,0.0,zDist)

var Forward_key = "w"; // w key
var Backward_key = "s"; // s key
var Left_key = "a"; // a key
var Right_key = "d"; // d key
var Up_key = 32; // space key
var Down_key = 16; // shift key

var speed_out = 0.1;


function do_key(key, deltaTime, speed){
    switch( key ) {
        case Forward_key:	// áfram ör
            zDist += speed*deltaTime;
            break;
        case Backward_key:	// tilbaka ör
            zDist -= speed*deltaTime;
            break;
        case Left_key: // vinstri ör
            xDist += speed*deltaTime;
            break;
        case Right_key: // hægri ör
            xDist -= speed*deltaTime;
     }
}
function mouseLook(key, mdelta){
    var mv = mat4();
    do_key(key, 1.0, speed_out);
    var mv = lookAt( vec3(xDist, 0.0, zDist),
                      vec3(xDist, 0.0, zDist+2.0),
                      vec3(0.0, 1.0, 0.0) );
    mv = mult( mv,  rotateY(mdelta) ) ;
    // mdelta2 = mdelta2
    // console.log("hello");
    return mv;
}

function mouseLook_cor(key, mdelta, deltaTime){
    var mv = mat4();
    do_key(key, deltaTime, speed_out);
    var mv = lookAt( vec3(xDist, 0.0, zDist),
                      vec3(xDist, 0.0, zDist+2.0),
                      vec3(0.0, 1.0, 0.0) );
    mv = mult( mv,  rotateY(mdelta) ) ;
    // mdelta2 = mdelta2
    // console.log("hello");
    return mv;
}

function mouseLook_cor_ws(key, mdelta, deltaTime, speed){
    var mv = mat4();
    do_key(key, deltaTime, speed);
    var mv = lookAt( vec3(xDist, 0.0, zDist),
                      vec3(xDist, 0.0, zDist+2.0),
                      vec3(0.0, 1.0, 0.0) );
    mv = mult( mv,  rotateY(mdelta) ) ;
    // mdelta2 = mdelta2
    // console.log("hello");
    return mv;
}
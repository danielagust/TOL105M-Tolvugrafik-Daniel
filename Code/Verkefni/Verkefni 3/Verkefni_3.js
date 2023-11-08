// import * as THREE from "../../ThreeJS/js/three.js";
// import { OrbitControls } from "../../ThreeJS/js/examples/jsm/controls/OrbitControls.js";
import config from "./config.json" assert { type: 'json' };
// Ná í striga
const canvas = document.querySelector('#c');

const objLoader = new THREE.OBJLoader();
const loader = new THREE.TextureLoader();

// Skilgreina sviðsnet
const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');



// Bæta við músarstýringu
// const controls = new THREE.OrbitControls( camera, canvas );

// controls.lookSpeed = 0.1;
// controls.movementSpeed = 10;

var clock = new THREE.Clock(true);

// Skilgreina birtingaraðferð með afbjögun (antialias)
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});

set_data(config);

var MACHINE;
var GNOME;
var FLOOR;
var WALLS;
var ENTITIES;
var camera;
var controls;

var Left_key = 65; // a key
var Right_key = 68; // d key


function make_machine(){
    var machine = new THREE.Object3D();
    
    FLOOR = make_floor();
    machine.add(FLOOR)
    
    WALLS = make_walls(FLOOR);
    machine.add(WALLS)

    
    
    var offset_2 = if_even_invers(floor_config.length, floor_config.width) 
    machine.position.set(offset_2[0], 0.0, offset_2[1]);
    console.log(machine.position, "hrllo")
    make_entities()
    scene.add(ENTITIES)
    
    MACHINE = machine
    scene.add(MACHINE)
    
}

function make_entities(){
    var entities = new THREE.Object3D();
    GNOME = make_gnome();

    entities.add(GNOME);
    ENTITIES = entities;

}

function make_camera(){
    // Skilgreina myndavél og staðsetja hana
    camera = new THREE.PerspectiveCamera( 75, canvas.clientWidth/canvas.clientHeight, 0.1, 1000 );
    // camera.position.set(0, 10, 20);
    camera.position.set(0, 4, 0);
    controls = new THREE.OrbitControls( camera, canvas );
    // controls.target.set(GNOME.position.x, GNOME.position.y, GNOME.position.z)
}


make_machine();
make_camera();
event_keyboard();


function event_keyboard(){
    var max_gnome_pos = floor_config.width/2;
    var min_gnome_pos = floor_config.width/2;
    const step =1.0
    window.addEventListener("keydown", function(e){
        switch( e.keyCode ) {
            // case Forward_key:	// upp �r
            //     zView += 0.2;
            //     dir.fb += speed;
            //     break;
            // case Backward_key:	// ni�ur �r
            //     zView -= 0.2;
            //     dir.fb -= speed;
            //     break;
            // case Left_key:
            //     dir.rl -= speed;
            //     break;
            // case Right_key:
            //     dir.rl += speed;
            //     break;

            case Right_key:	// a - snýr neðri armi
                GNOME.position.x = Math.min(max_gnome_pos, GNOME.position.x+step);
                // camera.position.x = Math.min(max_gnome_pos, camera.position.x+step);
                // GNOME.position.x +=1.0
                break;
            case Left_key:	// s - snýr neðri armi
                GNOME.position.x = Math.max(-min_gnome_pos, GNOME.position.x-step);
                // camera.position.x = Math.max(-min_gnome_pos, camera.position.x-step);
                break;
            // case Up_key:
            //     dir.ud += speed;
            //     break;
            // case Down_key:
            //     dir.ud -= speed;
            //     break;

            
         }
        //  alert(e.keyCode);
     }  );
}





// Skilgreina ljósgjafa og bæta honum í sviðsnetið
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(2, 4, 1);
scene.add(light);


var tick_speed = config.tick_speed;
var last_count =0;
var lastTime = 0;
var tcik = 0;

function move_tick(delta){
    var deltaTime;
    if (lastTime !== undefined) {
        deltaTime = delta - lastTime;
        // console.log(lastTime)
        // console.log(deltaTime)
        tcik += tick_speed * deltaTime / 1000;
        if (last_count != tcik.toFixed(0)){
            console.log("hello")
            last_count = tcik.toFixed(0)
        }
        

        
    }
    
    
    
    lastTime = delta
}

function updateGameLogic_main(delta){
    
}






// Hreyfifall
const animate = function (timestamp) {
    

    var delta = clock.getDelta();
    move_tick(timestamp)

    
    controls.update(delta);
    renderer.render( scene, camera );
    requestAnimationFrame( animate );

   
};
clock.start()
requestAnimationFrame(animate);
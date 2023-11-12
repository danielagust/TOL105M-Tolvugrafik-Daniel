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
set_data_helper(config);

var MACHINE;
var GNOME;
var FLOOR;
var WALLS;
var FEETS;
var ENTITIES;
var camera_top;
var camera_gnome;
var camera;
var controls;
var HEADS ;
var HEAD_list = [];
var MUSHROOM;
var MUSHROOM_list = [];
var Built_list = [];
var BUILT = new THREE.Object3D();

var Left_key = 65; // a key
var Right_key = 68; // d key
var Space_key = 32;

var Left_flip = false;
var Right_flip = false;
var Space_flip = false;
var sumon_flip = false;

var if_gnome_move_on_tick = true;
var max_gnome_pos = floor_config.width/2-1;
var min_gnome_pos = floor_config.width/2-1;
const speed =config.machine.entities.gnome.speed
var centipede_config = config.machine.entities.centipede

var tick_speed = config.game_logic.tick_speed;
var last_count =0;
var lastTime = 0;
var tick = 0;
var head_end ;
var inside_tick = 0;


function run(){
    make_machine();
    make_camera();
    event_keyboard();
    make_light();
    
    document.getElementById("camrea_button").addEventListener ("click", if_gnome_camrea);
    // if_gnome_camrea(true);
    requestAnimationFrame(animate);
}


function make_machine(){
    var machine = new THREE.Object3D();
    
    FLOOR = make_floor();
    machine.add(FLOOR)
    
    WALLS = make_walls(FLOOR);
    machine.add(WALLS)

    FEETS = make_feets(FLOOR);
    machine.add(FEETS)

    
    
    var offset_2 = if_even_invers(floor_config.length, floor_config.width) 
    machine.position.set(offset_2[0], 0.0, offset_2[1]);
    // console.log(machine.position, "hrllo")
    make_entities()
    scene.add(ENTITIES)
    
    MACHINE = machine
    scene.add(MACHINE)
    
}



function make_entities(){
    var entities = new THREE.Object3D();
    GNOME = make_gnome();
    entities.add(GNOME);
    
    var body = make_centipede(WALLS);
    HEADS=(body.mesh);
    
    HEAD_list.push(body.head.head)
    // console.log(body)

    // var body = make_centipede(WALLS);
    // HEADS.add(body.mesh);
    // HEAD_list.push(body.head)
    // console.log(body)
    
    // head_end = HEAD_list
    // console.log(HEAD_list)
    entities.add(HEADS)

    MUSHROOM = make_mushrooms(6, -6);
    
    // make_mushrooms();
    entities.add(MUSHROOM)

    

    for ( var i = 0; i < centipede_config.length.max_length; ++i ){
        
    }
    
    // make_part();
    // make_part();
    
    // console.log(HEAD_list , "headlists")
    // for ( var i = 0; i < (config.machine.structure.floor.length-1); ++i ){
    //     // move_head({
    //     //     mushrooms:WALLS,
    //     //     walls: 7
    //     // }, HEAD_list[0])
    //     if_new(HEAD_list[0], count, HEADS).stop
        
    // }
    // console.log(HEAD_list[0].before)
    // HEAD_list.push(HEAD_list[0].before.split(HEADS).head)
    // HEAD_list[0].before.before.split(HEADS)
    // console.log(HEAD_list)
    
    
    

    ENTITIES = entities;

}

function make_camera(){
    // Skilgreina myndavél og staðsetja hana
    camera_top = new THREE.PerspectiveCamera( 75, canvas.clientWidth/canvas.clientHeight, 0.1, 1000 );
    // camera.position.set(0, 10, 20);
    camera_top.position.set(0, 10, 10);
    // controls = new THREE.OrbitControls( camera_top, canvas );
    controls = new THREE.PointerLockControls( camera_top, canvas );
    // controls.lock()
    
    // controls.target.set(GNOME.position.x, GNOME.position.y, GNOME.position.z)
    // new_pos(controls.target, GNOME.position)
}

function make_light(){
    // Skilgreina ljósgjafa og bæta honum í sviðsnetið
    const light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(0, 10, 0);
    scene.add(light);
}


function sumon_built(){
    if(Space_flip){
        var bulit = make_bulit(GNOME);
        bulit.position.y += 0.5
        Built_list.push(bulit)
        BUILT.add(bulit)
        ENTITIES.add(BUILT)
        Space_flip = false
    }
    
}

var flip_camrea_out = false
var flip_camrea = true;
function if_gnome_camrea(){
    console.log("hello")
    if(flip_camrea){
        flip_camrea_out = false
        flip_camrea = false
        camera = camera_top;
        controls = new THREE.OrbitControls( camera_top, canvas );
        // controls = new THREE.PointerLockControls( camera_top, canvas );

    }
    else{
        flip_camrea_out = true
        flip_camrea = false
        camera = camera_top;
        new_pos(camera.position, GNOME.position)
        camera.position.y += 0.5
        console.log("hello inn")
        new_pos(controls.target, new THREE.Vector3(0.0,10,0.0))
        // controls = new THREE.PointerLockControls( camera_top, canvas );
        
    }
}



function event_keyboard(){
    
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
                if(if_gnome_move_on_tick){
                    Right_flip = true
                }else{
                    GNOME.position.x = Math.min(max_gnome_pos, GNOME.position.x+speed);
                }
                
                if(flip_camrea_out){
                    camera.position.x = Math.min(max_gnome_pos, camera.position.x+speed);
                    camera.target.x = Math.min(max_gnome_pos, camera.target.x+speed);
                }
                // camera.position.x = Math.min(max_gnome_pos, camera.position.x+step);
                // GNOME.position.x +=1.0
                break;
            case Left_key:	// s - snýr neðri armi
                if(if_gnome_move_on_tick){
                    Left_flip = true
                }else{
                    GNOME.position.x = Math.max(-min_gnome_pos, GNOME.position.x-speed);
                }
                
                if(flip_camrea_out){
                    camera.position.x = Math.max(-min_gnome_pos, camera.position.x-speed);
                    camera.target.x = Math.max(-min_gnome_pos, camera.target.x-speed);
                }
                // camera.position.x = Math.max(-min_gnome_pos, camera.position.x-step);
                break;
            case Space_key:
                if(if_gnome_move_on_tick){
                    Space_flip = true
                    sumon_flip = true;
                }else{
                    // sumon_built();
                    sumon_flip = true;
                }

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








function move_built(){
    for ( var i = 0; i < Built_list.length; ++i ){
        Built_list[i].position.z -=1;
        var next_mushroom = false;
        // console.log(MUSHROOM)

        var outside_child
        MUSHROOM.traverse( child => {
            // if (child.isMesh){
            //     if(child.position.equals(head_pos)){
            //         next_mushroom = true;
            //     }
            //     // console.log("hello")
            //     // child.material = material;  
            // }
            Built_list[i].position.y = child.position.y
            if(child.position.equals(Built_list[i].position)){
                next_mushroom = true;
                // console.log("hit")
                // console.log(child.step)
                // child.step-=1;
                // if(child.step ==0){
                //     console.log(child)
                //     // remove(child.children[0].children[0], child.children[0])
                //     console.log(child)
                //     // MUSHROOM.remove(child)
                // }
            
            }
            Built_list[i].position.y = 0.5

        })
        MUSHROOM.remove(outside_child)
        if(-Built_list[i].position.z >= 8 ||next_mushroom){
            // console.log("hello")
            // const myArray = [1, 2, 3, 4, 5];
            // const index = 1
            var del = Built_list.splice(i, 1);
            // console.log(del)
            remove(del[0], BUILT);
            next_mushroom = false

        }
        

        // console.log(Built_list[i].position)
    }

    // BUILT.traverse( child => {
    //     // if (child.isMesh){
    //     //     if(child.position.equals(head_pos)){
    //     //         next_mushroom = true;
    //     //     }
    //     //     // console.log("hello")
    //     //     // child.material = material;  
    //     // }
    //     // if(child.position.equals(head_pos)){
    //     //     next_mushroom = true;
    //     // }
    //     // Built_list[i].position.z -=1;
    //     // if(-Built_list[i].position.z >= 8){
    //     //     console.log("hello")
    //     // }
    //     child.position.z-=0.5
    //     if(-child.position.z >= 8){
    //                 console.log("hello")
    //     }
    // })
}


function gnome_move(delta){
    
    if(Right_flip){
        GNOME.position.x = Math.min(max_gnome_pos, GNOME.position.x+speed); 
        Right_flip = false;
    }
    if(Left_flip){
        GNOME.position.x = Math.max(-min_gnome_pos, GNOME.position.x-speed);
        Left_flip = false
    }
}

function move_tick(delta){
    var deltaTime;
    if (lastTime !== undefined) {
        deltaTime = delta - lastTime;
        // console.log(lastTime)
        // console.log(deltaTime)
        tick += tick_speed * deltaTime / 1000;
        if (last_count != tick.toFixed(0)){
            // console.log("tick")
            last_count = tick.toFixed(0)
            updateGameLogic_main(delta)
        }
        

        
    }
    
    
    
    lastTime = delta
}
var tick
var if_end_cent_var = false;
const interval =  config.game_logic.interval;
function updateGameLogic_main(delta){
    inside_tick += 1
    
    
    // console.log(if_end_cent_var)
    if(!if_end_cent_var){
        gnome_move();
        if_end_cent_var = move_centa(true)
        move_built()
        // console.log(sumon_flip)
        if(sumon_flip && inside_tick % interval == 0){
            sumon_built();
            sumon_flip = false
        }
    }
    else{
        GNOME.position.y = -2
        // lost code
    }
    
   
    if(count <= centipede_config.length.max_length){
        make_part();
        
    }
    // console.log(inside_tick > centipede_config.length.max_length+1 )
    // console.log(inside_tick < centipede_config.length.max_length+1)

    if(inside_tick >= centipede_config.length.max_length+4 && inside_tick <= centipede_config.length.max_length+4){
        // if_end_cent_var = move_head({
            
        //     mushrooms:MUSHROOM,
        //     walls: 7
        // }, HEAD_list[1]) 
        // HEAD_list.push(HEAD_list[0].before.split(HEADS))
        // HEAD_list.push(split(HEAD_list[0], HEAD_list, HEADS))
        // console.log("hello")
        // console.log(HEAD_list)
        // HEAD_list[0].before.split(HEADS)
        
    }

    
}
var count = 1;
var fliper = true
function make_part(index){
    
    // move_head({
    //     mushrooms:WALLS,
    //     walls: 7
    // }, HEAD_list)
    
    if(fliper){
        fliper = if_new(HEAD_list[0], count, HEADS).stop
    }
    
    count+=1;
    // console.log(head_end);
    // console.log(HEAD_list)
    // console.log(HEAD_list)
    

}

function move_centa(index_flip){
    for ( var i = 0; i < HEAD_list.length; ++i ){
        var if_end_cent_var = move_head({
            
            mushrooms:MUSHROOM,
            walls: 7
        }, HEAD_list[i])  
       
        if(if_end_cent_var){
            return true;
        }
    }
    return false
    // console.log(HEAD_list)
   
    
}





// move_head({WALLS}, HEAD_list)



// Hreyfifall
const animate = function (timestamp) {
    

    // var delta = clock.getDelta();
    move_tick(timestamp)

    
    // controls.update();
    renderer.render( scene, camera_top );
    requestAnimationFrame( animate );

   
};
// clock.start()
run();

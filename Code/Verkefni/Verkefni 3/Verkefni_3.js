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

// Skilgreina myndavél og staðsetja hana
const camera = new THREE.PerspectiveCamera( 75, canvas.clientWidth/canvas.clientHeight, 0.1, 1000 );
camera.position.set(0, 1, 3);

// Bæta við músarstýringu
const controls = new THREE.OrbitControls( camera, canvas );

// controls.lookSpeed = 0.1;
// controls.movementSpeed = 10;

var clock = new THREE.Clock(true);

// Skilgreina birtingaraðferð með afbjögun (antialias)
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});

const machine = new THREE.Object3D();
var GNOME
var FLOOR
var WALLS = new THREE.Object3D();
const floor_config = config.machine.structure.floor
const wall_config = config.machine.structure.wall


function make_gnome(){
    const gnome = load_model("./models/gnome.obj", './models/MAT_Character_Gnome_Female_PigTails_0_basecolor.jpg', "./models/MAT_Character_Gnome_Female_PigTails_0_normal.jpg")
    const gnome_config = config.machine.entities.gnome
    gnome.scale.set(gnome_config.length,gnome_config.height,gnome_config.width)
    GNOME = gnome
    // gnome.position.set(1.0,0.0,1.0)
    machine.add(gnome)
}

function if_even(length, width){
    var length_offset = 0.5;
    var width_offset = 0.5;

    if(length % 2 == 0){
        length_offset = 0
    }
    if(width % 2 == 0){
        width_offset = 0;
    }
    return [length_offset, width_offset]
}

function load_tile_texture(){
    
    const offset = if_even(floor_config.length, floor_config.width)
    
    var texture = load_texturev2("./texture/floor_texture/black_tile.png", [floor_config.s_text_ofset*floor_config.length, floor_config.t_text_ofset*floor_config.width], [Math.floor(floor_config.length/2)+offset[0],Math.floor(floor_config.width/2)+offset[1]])
    return texture
}

function make_floor(){
    
    
    // console.log(if_even(floor_config.length, floor_config.width))
    
    
    const texture = load_tile_texture();
    const floor = new THREE.PlaneGeometry( floor_config.length, floor_config.width );
    const planeMaterial = new THREE.MeshPhongMaterial( { map: texture } );
    const plane = new THREE.Mesh( floor, planeMaterial );
    plane.rotation.x = radians(-90)
    plane.position.set(0, 0.0, 0);
    FLOOR = plane
    machine.add(plane)
}

function make_wall_texture(length, height, ticknes){
    const basecolor = load_texturev2("./texture/wall_texture/Plastic_Rough_001_basecolor.jpg", [0.0,0.0], [length,height])
    const ambientOcclusion = load_texturev2("./texture/wall_texture/Plastic_Rough_001_ambientOcclusion.jpg", [0.0,0.0], [length,height])
    // const height_map = load_texturev2("./texture/wall_texture/Plastic_Rough_001_height.png", [0.0,0.0], [length,height])
    const normal = load_texturev2("./texture/wall_texture/Plastic_Rough_001_normal.jpg", [0.0,0.0], [length,height])
    const roughness = load_texturev2("./texture/wall_texture/Plastic_Rough_001_roughness.jpg", [0.0,0.0], [length,height])
    return get_phong(basecolor, ambientOcclusion, normal, roughness)
}

function make_wall(length){
    
    const geometry = new THREE.BoxGeometry(length, wall_config.height, wall_config.thicknes);
    const material = make_wall_texture(length, wall_config.height,1.0)
    const wall = new THREE.Mesh( geometry, material );
    wall.position.y = wall_config.height/2+FLOOR.position.y
    return wall
}

function make_walls(){
    const offset = -0.5
    const offseter = -0.1
    const wall1 = make_wall(floor_config.length+offseter)
    wall1.position.z = (floor_config.length/2+offset )
    WALLS.add(wall1);
    
    const wall2 = make_wall(floor_config.width+offseter)
    wall2.rotation.y = radians(90);
    wall2.position.x = (floor_config.width/2-offset )
    WALLS.add(wall2);

    const wall3 = make_wall(floor_config.width+offseter)
    wall3.rotation.y = radians(90);
    wall3.position.x = -(floor_config.width/2-offset )
    WALLS.add(wall3);

    const wall4 = make_wall(floor_config.length+offseter)
    wall4.position.z = -(floor_config.length/2+offset )
    WALLS.add(wall4);

    machine.add(WALLS)

}

function make_machine(){
    scene.add(machine)
}

// scene.add(gnome);

make_gnome();

make_floor();
make_walls()
make_machine();
// console.log(gnome.position)




// // Búa til tening með Phong áferð (Phong material) og bæta í sviðsnetið
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshPhongMaterial( { color: 0x44aa88 } );
// const cube = new THREE.Mesh( geometry, material );
// cube.position.x += 1;
// scene.add( cube );

// // Búa til kúlu með Phong áferð og bæta í sviðsnetið
// const ballGeometry = new THREE.SphereGeometry( 0.5, 20, 20 );
// const ballMaterial = new THREE.MeshPhongMaterial( { color: 0xaa8844 } );
// const ball = new THREE.Mesh( ballGeometry, ballMaterial );
// ball.position.x += -1;
// scene.add( ball );

// Búa til sléttu með Phong áferð
// const planeGeometry = new THREE.PlaneGeometry( 4, 2 );
// const planeMaterial = new THREE.MeshPhongMaterial( { color: 0xcccccc } );
// const plane = new THREE.Mesh( planeGeometry, planeMaterial );
// plane.rotation.x = -0.5 * Math.PI;
// plane.position.set(0, -0.5, 0);
// scene.add( plane );


// Skilgreina ljósgjafa og bæta honum í sviðsnetið
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(2, 4, 1);
scene.add(light);

// Hreyfifall
const animate = function () {
    requestAnimationFrame( animate );

    controls.update(clock.getDelta());
    renderer.render( scene, camera );
};

animate();
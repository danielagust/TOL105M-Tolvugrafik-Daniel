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

set_data(config);

var MACHINE;
var GNOME
var FLOOR
var WALLS;
var ENTITIES;


function make_machine(){
    var machine = new THREE.Object3D();
    
    FLOOR = make_floor();
    machine.add(FLOOR)
    
    WALLS = make_walls(FLOOR);
    machine.add(WALLS)

    make_entities()
    machine.add(ENTITIES)

    MACHINE = machine
    scene.add(MACHINE)
    
}

function make_entities(){
    var entities = new THREE.Object3D();
    GNOME = make_gnome();

    entities.add(GNOME);
    ENTITIES = entities;

}

// scene.add(gnome);

// make_gnome();


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
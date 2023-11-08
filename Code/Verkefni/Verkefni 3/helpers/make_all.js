
var config;
var floor_config;
var wall_config;
var gnome_config;

var FLOOR;

const wall_text_filename = {
    basecolor:"./texture/wall_texture/Plastic_Rough_001_basecolor.jpg",
    ambientOcclusion:"./texture/wall_texture/Plastic_Rough_001_ambientOcclusion.jpg",
    normal:"./texture/wall_texture/Plastic_Rough_001_normal.jpg",
    roughness:"./texture/wall_texture/Plastic_Rough_001_roughness.jpg"
}

function set_data(json){
    // console.log(json)
    config = json 
    
    floor_config = config.machine.structure.floor
    wall_config = config.machine.structure.wall
    gnome_config = config.machine.entities.gnome
    
}
// console.log(config)





function make_gnome(){
    const gnome = load_model("./models/gnome.obj", './models/MAT_Character_Gnome_Female_PigTails_0_basecolor.jpg', "./models/MAT_Character_Gnome_Female_PigTails_0_normal.jpg")
    
    gnome.scale.set(gnome_config.length,gnome_config.height,gnome_config.width)
    var offset_2 = if_evenv2(floor_config.length, floor_config.width) 
    gnome.position.z = (Math.round(floor_config.length/2) +offset_2[0]-0.0)
    // gnome.position.z = 2.0
    gnome.rotation.y = radians(180)
    // GNOME = gnome
    // gnome.position.set(1.0,0.0,1.0)
    // machine.add(gnome)
    return gnome
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
function if_even_invers(length, width){
    var length_offset = 0.0;
    var width_offset = 0.0;

    if(length % 2 == 0){
        length_offset = 0.5
    }
    if(width % 2 == 0){
        width_offset = 0.5;
    }
    return [length_offset, width_offset]
}

function if_evenv2(length, width){
    var length_offset = -0.0;
    var width_offset = -0.0;
    console.log(length_offset % 2)

    if(length % 2 == 0){
        length_offset = Math.sin(length)
        console.log(length_offset % 2)
    }
    if(width % 2 == 0){
        width_offset = -1;
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
    
    // console.log(plane.position, "hello")
    
    // // FLOOR = plane
    // // machine.add(plane)
    // console.log(plane.position, "hello")
    return plane;
}

function get_phong_side(length, height,thicknes, has_alpha, alpha){
    var result = [];
    var awnser = make_texture_side(thicknes, height, has_alpha, wall_text_filename);
    result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    
    var awnser = make_texture_side(length,thicknes, has_alpha, wall_text_filename);
    result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    
    var awnser = make_texture_side(length, height, has_alpha, wall_text_filename);
    result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    if(has_alpha){
        for ( var i = 0; i < result.length; ++i ){
            result[i].transparent = true;
            result[i].opacity = alpha
        }
    }
    
    return result;
}

// function get_wall_side(length, height, has_alpha){
//     var result = [];
//     var awnser = make_texture_side(wall_config.thicknes, height, has_alpha, wall_text_filename);
//     result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
//     result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    
//     var awnser = make_texture_side(length,wall_config.thicknes, has_alpha, wall_text_filename);
//     result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
//     result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    
//     var awnser = make_texture_side(length, height, has_alpha, wall_text_filename);
//     result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
//     result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
//     if(has_alpha){
//         for ( var i = 0; i < result.length; ++i ){
//             result[i].transparent = true;
//             result[i].opacity = wall_config.alpha
//         }
//     }
    
//     return result;
// }

function make_wall_texture(length, height, has_alpha){
    // const basecolor = load_texturev2("./texture/wall_texture/Plastic_Rough_001_basecolor.jpg", [0.0,0.0], [length,height])
    // // const basecolor = [
    // //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_basecolor.jpg", [0.0,0.0], [length,height]),
    // //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_basecolor.jpg", [0.0,0.0], [length,height]),
    // //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_basecolor.jpg", [0.0,0.0], [length,height])
        
    // // ]
    // const ambientOcclusion = load_texturev2("./texture/wall_texture/Plastic_Rough_001_ambientOcclusion.jpg", [0.0,0.0], [length,height])
    // // const height_map = load_texturev2("./texture/wall_texture/Plastic_Rough_001_height.png", [0.0,0.0], [length,height])
    // const normal = load_texturev2("./texture/wall_texture/Plastic_Rough_001_normal.jpg", [0.0,0.0], [length,height])
    // // const normal = [
    // //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_normal.jpg", [0.0,0.0], [length,height])
    // // ]
    // const roughness = load_texturev2("./texture/wall_texture/Plastic_Rough_001_roughness.jpg", [0.0,0.0], [length,height])
    // // const roughness = [
    // //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_roughness.jpg", [0.0,0.0], [length,height]),
    // //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_roughness.jpg", [0.0,0.0], [length,height]),
    // //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_roughness.jpg", [0.0,0.0], [length,height])
    // // ]
    // const alpha_map = load_texturev2("", [0.0,0.0], [length,height])

    // var result = [];
    result = get_phong_side(length, height,wall_config.thicknes, has_alpha, wall_config.alpha)
    //     // console.log(result)
    return result
    
    // if (has_alpha){

    //     var awnser = make_wall_texture_side(length, height, has_alpha);
    //     // result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    //     return get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map)
    // }else{
    //     result = get_wall_side(length, height, has_alpha)
    //     // console.log(result)
    //     return result
    //     return get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map)
    // }
    
}

function make_wall(length, has_alpha){
    
    const geometry = new THREE.BoxGeometry(length, wall_config.height, wall_config.thicknes);
    const material = make_wall_texture(length, wall_config.height, has_alpha)
    const wall = new THREE.Mesh( geometry, material );
    wall.position.y = wall_config.height/2+FLOOR.position.y
    return wall
}

function make_walls(floor){
    FLOOR = floor
    var offset_2 = if_even_invers(floor_config.length, floor_config.width) 

    const walls = new THREE.Object3D();
    const offset = -0.5
    const offseter = -wall_config.thicknes
    const wall1 = make_wall(floor_config.length, true)
    console.log(wall1.position)
    wall1.position.z = (Math.ceil(floor_config.length/2) -offset_2[0]-offseter/2)
    console.log((floor_config.length/2) )
    console.log(wall1.position, "wall1")
    
    // wall1.
    walls.add(wall1);
    
    const wall2 = make_wall(floor_config.width, false)
    wall2.rotation.y = radians(90);
    wall2.position.x = (Math.ceil(floor_config.width/2) + offset -offseter/2)
    console.log(wall2.position, "wall2")
    walls.add(wall2);

    const wall3 = make_wall(floor_config.width, false)
    wall3.rotation.y = radians(90);
    wall3.position.x = -(Math.ceil(floor_config.width/2) + offset-offseter/2)
    console.log(wall3.position, "wall3")
    walls.add(wall3);

    const wall4 = make_wall(floor_config.length, false)
    wall4.position.z = -(Math.ceil(floor_config.length/2) -offset_2[0] -offseter/2)
    console.log(wall4.position, "wall4")
    walls.add(wall4);
    return walls; 

    

}

function make_feet(floor){
    const feets = new THREE.Object3D();

    // feet =
}
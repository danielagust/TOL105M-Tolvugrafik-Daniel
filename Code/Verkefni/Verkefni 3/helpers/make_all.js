
var config;
var floor_config;
var wall_config;
var gnome_config;

var FLOOR;

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
    gnome.position.z = (floor_config.length/2)
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
    // FLOOR = plane
    // machine.add(plane)
    return plane;
}
function make_wall_texture_side(length, width, has_alpha){
    var result = {};
    result.basecolor = load_texturev2("./texture/wall_texture/Plastic_Rough_001_basecolor.jpg", [0.0,0.0], [length,height])
  
    result.ambientOcclusion = load_texturev2("./texture/wall_texture/Plastic_Rough_001_ambientOcclusion.jpg", [0.0,0.0], [length,height])
    // const height_map = load_texturev2("./texture/wall_texture/Plastic_Rough_001_height.png", [0.0,0.0], [length,height])
    result.normal = load_texturev2("./texture/wall_texture/Plastic_Rough_001_normal.jpg", [0.0,0.0], [length,height])
    
    result.roughness = load_texturev2("./texture/wall_texture/Plastic_Rough_001_roughness.jpg", [0.0,0.0], [length,height])
    
    result.alpha_map = load_texturev2("./texture/wall_texture/Plastic_Rough_001_alpha.jpg", [0.0,0.0], [length,height])
    return result;
}

function make_wall_texture(length, height, has_alpha){
    const basecolor = load_texturev2("./texture/wall_texture/Plastic_Rough_001_basecolor.jpg", [0.0,0.0], [length,height])
    // const basecolor = [
    //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_basecolor.jpg", [0.0,0.0], [length,height]),
    //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_basecolor.jpg", [0.0,0.0], [length,height]),
    //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_basecolor.jpg", [0.0,0.0], [length,height])
        
    // ]
    const ambientOcclusion = load_texturev2("./texture/wall_texture/Plastic_Rough_001_ambientOcclusion.jpg", [0.0,0.0], [length,height])
    // const height_map = load_texturev2("./texture/wall_texture/Plastic_Rough_001_height.png", [0.0,0.0], [length,height])
    const normal = load_texturev2("./texture/wall_texture/Plastic_Rough_001_normal.jpg", [0.0,0.0], [length,height])
    // const normal = [
    //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_normal.jpg", [0.0,0.0], [length,height])
    // ]
    const roughness = load_texturev2("./texture/wall_texture/Plastic_Rough_001_roughness.jpg", [0.0,0.0], [length,height])
    // const roughness = [
    //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_roughness.jpg", [0.0,0.0], [length,height]),
    //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_roughness.jpg", [0.0,0.0], [length,height]),
    //     load_texturev2("./texture/wall_texture/Plastic_Rough_001_roughness.jpg", [0.0,0.0], [length,height])
    // ]
    const alpha_map = load_texturev2("", [0.0,0.0], [length,height])
    if (has_alpha){
        return get_phong(basecolor, ambientOcclusion, normal, roughness, alpha_map)
    }else{
        return get_phong(basecolor, ambientOcclusion, normal, roughness, null)
    }
    
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

    const walls = new THREE.Object3D();
    const offset = 0.5
    const offseter = -0.1
    const wall1 = make_wall(floor_config.length+offseter, false)
    wall1.position.z = (floor_config.length/2+offset )
    // wall1.
    walls.add(wall1);
    
    const wall2 = make_wall(floor_config.width+offseter, false)
    wall2.rotation.y = radians(90);
    wall2.position.x = (floor_config.width/2-offset )
    walls.add(wall2);

    const wall3 = make_wall(floor_config.width+offseter, false)
    wall3.rotation.y = radians(90);
    wall3.position.x = -(floor_config.width/2-offset )
    walls.add(wall3);

    const wall4 = make_wall(floor_config.length+offseter, false)
    wall4.position.z = -(floor_config.length/2+offset )
    walls.add(wall4);
    return walls; 

    

}
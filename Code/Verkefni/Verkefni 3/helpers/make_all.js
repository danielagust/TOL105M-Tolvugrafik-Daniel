
// var config;
// var floor_config;
// var wall_config;
// var gnome_config;
// var feet_config;

var FLOOR;
var start;

const feet_text_filename = {
    basecolor:"./texture/feet_texture/Wood_027_basecolor.jpg",
    ambientOcclusion:"./texture/feet_texture/Wood_027_ambientOcclusion.jpg",
    normal:"./texture/feet_texture/Wood_027_normal.jpg",
    roughness:"./texture/feet_texture/Wood_027_roughness.jpg"
}

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
    feet_config = config.machine.structure.feet
    gnome_config = config.machine.entities.gnome
    centipede_config = config.machine.entities.centipede
    // console.log(feet_config)
    
    
    
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
    // console.log(length_offset % 2)

    if(length % 2 == 0){
        length_offset = Math.sin(length)
        // console.log(length_offset % 2)
    }
    if(width % 2 == 0){
        width_offset = -1;
    }
    return [length_offset, width_offset]
}

function load_tile_texture(file_name){
    
    const offset = if_even(floor_config.length, floor_config.width)
    
    var texture = load_texturev2("./texture/floor_texture/black_tile.png", [floor_config.s_text_ofset*floor_config.length, floor_config.t_text_ofset*floor_config.width], [Math.floor(floor_config.length/2)+offset[0],Math.floor(floor_config.width/2)+offset[1]])
    return texture
}

function make_floor_texture(){
    

    var Material = [];
    var texture = load_tile_texture();
    // Material.push(new THREE.MeshPhongMaterial( { map: texture } ));
    var awnser = make_texture_side(floor_config.length, floor_config.height, false, wall_text_filename)
    // console.log(texture)
    Material.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map));
    Material.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map));
    Material.push(get_phong(texture, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map)); // top
    Material.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map));
    Material.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map));
    Material.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map));
    return Material
}

function make_floor(){
    
    
    // console.log(if_even(floor_config.length, floor_config.width))
    
    
    
    const floor = new THREE.BoxGeometry( floor_config.length, floor_config.height,floor_config.width );
    const Material = make_floor_texture();
    
    const plane = new THREE.Mesh( floor, Material );
    // plane.rotation.x = radians(-90)
    plane.position.y = -floor_config.height/2
    
    // console.log(plane.position, "hello")
    
    // // FLOOR = plane
    // // machine.add(plane)
    // console.log(plane.position, "hello")
    return plane;
}

function get_phong_side(length, height,thicknes, alpha, has_alpha, file_name){
    var result = [];
    var awnser = make_texture_side(thicknes, height, has_alpha, file_name);
    result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    
    var awnser = make_texture_side(length,thicknes, has_alpha, file_name);
    result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    result.push(get_phong(awnser.basecolor, awnser.ambientOcclusion, awnser.normal, awnser.roughness, awnser.alpha_map))
    
    var awnser = make_texture_side(length, height, has_alpha, file_name);
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
    result = get_phong_side(length, height,wall_config.thicknes, wall_config.alpha, has_alpha, wall_text_filename)
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
    // console.log(wall1.position)
    wall1.position.z = (Math.ceil(floor_config.length/2) -offset_2[0]-offseter/2)
    // console.log((floor_config.length/2) )
    // console.log(wall1.position, "wall1")
    
    // wall1.
    walls.add(wall1);
    
    const wall2 = make_wall(floor_config.width, false)
    wall2.rotation.y = radians(90);
    wall2.position.x = (Math.ceil(floor_config.width/2) + offset -offseter/2)
    // console.log(wall2.position, "wall2")
    walls.add(wall2);

    const wall3 = make_wall(floor_config.width, false)
    wall3.rotation.y = radians(90);
    wall3.position.x = -(Math.ceil(floor_config.width/2) + offset-offseter/2)
    // console.log(wall3.position, "wall3")
    walls.add(wall3);

    const wall4 = make_wall(floor_config.length, false)
    wall4.position.z = -(Math.ceil(floor_config.length/2) -offset_2[0] -offseter/2)
    // console.log(wall4.position, "wall4")
    walls.add(wall4);
    return walls; 

    

}

function make_feet_texture(){
    result = get_phong_side(feet_config.length, feet_config.height,feet_config.thicknes, 1.0, false, feet_text_filename)
    //     // console.log(result)
    return result
}

function make_feet(pos){
    const geometry = new THREE.BoxGeometry(feet_config.length, feet_config.height, feet_config.width);
    const material = make_feet_texture();
    const feet = new THREE.Mesh( geometry, material );
    
    // console.log(pos)
    new_pos(feet.position, pos)
    return feet
}

function make_feets(floor){
    const feets = new THREE.Object3D();
    const floor_length = floor_config.length/2+wall_config.thicknes/2
    // const floor_height = -(feet_config.height/2-wall_config.height/2)+wall_config.height/2
    const floor_height = -(feet_config.height/2-wall_config.height)-floor_config.height/2
    const floor_width = floor_config.width/2+wall_config.thicknes/2
    
    

    var feet = make_feet(new THREE.Vector3(floor_length,floor_height,floor_width));
    feets.add(feet);

    var feet = make_feet(new THREE.Vector3(-floor_length,floor_height,floor_width));
    feets.add(feet);

    var feet = make_feet(new THREE.Vector3(-floor_length,floor_height,-floor_width));
    feets.add(feet);

    var feet = make_feet(new THREE.Vector3(floor_length,floor_height,-floor_width));
    feets.add(feet);
    return feets;
}


function make_head(){
    const geometry = new THREE.SphereGeometry( centipede_config.head.radius, 32, 16 );
    const texture = load_texturev1("./texture/centipede_texture/centipede_head.png")
    const material = new THREE.MeshPhongMaterial( { map: texture } )
    const head = new THREE.Mesh( geometry, material );
    head.position.y += 1/2
    return head;

}

function copy(list){
    var temp = [];
    for ( var i = 0; i < list.length; ++i ){
        temp.push(list[i])
    }
    return temp;
}

function make_body(body_node_head_end,index, bodyes, pos){
    const geometry = new THREE.SphereGeometry( centipede_config.head.radius, 32, 16 );
    const texture = load_texturev1("./texture/centipede_texture/centipede_body.png")
    const material = new THREE.MeshPhongMaterial( { map: texture } )
    const body = new THREE.Mesh( geometry, material );
    body.position.set(pos.x, 0.0, pos.z)
    // console.log(pos)
    body.position.y += 1/2
    bodyes.add(body);
    var now_moves = body_node_head_end.moves;
    // now_moves.push("R");
    var new_moves =  copy(now_moves);
    new_moves.push("R");
    // new_moves.push("R");
    console.log(new_moves)
    const before_part = new Obj_Body(body, centipede_config.body.radius, false, null, new_moves, index, index);
    
    body_node_head_end.insertEnd(before_part);
    // console.log(body_node_head_end)
    
    // body_node_head.body_node_head_end.next = body_node_head.body_node_head_next;


    return body_node_head_end

}



function make_centipede(mushrooms){
    const bodyes = new THREE.Object3D();
    const head = make_head();
    

    head.position.x = -floor_config.length/2+0.5 // fast
    head.position.z = -floor_config.width/2+1 // fast
    start = head.position.clone()
    // const start = new THREE.Vector3(-floor_config.length/2+0.5, 0.5,-floor_config.width/2+1)
    // console.log(start, "start")   

    bodyes.add(head);
    var body_node_head_start = new Obj_Body(head, centipede_config.head.radius, true, null, [], 0, 0);
    var body_node_head_step = {
        body_node_head_end:body_node_head_start
    }
    var body_node_head_end = body_node_head_start;
    var body_node_head_next = body_node_head_start;
    
    // move_head({
    //             mushrooms:mushrooms,
    //             walls: 7
    //         }, body_node_head_start)

    // var flip = true;
    // for ( var i = 1; i < centipede_config.length.max_length; ++i ){
    //     const random = Math.random();
    //     const tempo = centipede_config.random.change_length >= random
    //     if(tempo && centipede_config.length.min_length <= i){
    //         // console.log("hello_inn", i)
    //         // console.log("random", random);
    //         // console.log("length",centipede_config.length.min_length <= i)
    //         flip = false
    //         break;
    //     }
    //     else{ // code here

    //         // console.log("hello_out", i)
    //     }
    //     if(flip){
            
    //         // console.log("flip")
            
    //     }
    //     // console.log("hello cent")
    //     // body_node_head_step = make_body(body_node_head_step, i, bodyes, start)
    //     // move_head({
    //     //     mushrooms:mushrooms,
    //     //     walls: 7
    //     // }, body_node_head_start)
        

        
    // }
    // console.log(if_new(body_node_head_start, 1, bodyes));
    // console.log(body_node_head_start)
    // while(centipede_config.length.max_length >= count){
        
    //     // if(centipede_config.length.max_length > count){
    //     //     break;
    //     // }
    //     count
    // }
    
    
    // var temp = body_node_head.split(bodyes)

    // console.log(temp)
    
    // bodyes.remove(body)
    return {
        head:body_node_head_start,
        mesh: bodyes
    }
    return bodyes;
}
// var flip_out = true;

function if_new(body_node_head_start, index, bodyes){
    
    const random = Math.random();
    const tempo = centipede_config.random.change_length >= random
    // var body_node_head_step = body_node_head_start;
    if(tempo && centipede_config.length.min_length <= index){
        // console.log("hello_in", index)
        
        
    }
    else{ // code here

        // console.log("hello_out", index)
        // body_node_head_step = make_body(body_node_head_step, index, bodyes, start)
    }
    make_body(body_node_head_start, 0, bodyes, start)
    return {
        mesh: bodyes
    }
    
}
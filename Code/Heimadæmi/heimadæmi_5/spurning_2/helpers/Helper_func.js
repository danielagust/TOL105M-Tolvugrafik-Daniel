import obj_Vector from "./obj_vector.js";


// import config from "../config.json" assert { type: 'json' };
import obj_Size from "./obj_Size.js";
// import obj_Fish from "../obj_Fish.js";
import obj_Position from "./obj_Position.js";
import obj_Direction from "./obj_Direction.js";

Number.isInteger = Number.isInteger || function(value) {
    return typeof value === 'number' && 
      isFinite(value) && 
      Math.floor(value) === value;
  };

if (!Number.MAX_SAFE_INTEGER) {
    Number.MAX_SAFE_INTEGER = 9007199254740991; // Math.pow(2, 53) - 1;
}
Number.isSafeInteger = Number.isSafeInteger || function (value) {
   return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
};


export function is_float(value){
    return Number(value) === value && value % 1 !== 0;
}

export function is_integer(value){
    return Number.isSafeInteger(value);
}

export function angle_to_degre(angle){
    return angle * 180/Math.PI;
}
var then = 0;
export function new_speed(now){
    // Convert to seconds
    now *= 0.001;
    // Subtract the previous time from the current time
    var deltaTime = now - then;
    if (deltaTime != deltaTime){ // check if NAN
        return 0.0;
    }
    // Remember the current time for the next frame.
    then = now;
   //  console.log("deltaTime new ", deltaTime);

    return deltaTime;
}

export function get_speed(v){
    var temp = 0;
    for ( var i = 0; i < v.length; ++i ){
        temp += Math.pow(v[i],2);
    }
    return Math.sqrt(temp);
} 

export function vec3_to_Vector(v){
    return new obj_Vector(v[0], v[1], v[2]);
}

export function vec3_to_Dir(v){
    return new obj_Direction(v[0], v[1], v[2]);
}

export function vec3_to_Pos(v){
    return new obj_Position(v[0], v[1], v[2]);
}

export function transposeV(v){
    // var array = v;
    // return array.map((_, colIndex) => array.map(row => row[colIndex]));
    if (v.length[0] == 1){

    }
    
    for ( var i = 0; i < v.length; ++i ) {
        result.push( [v[i]] );
        
    }
    result.matrix = true;
    for (let i = 0; i < mat.length; i++) {
        for (let j = 0; j < i; j++) {
            const tmp = mat[i][j];
            mat[i][j] = mat[j][i];
            mat[j][i] = tmp;
        }
    }
    return mat
    return matrix.reduce((prev, next) => next.map((item, i) =>
    (prev[i] || []).concat(next[i])
    ), []);
    return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) { return r[c]; });
    });
    return result;
}

function transpose( m )
{
    if ( !m.matrix ) {
        return "transpose(): trying to transpose a non-matrix";
    }

    var result = [];
    for ( var i = 0; i < m.length; ++i ) {
        result.push( [] );
        for ( var j = 0; j < m[i].length; ++j ) {
            result[i].push( m[j][i] );
        }
    }

    result.matrix = true;

    return result;
}

function make_size(fish_size_body, fish_size_tail, fish_size_fin){
    var random_fish_size_body = []
    random_fish_size_body.push( Math.random() * (fish_size_body.length.length_max - fish_size_body.length.length_min) + fish_size_body.length.length_min)
    random_fish_size_body.push( Math.random() * (fish_size_body.height.height_max - fish_size_body.height.height_min) + fish_size_body.height.height_min)
    random_fish_size_body.push( Math.random() * (fish_size_body.width.width_max - fish_size_body.width.width_min) + fish_size_body.width.width_min)

    var random_fish_size_tail = []
    random_fish_size_tail.push( Math.random() * (fish_size_tail.length.length_max - fish_size_tail.length.length_min) + fish_size_tail.length.length_min)
    random_fish_size_tail.push( Math.random() * (fish_size_tail.height.height_max - fish_size_tail.height.height_min) + fish_size_tail.height.height_min)
    random_fish_size_tail.push( Math.random() * (fish_size_tail.width.width_max - fish_size_tail.width.width_min) + fish_size_tail.width.width_min)

    var random_fish_size_fin = []
    random_fish_size_fin.push( Math.random() * (fish_size_fin.length.length_max - fish_size_fin.length.length_min) + fish_size_fin.length.length_min)
    random_fish_size_fin.push( Math.random() * (fish_size_fin.height.height_max - fish_size_fin.height.height_min) + fish_size_fin.height.height_min)
    random_fish_size_fin.push( Math.random() * (fish_size_fin.width.width_max - fish_size_fin.width.width_min) + fish_size_fin.width.width_min)
    
    return {random_fish_size_body, random_fish_size_tail, random_fish_size_fin}
}

function make_pos(fish_pos){
    var random_fish_pos = []

    random_fish_pos.push(Math.random() * (fish_pos.x.x_max -fish_pos.x.x_min) + fish_pos.x.x_min);
    random_fish_pos.push(Math.random() * (fish_pos.y.y_max -fish_pos.y.y_min) + fish_pos.y.y_min)
    random_fish_pos.push (Math.random() * (fish_pos.z.z_max -fish_pos.z.z_min) + fish_pos.z.z_min)
   
    return random_fish_pos;
}

function make_pos_pyr(fish_pos_pyr){


    var random_fish_pos_pyr = []

    random_fish_pos_pyr.push(Math.random() * (fish_pos_pyr.r.r_max -fish_pos_pyr.r.r_min) + fish_pos_pyr.r.r_min);
    random_fish_pos_pyr.push(Math.random() * (fish_pos_pyr.pitch.pitch_max -fish_pos_pyr.pitch.pitch_min) + fish_pos_pyr.pitch.pitch_min)
    random_fish_pos_pyr.push (Math.random() * (fish_pos_pyr.yaw.yaw_max -fish_pos_pyr.yaw.yaw_min) + fish_pos_pyr.yaw.yaw_min)
    console.log(random_fish_pos_pyr);
    var temp = new obj_Direction(1.0,0.0,0.0)
    temp.pyr_direction3d = random_fish_pos_pyr;
    var random_fish_pos = vec3_to_Pos(temp.direction3d_to_vec)
    return random_fish_pos;
}

function make_dir_set(fish_dir_set){
    var random_fish_dir_set = [];

    random_fish_dir_set.push(Math.random() * (fish_dir_set.x.x_max -fish_dir_set.x.x_min) + fish_dir_set.x.x_min);
    random_fish_dir_set.push(Math.random() * (fish_dir_set.y.y_max -fish_dir_set.y.y_min) + fish_dir_set.y.y_min)
    random_fish_dir_set.push (Math.random() * (fish_dir_set.z.z_max -fish_dir_set.z.z_min) + fish_dir_set.z.z_min)
    // console.log(random_fish_dir_set)
   
    return random_fish_dir_set;

}

// function make_dir_allowed(fish_dir_allowed){
//     var random_fish_dir_allowed = [];

//     random_fish_dir_allowed.push(Math.random() * (fish_dir_allowed.pitch.pitch_max -fish_dir_allowed.pitch.pitch_min) + fish_dir_allowed.pitch.pitch_min);
//     random_fish_dir_allowed.push(Math.random() * (fish_dir_allowed.yaw.yaw_max -fish_dir_allowed.yaw.yaw_min) + fish_dir_allowed.yaw.yaw_min)
    
//     console.log(random_fish_dir_allowed)
   
//     return random_fish_dir_allowed;

// }
export function make_fishs(amount, gl, program){
    const fish_size_body = config.fish.size.size_body
    const fish_size_tail = config.fish.size.size_tail
    const fish_size_fin = config.fish.size.size_fin

    // const fish_pos = config.fish.pos;
    const fish_pos = config.fish.pos;
    const fish_pos_pyr = config.fish.pos_pyr;

    const fish_dir_set = config.fish.dir_set;

    // const fish_dir_allowed = config.fish.dir_alowed;
    // console.log(fish_pos);

    var fishs = []
    for ( var i = 0; i < amount; ++i ){
        // make size random
        const random_fish_size = make_size(fish_size_body, fish_size_tail, fish_size_fin);
        const random_fish_size_body = random_fish_size.random_fish_size_body;
        const random_fish_size_tail = random_fish_size.random_fish_size_tail;
        const random_fish_size_fin = random_fish_size.random_fish_size_fin;

        // make size obj
        const size_body = new obj_Size(random_fish_size_body[0],random_fish_size_body[1], random_fish_size_body[2]);
        const size_tail = new obj_Size(random_fish_size_tail[0],random_fish_size_tail[1], random_fish_size_tail[2]);
        const size_fin = new obj_Size(random_fish_size_fin[0],random_fish_size_fin[1], random_fish_size_fin[2]);  
        
        // make pos random
        make_pos_pyr(fish_pos_pyr);
        const random_fish_pos = make_pos(fish_pos);

        //make pos obj
        var fish_pos_random = new obj_Position(random_fish_pos[0], random_fish_pos[1], random_fish_pos[2]);

        //make dir_set random
        const random_fish_dir_set = make_dir_set(fish_dir_set);
        
        // make dir_set obj
        var fish_dir_set_random = new obj_Direction(random_fish_dir_set[0], random_fish_dir_set[1], random_fish_dir_set[2])

        // // make dir_allowed random
        // const random_fish_dir_allowed =  make_dir_allowed(fish_dir_allowed)

        // var size_body = new obj_Size(0.5,0.2,0.0); //new obj_Size(0.5,0.2,0.0);
        // var size_tail = new obj_Size(0.15,0.15,0.0); //new obj_Size(0.15,0.15,0.0);
        // var size_fin = new obj_Size(0.1,0.02,0.0); //new obj_Size(0.1,0.02,0.0);

        // var fish_pos_random = new obj_Position(0.0,0.0,0.0);
        // var fish_dir_set_random = new obj_Direction(1.0,1.0,1.0)


        fishs.push(new obj_Fish([size_body,size_tail,size_fin], 2.0, fish_pos_random, fish_dir_set_random, 0.2)) 
        // console.log(fishs);
        fishs[i].set_webstuff(gl, program)
    }
    
    return fishs
}

export function render_fishs(fishs, mv, deltaTime){
    for ( var i = 0; i < fishs.length; ++i ){
        fishs[i].render(mv, deltaTime)
    }
}

export function move_fish(fishs, amount){
    for ( var i = 0; i < fishs.length; ++i ){
        var v = add(fishs[i].pos.position3d_to_vec, (scale(amount,normalize(fishs[i].dir.direction3d_to_vec))));
        // v = scale(amount,v)
        fishs[i].pos = vec3_to_Pos(v);
    }
    
    // console.log(fishs[0].dir)*


    
}
export function middle_point(fishs){
    var pos_x = 0;
    var pos_y = 0;
    var pos_z = 0;

    for ( var i = 0; i < fishs.length; ++i ){
        pos_x += fishs[i].pos.x 
        pos_y += fishs[i].pos.y 
        pos_z += fishs[i].pos.z 
    }  
    
    // var pos = 
    return new obj_Position(pos_x/fishs.length, pos_y/fishs.length, pos_z/fishs.length );
}

export function distand(pos1, pos2){
    var temp = 0;
    // var temp2 = 0;
    
    temp += Math.pow(pos2.x -pos1.x,2);
    temp += Math.pow(pos2.y -pos1.y,2);
    temp += Math.pow(pos2.z -pos1.z,2);
    
        
    
    return Math.sqrt(temp);
}

export function get_closest(fish, fishs){
    var max_dis = 0;
    var curr_closest;
    for ( var i = 0; i < fishs.length; ++i ){
        const dis = distand(fish.pos, fishs[i].pos)
        if(dis >max_dis){
            max_dis = dis;
            curr_closest = fishs[i]
        }
        
    }
    
    return curr_closest;
}

export function set_closest(fishs){
    for ( var i = 0; i < fishs.length; ++i ){
        const temp = get_closest(fishs[i], fishs)
        fishs[i].closest = temp
        fishs[i].distand_to_closest = distand(fishs[i].pos, temp.pos)
        fishs[i].away_from_closest = (get_dir(temp.pos, fishs[i].pos))
    }
}

export function distand_from_point(fishs){
    var pos = middle_point(fishs)
    for ( var i = 0; i < fishs.length; ++i ){
        fishs[i].distand = distand(fishs[i].pos, pos)
        // const temp =  add(fishs[i].pos.position3d_to_vec, pos.position3d_to_vec)
        fishs[i].to_middlepoint = (get_dir(fishs[i].pos, pos))
        
    }
    // console.log(fishs[0].distand)

}

export function get_dir(pos1, pos2){
    return vec3_to_Dir(subtract(pos2.position3d_to_vec, pos1.position3d_to_vec))
}

export function dived_vector(v, d){
    return scale(1/d,v)

}


export function add_muliple(v){
    var temp = vec3();
    for ( var i = 0; i < v.length; ++i ){
        temp = add(temp, v[i]);
    }
    return temp;
}

// var away_from_closest_weight = config.fish.away_from_closest_weight;
// var middle_weight = config.fish.middle_weight;
// var dir_weight = config.fish.dir_weight;

export function config_changer(evtobj,id){
    var target = evtobj.target || evtobj.srcElement;
    if (target.id == "change_away_from_closest_weight_button"){
        if(Helper.is_integer(Number(document.getElementById("change_away_from_closest_weight_input").value))){
            away_from_closest_weight = (Number(document.getElementById("change_away_from_closest_weight_input").value));
        }
    }
    if (target.id == "change_middle_weight_button"){
        if(Helper.is_integer(Number(document.getElementById("change_middle_weight_input").value))){
            middle_weight = (Number(document.getElementById("change_middle_weight_input").value));
        }
    }
    if (target.id == "change_dir_weight_button"){
        if(Helper.is_integer(Number(document.getElementById("change_dir_weight_input").value))){
            dir_weight = (Number(document.getElementById("change_dir_weight_input").value));
        }
    }
}
export function find_weighted_average(fishs){
    // const away_from_closest_weight = config.fish.away_from_closest_weight;
    // const middle_weight = config.fish.middle_weight;
    // const dir_weight = config.fish.dir_weight;
    var weight = [];
    var temp_all = [];
    const all = away_from_closest_weight+ middle_weight+dir_weight
    for ( var i = 0; i < fishs.length; ++i ){
        // const temp_all_away_from_closest = fishs[i].away_from_closest;
        temp_all.push(scale(away_from_closest_weight, fishs[i].away_from_closest.direction3d_to_vec))
        temp_all.push(scale(middle_weight, fishs[i].to_middlepoint.direction3d_to_vec));
        temp_all.push(scale(dir_weight, fishs[i].dir.direction3d_to_vec));
        // add_muliple(temp_all);
        const temp_added = add_muliple(temp_all);
        // weight.push(vec3_to_Dir(dived_vector(temp_added, 3)))
        fishs[i].dir = vec3_to_Dir(normalize(dived_vector(temp_added, all)));
        // console.log(add_muliple(temp_all))
    }
    // console.log(weight)
}

export function negateM3(m){
    var m2 = [
        vec3( -1,  0.0,  0.0 ),
        vec3(  0.0, -1,  0.0 ),
        vec3(  0.0,  0.0, -1 )
    ];
    m2.matrix = true;
    return mult(m2,m);
}


export function negateM4(m){
    var m2 = [
        vec4( -1, 0.0,  0.0,   0.0 ),
        vec4( 0.0,  -1, 0.0,   0.0 ),
        vec4( 0.0,  0.0,  -1,  0.0 ),
        vec4( 0.0,  0.0,  0.0,  -1 )
    ];
    m2.matrix = true;
    return mult(m2,m);
}

export function if_end(fishs){
    for ( var i = 0; i < fishs.length; ++i ){
        if(fishs[i].pos.radius>= config.fish_tank.radius){
            
            // if (fishs[i].has_been_hit){
            //     var temp = negate(fishs[i].dir.direction3d_to_vec)
            //     var temp = negate(fishs[i].dir.direction3d_to_vec)
            //     // temp = add(temp, scale(-(config.fish_tank.radius-0.5), vec3(0.0,0.0,0.0)))
            //     fishs[i].has_been_hit = false
            // }
            // else{
            //     fishs[i].has_been_hit = true
            //     var temp = negate(fishs[i].dir.direction3d_to_vec)
            // }
            var temp = negate(fishs[i].dir.direction3d_to_vec)
            fishs[i].dir = vec3_to_Dir(temp);
            
            
            
        }
        // fail save
        if(fishs[i].pos.radius>= config.fish_tank.radius+1){
            fishs[i].pos = new obj_Position(0.0,0.0,0.0)
        }
    }
    
}
export function if_endv2(fishs){
    for ( var i = 0; i < fishs.length; ++i ){
        var temp = negate(fishs[i].dir.direction3d_to_vec)
        if(fishs[i].pos.x>= config.fish_tank.length &&fishs[i].pos.x<= -config.fish_tank.length ){
            fishs[i].dir = vec3_to_Dir(temp);
            // fishs[i].dir.x = -fishs[i].dir.x
        }
        if(fishs[i].pos.y>= config.fish_tank.height &&fishs[i].pos.y<= -config.fish_tank.height ){
            fishs[i].dir = vec3_to_Dir(temp);
            // fishs[i].dir.y = -fishs[i].dir.y
        }
        
        if(fishs[i].pos.z>= config.fish_tank.width &&fishs[i].pos.z<= -config.fish_tank.width ){
            fishs[i].dir = vec3_to_Dir(temp);
            // fishs[i].dir.z = -fishs[i].dir.z
        }
        // fail save
        if(fishs[i].pos.radius>= config.fish_tank.radius+1){
            fishs[i].pos = new obj_Position(0.0,0.0,0.0)
        }
    }
    
}

// function is_floatv2(e){
//     const n = Number(e)

//     if (Number.isNaN(n)) {
        
//         return false
//         console.log(e + " :letter")
//     }

//     if (Number.isInteger(n)) {
        
//         return false
//         console.log(e + " :integer")
//     }
//     return true;
//     console.log(e + " :non-integer number")
// }

// function is_floatv3(input){
//     if(!Number.isInteger(input)) {
//         if(Number.isSafeInteger(input)  ){
//             // console.log("hello", true);
//             return true;
//         } 
//         // console.log("hello2", false);
//         if(!isNaN(parseFloat(input))) {
//             // console.log("hello3", true);  
//             return true;
//         }
        
//     }
//     return false;
    
// }
// var input = 1.0
// console.log("input", input);
// console.log("1",Number.isSafeInteger(input), false);
// console.log("2",Number.isInteger(input), false)
// console.log("3",is_floatv1(input), false)     
// console.log("4",is_floatv2(input), false); 
// console.log("5",is_floatv3(input), false); 
// console.log("");

// var input = 1.2
// console.log("input", input);
// console.log("1",Number.isSafeInteger(input), false);
// console.log("2",Number.isInteger(input), false)
// console.log("3",is_floatv1(input), true);     // corect
// console.log("4",is_floatv2(input), true);     // corect
// console.log("5",is_floatv3(input), true);     // corect
// console.log("");

// var input = "1.2"
// console.log("input", input);
// console.log("1",Number.isSafeInteger(input), false);
// console.log("2",Number.isInteger(input), false)
// console.log("3",is_floatv1(input), true)     // corect
// console.log("4",is_floatv2(input), false);
// console.log("5",is_floatv3(input), false);
// console.log("");

// var input = "hello"
// console.log("input", input);
// console.log("1",Number.isSafeInteger(input), true);   // corect
// console.log("2",Number.isInteger(input), true)        // corect
// console.log("3",is_floatv1(input), true);             // corect
// console.log("4",is_floatv2(input), true);             // corect
// console.log("5",is_floatv3(input), true);             // corect
// console.log("");

// var input = ""
// console.log("input", input);
// console.log("1",Number.isSafeInteger(input), true);   // corect
// console.log("2",Number.isInteger(input), true)        // corect
// console.log("3",is_floatv1(input), true);             // corect
// console.log("4",is_floatv2(input), true);             // corect
// console.log("5",is_floatv3(input), true);             // corect
// console.log("");

// var input = []
// console.log("input", input);
// console.log("1",Number.isSafeInteger(input), true);   // corect
// console.log("2",Number.isInteger(input), true)        // corect
// console.log("3",is_floatv1(input), true);             // corect
// console.log("4",is_floatv2(input), true);             // corect
// console.log("5",is_floatv3(input), true);             // corect
// console.log("");


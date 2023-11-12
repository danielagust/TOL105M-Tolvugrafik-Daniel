function set_data_helper(json){
    // console.log(json)
    config = json 
    
    floor_config = config.machine.structure.floor
    wall_config = config.machine.structure.wall
    feet_config = config.machine.structure.feet
    gnome_config = config.machine.entities.gnome
    centipede_config = config.machine.entities.centipede
    // console.log(feet_config)
    
    
    
}



function radians( degrees ) {
    return degrees * Math.PI / 180.0;
}

function degre(angle){
    return angle * 180/Math.PI;
}

function new_pos(pos1, pos2){
    pos1.set(pos2.x, pos2.y, pos2.z)
}

function move_head(Objects_collision, head){
    const mushrooms = Objects_collision.mushrooms
    const walls_end = Objects_collision.walls;
    const head_pos = head.body.position.clone()
    // const pos_temp = new THREE.Vector3(-6, 0.5,-7)
    if(head.curr_move == "R"){
        head_pos.x += 1;
        // head.if_end = false
        // move_cent(1, head.curr_move, head);
        // return;
        // console.log(head_pos)
    }
    if(head.curr_move == "L"){
        head_pos.x -= 1;
        // head.if_end = false
        
        // return;
        // console.log(head_pos)
    }
    var temp;
    // console.log(head_pos)
    
    if((mushrooms.position.equals(head_pos) || walls_end < Math.abs(head_pos.x))){
        temp = "D";
        // console.log("hello")
        
        if( head.last_move != "D"){
            // console.log(Math.abs(head_pos.x))
            // console.log("hello")
            move_cent(1, "D", head);
            head.if_end = false
        }
        
        
    }
    else{
        move_cent(1, head.curr_move, head);
    }
    // console.log(head.body.rotation.y, "helo" )
    // var theta = 90;
    // var angle = head.angle;
    // var angle_corrector = (head.angle - theta)%360;
    // console.log(angle_corrector)
    // head.body.rotation.y = radians(angle_corrector)
    
    // if(head.if_start){
    //     head.if_start =  false
    // }

    
}

function rotate_part(theta, head){
    var angle_corrector = -(head.angle - theta)%360;
    console.log(angle_corrector)
    head.body.rotateY(radians(theta))
    head.angle = angle_corrector
}
function move_cent(amount,move, head){
    if(move=="R"){
        if(head.last_move == "D"){
            rotate_part(90, head)
        }
        head.body.position.x += amount
        head.last_move = "R"
        head.index += 1;
    }
    if(move=="L"){
        
        if(head.last_move == "D"){
            rotate_part(-90, head)
        }
        head.body.position.x -= amount
        head.last_move = "L"
        head.index += 1;
    }

    if(move=="D"){
        if(head.last_move == "R"){
            rotate_part(-90, head)
        }
        if(head.last_move == "L"){
            rotate_part(90, head)
        }
        
        head.body.position.z += amount
        head.index += 1;
        // console.log("hello d")
        if(head.curr_move == "R"){
            head.curr_move = "L"
            console.log("hello R")
        }
        else if(head.curr_move == "L"){
            head.curr_move = "R"
            console.log("hello L")
        }
        head.last_move = "D"
    }
    if(head.before!=null){
        // head.before.moves.push(next_move)
        console.log("hello")
        head.before.move(amount);
    }
    // console.log(head.before)

    
}

// move_down(amount){
//     this.body.position.z -= amount
// }
// move_left(amount){
//     this.body.position.x -= amount
// }
// move_right(amount){
//     this.body.position.x += amount

// }
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
function add_centipede(HEAD_list){
    
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

var last_move;

function deleteNode(del, head2) {
    // base case
    if (head2 == null || del == null)
        return null;

    // If node to be deleted is head node
    if (head2 == del)
        head2 = del.next;

    // Change next only if node to be
    // deleted is NOT the last node
    if (del.next != null)
        del.next.before = del.before;

    // Change prev only if node to be
    // deleted is NOT the first node
    if (del.before != null)
        del.before.next = del.next;

    del = null;

    return head2;
}
function move_head(Objects_collision, head){

    const mushrooms = Objects_collision.mushrooms
    const walls_end = Objects_collision.walls;
    if(head == null){
        return false
    }
    const head_pos = head.body.position.clone()
    
    
    // console.log(head, "head")
    // const pos_temp = new THREE.Vector3(-6, 0.5,-7)
    head_pos.y -=1
    // console.log(head_pos)
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
        // var last_move = head.curr_move
    }
    
    var temp;
    // console.log(head_pos)
    // console.log(mushrooms.position, head_pos)

    var next_mushroom = false;

    mushrooms.traverse( child => {
        // if (child.isMesh){
        //     if(child.position.equals(head_pos)){
        //         next_mushroom = true;
        //     }
        //     // console.log("hello")
        //     // child.material = material;  
        // }
        if(child.position.equals(head_pos)){
            next_mushroom = true;
        }
    })
    // console.log(head.body.position.equals(head.prev_pos))
    // console.log(head.body.position);
    // console.log(head.body.l)
    
    if(head.body.position.equals(head.prev_pos) &&head.if_end ){
        // console.log(head.if_end)
        if( head.curr_move == "D"){
            // console.log(Math.abs(head_pos.x))
            // console.log("hello")
            
            move_cent(1, "D", head);
            move_cent(1, "L", head)
            // move_cent(1, "D", head);
            // head.prev_pos = head.body.position.clone();
            
        }
        head.if_end = false
        // head.prev_pos = head.body.position.clone();
        // move_cent(1, "D", head);
    }
    
    else if((next_mushroom || walls_end < Math.abs(head_pos.x))){
        temp = "D";
        // console.log("hello")
        
        if( head.last_move != "D"){
            // console.log(Math.abs(head_pos.x))
            // console.log("hello")
            
            move_cent(1, "D", head);
            head.prev_pos = head.body.position.clone();
            
            // console.log(head.last_move)
        }
        
        next_mushroom = false
        return if_end_cent(head);
        
    }
    
    head.prev_pos = head.body.position.clone();
    move_cent(1, head.curr_move, head);
    return if_end_cent(head);
    
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

function if_end_cent(head){
    var end = floor_config.width/2-1 // fast
    // head.position.x = -floor_config.length/2+0.5 // fast
    // head.position.z = 
    // console.log(head.body.position.z, "hello ", end)
    
    return head.body.position.z > end
    

}

function rotate_part(theta, head){
    var angle_corrector = -(head.angle - theta)%360;
    // console.log(angle_corrector)
    head.body.rotateY(radians(theta))
    head.angle = angle_corrector
}
var flip = true
function move_cent(amount,move, head){
    // console.log(head, "head")
    // console.log(head.curr_move, "curr")
    // console.log(head.last_move, "last")
    
    if(move=="R"){
        if(head.last_move == "D"){
            rotate_part(90, head)
        }
        head.body.position.x += amount
        head.last_move = "R"
        head.index += 1;
        head.if_end = true
    }
    if(move=="L"){
        
        if(head.last_move == "D"){
            rotate_part(-90, head)
        }
        head.body.position.x -= amount
        head.last_move = "L"
        head.index += 1;
        head.if_end = true
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
            // console.log("hello R")
        }
        else if(head.curr_move == "L"){
            head.curr_move = "R"
            // console.log("hello L")
        }
        head.last_move = "D"
        // head.before.moves.push(move)
    }
    if(head.before!=null){
        if(flip){
            // head.before.moves.push(move)
            flip = false
        }
        // head.before.moves.push(move)
        // console.log("hello")
        // console.log(head, "head")
        
        head.before.move(amount, move);
        head.add_next_move(move);
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


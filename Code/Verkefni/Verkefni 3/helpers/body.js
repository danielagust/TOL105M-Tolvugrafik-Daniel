
( function (mesh, radius, is_head, before, moves) {
    /**
     * helo2
     */
class Body{
    /**
     * hello
     * @param {*} mesh 
     * @param {*} radius 
     * @param {*} is_head 
     * @param {*} before 
     * @param {*} moves 
     */
    constructor(mesh, radius, is_head, before, moves, index, id){

        this.body = mesh;
        this.radius = radius;
        this.is_head = is_head;
        this.moves = moves;
        this.next = null;
        this.before = before;
        this.index = index;
        this.curr_move = "R"; //move that is expecet to happen
        this.if_end = false
        this.last_move = "R"
        this.angle = 0;
        this.head = this;
        this.tail = null;
        this.id = id;
        this.prev_pos = new THREE.Vector3(0.3,1,0);
        

    }
    
    move(amount, next_move){
        // console.log(this.index)
        
        if(this.moves[this.index]=="R"){
            // console.log(this.id)
            this.move_right(amount)
            
            
        }
        if(this.moves[this.index]=="L"){
            this.move_left(amount)
            // this.index += 1;
        }

        if(this.moves[this.index]=="D"){
            this.move_down(amount)
            // this.index += 1;
        }
        

        if(this.before!=null){
            // this.before.moves.push(next_move)
            this.before.move(amount);
        }
        // this.moves.push(next_move)
        this.index += 1;
    }

    move_down(amount){
        this.body.position.z += amount
    }
    move_left(amount){
        this.body.position.x -= amount
    }
    move_right(amount){
        this.body.position.x += amount

    }

    // remove(object, Objects){
    //     // console.log(object, Objects)
    //     object.geometry.dispose();
    //     object.material.dispose();
    //     Objects.remove( object );
        
    //     // this.body = undefined
    // }

    deleteNode(del, head2) {
		// base case
		if (head2 == null || del == null)
			return del;

		// If node to be deleted is head node
		if (head2 == del)
			head2 = del.next;

		// Change next only if node to be
		// deleted is NOT the last node
		if (del.next != null)
			del.next.before = null;

		// Change prev only if node to be
		// deleted is NOT the first node
		if (del.before != null)
			del.before.next = del.next;

		// del = null;
        del.next = null

		return del;
	}

    split(Objects){
        var counter = 0;
        // console.log(Objects.children)
        // console.log(this.body)
        // Objects.traverse( child => {
        //     // if (child.isMesh){
        //     //     if(child.position.equals(head_pos)){
        //     //         next_mushroom = true;
        //     //     }
        //     //     // console.log("hello")
        //     //     // child.material = material;  
        //     // }
        //     if(counter == 1){
        //         console.log(child)
        //         this.remove(child, Objects)
        //     }
        //     counter +=1
            
        // })
        
        remove(this.body, Objects)
        return this.deleteNode(this, this.head)
        // // console.log(Objects.children)
        // // var selectedObject = Objects.getObjectByName(this.body.name);
        // // console.log(selectedObject, "name")
        // // console.log(Objects, "OBJ")
        
        // // Objects.remove(this.body)
        
        // if(this.next == null){
        //     // console.log("hello0");
        //     if(this.before == null){
        //         return {
        //             head:null,
        //             gone: true
        //         }
        //     }
        //     else{
        //         // console.log("hello2");
        //         // console.log(this, "hello")
        //         this.before.is_head = true;
        //         return {
        //             head:this.before,
        //             gone: false
        //         }
        //     }
        // }
        // if(this.before == null){
        //     return {
        //         head:this,
        //         gone: true
        //     }
        // }
        // else{
        //     this.before.is_head = true;
        //     this.next.before = null;
        //     var temp =  this.before;
        //     this.before.next = null;
        //     console.log(temp, "hello0");
        //     return {
        //         head:temp,
        //         gone: false
        //     }
        // }
    }
    add_next_move(move){
        this.moves.push(move)
        if(this.before != null){
            this.before.add_next_move(move)
        }
    }
    add(body){
        
        if(this.before == null){
            body.next = this;
            this.before = body;
        }
        // console.log(this.before)
        return body

         // Create a temporary variable
        // let temp = body
    
        // // If the list is empty link assign
        // // new node to both head and tail
        // if (this.head == null) {
        //     this.head = temp;
        //     this.tail = temp;
        // }
    
        // // else add item to the head and shift head backward
        // else {
        //     temp.next = this.head;
        //     this.head.prev = temp;
        //     this.head = temp;
        // }
    }

    swap_moves(moves){
        var move = this.moves[this.index]
        console.log( this.moves)
        console.log( this.index)
        
        this.moves = copy(moves)
        moves.push(move)
        
        console.log(this, "hello")
        if(this.before != null){
            this.before.swap_moves(moves)
        }
        
        
    }
    insertEnd(body) {
        // Create a temporary variable
        let temp = body
     
        // If the list is empty link assign
        // new node to both head and tail
        if (this.head == this) {
            this.head = body;
            this.tail = body;
            this.tail.next = body;
        }
     
        // else add item to the tail and shift tail
        else {
            body.before = this.tail;
            this.tail.next = body;
            this.tail = this.tail.next;
            body.next = this.tail.next
            
            // this.before = this.tail;
        }
        
        this.before = this.tail;
        
        // console.log(this.before)
    }
}

this.Obj_Body = Body
} )();

// var hello = new Obj_Body();

// console.log(hello)


// const myArray = [1, 2, 3, 4, 5];
// const index = 1
// const x = myArray.splice(index, 1);

// console.log(`myArray values: ${myArray}`);
// console.log(`variable x value: ${x}`);


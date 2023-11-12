
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
        this.head = null;
        this.tail = null;
        this.id = id;
        

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
    split(Objects){
        Objects.remove(this.body)
        if(this.next == null){
            if(this.before == null){
                return {
                    head:null,
                    gone: true
                }
            }
            else{
                this.before.is_head = true;
                return {
                    head:this.before,
                    gone: false
                }
            }
        }
        if(this.before == null){
            return {
                head:null,
                gone: true
            }
        }
        else{
            this.before.is_head = true;
            this.next.before = null;
            var temp =  this.before;
            this.before.next = null;
            return {
                head:temp,
                gone: false
            }
        }
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
        console.log(this.before)
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

    insertEnd(body) {
        // Create a temporary variable
        let temp = body
     
        // If the list is empty link assign
        // new node to both head and tail
        if (this.head == null) {
            this.head = body;
            this.tail = body;
            this.tail.next = body;
        }
     
        // else add item to the tail and shift tail
        else {
            body.before = this.tail;
            this.tail.next = body;
            this.tail = this.tail.next;
            
            // this.before = this.tail;
        }
        
        this.before = this.tail;
        
        console.log(this.before)
    }
}

this.Obj_Body = Body
} )();

// var hello = new Obj_Body();

// console.log(hello)
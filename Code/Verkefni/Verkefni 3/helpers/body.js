
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
    constructor(mesh, radius, is_head, before, moves, index){

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
        

    }
    
    move(amount, next_move){
        if(this.moves[this.index]=="R"){
            this.move_right(amount)
            this.index += 1;
        }
        if(this.moves[this.index]=="L"){
            this.move_left(amount)
            this.index += 1;
        }

        if(this.moves[this.index]=="D"){
            this.move_down(amount)
            this.index += 1;
        }

        if(this.before!=null){
            this.before.moves.push(next_move)
            this.before.move(amount);
        }
    }

    move_down(amount){
        this.body.position.z -= amount
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
        return body
    }
}

this.Obj_Body = Body
} )();

// var hello = new Obj_Body();

// console.log(hello)
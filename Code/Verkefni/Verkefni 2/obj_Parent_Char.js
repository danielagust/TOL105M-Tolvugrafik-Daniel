import Point from "./point.js";

export default class obj_Parent_Char{
    /**
     * 
     
     * @param {vec2[]} points 
     */
    constructor(points, size ,pos){
        
        this.points = points;
        this.angle = 90;
        this.width = size[0];
        this.height = size[1];
        this.size = size;
        
        // this.gl = gl;
        // this.id = gl.createBuffer();
        // gl.bindBuffer( gl.ARRAY_BUFFER, this.id );
        // this.program = program;
        // this.vPosition = gl.getAttribLocation( program, "vPosition" );
        // var colorLoc = gl.getUniformLocation( program, "fColor" );

        this.hitbox = []

        // this.hitbox.push(add(vec2(-width,-height), pos)); // bottom left
        // this.hitbox.push(add(vec2(-width,height), pos)); // top left
        // this.hitbox.push(add(vec2(width,height), pos)); // top right
        // this.hitbox.push(add(vec2(width,-height), pos)); // bottom right
        var top_left = add(vec2(- this.width,this.height), pos);
        this.position = pos;
        
        // this.hitbox.push(add(vec2(- this.width,- this.height), pos)); // bottom left
        // this.hitbox.push(add(vec2(- this.width,this.height), pos)); // top left
        // this.hitbox.push(add(vec2( this.width, this.height), pos)); // top right
        // this.hitbox.push(add(vec2( this.width,- this.height), pos)); // bottom right

        this.hitbox.push(add(vec2(0.0, -this.height), top_left)); // bottom left
        this.hitbox.push(top_left); // top left
        this.hitbox.push(add(vec2(this.width, 0.0), top_left)); // top right
        this.hitbox.push(add(vec2(this.width, -this.height), top_left)); // bottom right

        for ( var i = 0; i < this.hitbox.length; ++i ){
            this.hitbox[i] = new Point(this.hitbox[i][0], this.hitbox[i][1])
        }
          
    }
    /**
     * gets id
     * @return {Number} id
     */
    // get id(){
    //     return this.id;
    // }
    /**
     * 
     * @param {vec2} vector 
     */

    
    set_webstuff(gl, program){
        this.gl = gl;
        this.id = gl.createBuffer();
        this.gl.bindBuffer( gl.ARRAY_BUFFER, this.id );
        this.program = program;

        // this.bufferId2 = this.gl.createBuffer();
        // this.gl.bindBuffer(  this.gl.ARRAY_BUFFER, bufferId2 );
        this.vPosition = gl.getAttribLocation( program, "vPosition" );
        this.colorLoc = gl.getUniformLocation( program, "fColor" );
    }
    
    translatev1(vector){
        for ( var i = 0; i < this.points.length; ++i ){
            this.points[i] = add(this.points[i], vector);
        }
    }
    /**
     * 
     * @param {vec2} vector 
     */
    translatev2(vector){
        var temp_points = [];
        
        for ( var i = 0; i < this.points.length; ++i ){
            temp_points.push(add(this.points[i], vector));
        }
          
    }
    /**
     * amount is the movement to the right
     * 1.0 is max
     * @param {float} amount 
     */
    move_right(amount){
        this.translatev1(vec2(amount, 0));
    }
    /**
     * amount is the movement to the left
     * 1.0 is max
     * @param {float} amount 
     */
    move_left(amount){
        this.translatev1(vec2(-amount, 0));
    }
    /**
     * amount is the movement to the forward
     * 1.0 is max
     * @param {float} amount 
     */
    move_forward(amount){
        this.translatev1(vec2(0, amount));
    }
    /**
     * amount is the movement to the backwarf
     * 1.0 is max
     * @param {float} amount 
     */
    move_backward(amount){
        this.translatev1(vec2(0, -amount));
    }

    
    /**
     * must defin a get Position func and a get Size func
     * Position is in the middle of the obj
     * can use child class
     * @param {char_partent} one 
     * @param {char_partent} other 
     * @returns 
     */
    CheckCollision_self(other) // AABB - AABB collision
    {
        // const pos_self = ""
        // // const pos_self_x = -(this.Position[0]+this.Size[0]/2) ;
        // // const pos_self_y = (this.Position[1]+this.Size[1]/2);
        // const pos_self_x = this.top_cornor[0];
        // const pos_self_y = this.top_cornor[1];
        // console.log("top pos self", [pos_self_x, pos_self_y])

        

        // // const pos_other_x = -(other.Position[0]+other.Size[0]/2);
        // // const pos_other_y = (other.Position[1]+other.Size[1]/2);

        // const pos_other_x = other.top_cornor[0];
        // const pos_other_y = other.top_cornor[1];
        // console.log("top pos other", [pos_other_x, pos_other_y])
        // console.log("top sidwalk", other.points[1])

        // // collision x-axis?
        // var collisionX = pos_self_x + this.Size[0] >= pos_other_x &&
        // pos_other_x + other.Size[0] >= pos_self_x;
        // // collision y-axis?
        // var collisionY = pos_self_y + this.Size[1] >= pos_other_y &&
        // pos_other_y + other.Size[1] >= pos_self_y;
        // console.log("collisionX", collisionX);
        // console.log("collisionY", collisionY);
        // // collision only if on both axes
        // // return collisionX && collisionY;

        // if (
        //     pos_self_x + this.Size[0] >= pos_other_x &&
        //     pos_self_x <= pos_other_x + other.Size[0] &&
        //     pos_self_y + this.Size[1] >= pos_other_y &&
        //     pos_self_y <= pos_other_y + other.Size[1]  

        // ){
        //     return true
        // }else{
        //     return false
        // }
        var test = this;
        return this.collision(test, other);
    } 

    collision( box1, box2 ) {
        
        const ref_corner = 1;
       

        // return (
        //   box1.hitbox[ref_corner].x + box1.width >= box2.hitbox[ref_corner].x && // box1 right collides with box2 left
        //   box2.hitbox[ref_corner].x + box2.width >= box1.hitbox[ref_corner].x && // box2 right collides with box1 left
        //   box1.hitbox[ref_corner].y + box1.height >= box2.hitbox[ref_corner].y && // box1 bottom collides with box2 top
        //   box2.hitbox[ref_corner].y + box2.height  >= box1.hitbox[ref_corner].y // box1 top collides with box2 bottom
        // )
        
        //   return (
        //     box1.hitbox[ref_corner].x + box1.width  >= box2.hitbox[ref_corner].x && // box1 right collides with box2 left
        //     box1.hitbox[ref_corner].x <= box2.hitbox[ref_corner].x + box2.width && // box2 right collides with box1 left
        //     box1.hitbox[ref_corner].y + box1.height >= box2.hitbox[1].y && // box1 bottom collides with box2 top
        //     box1.hitbox[ref_corner].y <= box2.hitbox[ref_corner].y + box2.height // box1 top collides with box2 bottom
        //   )

          return (
          box1.hitbox[ref_corner].x + box1.width >= box2.hitbox[ref_corner].x && // box1 right collides with box2 left
          box2.hitbox[ref_corner].x + box2.width >= box1.hitbox[ref_corner].x && // box2 right collides with box1 left
          box1.hitbox[0].y + box1.height >= box2.hitbox[0].y && // box1 bottom collides with box2 top
          box2.hitbox[0].y + box2.height  >= box1.hitbox[0].y // box1 top collides with box2 bottom
        )
        //   return (
        //     box1.hitbox[2].x >= box2.hitbox[1].x && // box1 right collides with box2 left
        //     box1.hitbox[1].x <= box2.hitbox[2].x && // box2 right collides with box1 left
        //     box1.hitbox[0].y >= box2.hitbox[1].y && // box1 bottom collides with box2 top
        //     box1.hitbox[1].y <= box2.hitbox[0].y // box1 top collides with box2 bottom
        //   )

        // return (
        //     box1.hitbox[2].x  >= box2.hitbox[1].x && // box1 right collides with box2 left
        //     box2.hitbox[2].x >= box1.hitbox[1].x && // box2 right collides with box1 left
        //     box1.hitbox[0].y >= box2.hitbox[1].y && // box1 bottom collides with box2 top
        //     box2.hitbox[0].y >= box1.hitbox[1].y // box1 top collides with box2 bottom
        //   )

        
      }

      collisionv2( box1, box2 ) {
        // console.log(box1);
        // console.log(
        //     box1.top_cornor.x + box1.width >= box2.top_cornor.x && // box1 right collides with box2 left
        //     box2.top_cornor.x + box2.width >= box1.top_cornor.x );
        return (
          box1.hitbox[1].x + box1.width>= box2.hitbox[1].x && // box1 right collides with box2 left
          box2.hitbox[1].x + box2.width >= box1.hitbox[1].x && // box2 right collides with box1 left
          box1.hitbox[1].y + box1.height >= box2.hitbox[1].y && // box1 bottom collides with box2 top
          box2.hitbox[1].y + box2.height >= box1.hitbox[1].y // box1 top collides with box2 bottom
        )
      }

      hitboxes_to_vecv2(){
        var temp = [];
        // for ( var i = 0; i < this.hitbox.length; ++i ){
        //     temp.push(vec2(this.hitbox[i].x, this.hitbox[i].y))
        // }
        // temp.push(vec2(this.hitbox[1].x , this.hitbox[1].y - this.height*2)) // 0 from 1
        // temp.push(vec2(this.hitbox[1].x , this.hitbox[1].y)) // 1 from 1
        // temp.push(vec2(this.hitbox[1].x + this.width*2, this.hitbox[1].y)) // 2 from 1
        // temp.push(vec2(this.hitbox[1].x + this.width*2, this.hitbox[1].y - this.height*2)) // 3 from 1

        temp.push(vec2(this.hitbox[1].x , this.hitbox[0].y + this.height)) // 0 from 1
        temp.push(vec2(this.hitbox[1].x , this.hitbox[0].y)) // 1 from 1
        temp.push(vec2(this.hitbox[1].x + this.width, this.hitbox[0].y)) // 2 from 1
        temp.push(vec2(this.hitbox[1].x + this.width, this.hitbox[0].y + this.height)) // 3 from 1
        return temp;
    }

    // /**
    //  * must defin a get Position func and a get Size func
    //  * Position is in the middle of the obj
    //  * can use child class
    //  * @param {char_partent} one 
    //  * @param {char_partent} other 
    //  * @returns 
    //  */
    // CheckCollision( one,  other) // AABB - AABB collision
    // {
    //     // collision x-axis?
    //     var collisionX = one.Position.x + one.Size[0] >= other.Position.x &&
    //         other.Position.x + other.Size[0] >= one.Position.x;
    //     // collision y-axis?
    //     var collisionY = one.Position.y + one.Size[1] >= other.Position.y &&
    //         other.Position.y + other.Size[1] >= one.Position.y;
    //     // collision only if on both axes
    //     return collisionX && collisionY;
    // }
/**
 * sets angle of self to a cerend angle
 * angle is in degres 0-360
 */
set angle_self(theta){
    // console.log("self angle",  this.angle);
    // console.log("theta", theta);
    // console	.log(this.angle = theta)
    
    if(this.angle != Math.abs(theta)){
        var angle_corrector = (this.angle + this.angle - theta)%360;
        
        this.rotate_self_set(theta)
    }
    // var angle_corrector = (this.angle + this.angle - theta)%360;
    // console.log("angle cor ",angle_corrector);
    // this.rotate_self(angle_corrector)
    
    
}
/**
* theta is in degres 0-360
*/
rotate_self(theta){ 
    
    var c = Math.cos( radians(theta) );
    var s = Math.sin( radians(theta) );  
    this.angle =  theta%360;
    
     
    let result = [
        [c,-s],
        [s,c]
      ];
    var point;
    // console.log("result ", result);
    for ( var i = 0; i < this.points.length; ++i ){
        // console.log(mult(this.points[i], result));
        // console.log("before ", this.points[i])
        point = this.multiplyMatrices(result, [[this.points[i][0]-this.po], [this.points[i][1]]])

        this.points[i] = vec2(point[0], point[1]);
        // console.log("after ", this.points[i])
    }
    
}

multiplyMatrices(m1, m2) {
    var result = [];
    for (var i = 0; i < m1.length; i++) {
        result[i] = [];
        for (var j = 0; j < m2[0].length; j++) {
            var sum = 0;
            for (var k = 0; k < m1[0].length; k++) {
                sum += m1[i][k] * m2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}
/**
* theta is in degres 0-360
*/
// rotate_self_BySet_angle(theta){ 
    
//     var c = Math.cos( radians(theta) );
//     var s = Math.sin( radians(theta) );  
     
//     var result = mat2(
//         vec2(c,-s),
//         vec2(s,c)
//     );
//     for ( var i = 0; i < this.points.length; ++i ){
//         this.points[i] = mult(this.points[i], result);
//     }
    
// }
/**
* theta is in degres 0-360
*/
rotate_get(theta){
    var c = Math.cos( radians(theta) );
    var s = Math.sin( radians(theta) );  
     
    var result = mat2(
        vec2(c,-s),
        vec2(s,c)
    );

    return result
    
}
/**
 * renders the obj
 */
set Color(color){
    this.color = color;
    
}

set Pointsv2(new_points){
    this.points = new_points;
}

hitboxes_to_vec(){
    var temp = [];
    for ( var i = 0; i < this.hitbox.length; ++i ){
        temp.push(vec2(this.hitbox[i].x, this.hitbox[i].y))
    }
    return temp;
}

render(){
    
    // console.log(this.points , "render points");
    
    this.gl.bufferData( this.gl.ARRAY_BUFFER, flatten(this.points), this.gl.STATIC_DRAW );
    // console.log(this.colorLoc);
    
    this.gl.vertexAttribPointer( this.vPosition, 2, this.gl.FLOAT, false, 0, 0 );
    
    this.gl.uniform4fv( this.colorLoc, this.color );
    this.gl.drawArrays( this.gl.TRIANGLE_FAN, 0, this.points.length );
    
    
}

    

}

// module.exports = {char_parent};
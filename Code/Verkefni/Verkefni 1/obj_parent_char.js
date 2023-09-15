

export default class char_parent{
    /**
     * 
     
     * @param {vec2} points 
     * @param {WebGLUtils} gl 
     */
    constructor(points, gl, program){
        
        this.points = points;
        this.angle = 0.0;
        this.gl = gl;
        this.id = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, this.id );
        this.vPosition = gl.getAttribLocation( program, "vPosition" );
        
        
        
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
     * @param {char_partent} two 
     * @returns 
     */
    CheckCollision( one,  two) // AABB - AABB collision
    {
        // collision x-axis?
        var collisionX = one.Position.x + one.Size.x >= two.Position.x &&
            two.Position.x + two.Size.x >= one.Position.x;
        // collision y-axis?
        var collisionY = one.Position.y + one.Size.y >= two.Position.y &&
            two.Position.y + two.Size.y >= one.Position.y;
        // collision only if on both axes
        return collisionX && collisionY;
    } 

/**
 * sets angle of self to a cerend angle
 * angle is in degres 0-360
 */
set angle_self(theta){
    var angle_corrector = (this.angle + this.angle - theta)%360;
    this.rotate_self(angle_corrector)
}
/**
* theta is in degres 0-360
*/
rotate_self(theta){ 
    
    var c = Math.cos( radians(theta) );
    var s = Math.sin( radians(theta) );  
    this.angle =  theta%360;
     
    var result = mat2(
        vec2(c,-s),
        vec2(s,c)
    );
    for ( var i = 0; i < this.points.length; ++i ){
        this.points[i] = mult(this.points[i], result);
    }
    
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

render(gl, program){
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var colorLoc = gl.getUniformLocation( program, "fColor" );
    
    gl.bufferData( gl.ARRAY_BUFFER, flatten(this.points), gl.STATIC_DRAW );
    
    gl.vertexAttribPointer( this.vPosition, 2, gl.FLOAT, false, 0, 0 );
    
    gl.uniform4fv( colorLoc, this.color );
    gl.drawArrays( gl.TRIANGLE_FAN, 0, this.points.length );
    
    
}

    

}

// module.exports = {char_parent};
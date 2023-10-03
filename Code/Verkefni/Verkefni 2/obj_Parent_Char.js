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

        this.position = pos;
        
        
          
    }

    
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
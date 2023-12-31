// var char_partent = require ('obj_parent_char.js');
import char_partent from "./obj_parent_char.js"
import Point from "./point.js";
export default class Frog extends char_partent{
    constructor(size, pos){
        var temp_points = [];
        var width = size[0];
        var height = size[1];
        temp_points.push(add(vec2(-width,-height), pos)); // bottom left
        temp_points.push(add(vec2(0.0, height), pos)); // top middle
        temp_points.push(add(vec2(width,-height), pos)); // bottom right
        var double_width = size[0];
        var double_height = size[1];
        // console.log(size.x);
        // console.log(half_height);
        // temp_points.push(add(vec2(-half_width,-half_height), pos)); // bottom left
        // temp_points.push(add(vec2(-half_width,half_height), pos)); // top left
        // temp_points.push(add(vec2(half_width,half_height), pos)); // top right
        // temp_points.push(add(vec2(half_width,-half_height), pos)); // bottom right
        var top_cornor = add(vec2(-width,height), pos)
        // console.log(top_cornor); 
        // temp_points.push(vec2(-1.0,-1.0));
        // temp_points.push(vec2(0.0,1.0));
        // temp_points.push(vec2(1.0,-1.0));

        
        
        super(temp_points, size, pos);

        
        
        // this.top_point = this.points[1];
        this.hitbox[0].position = add(vec2(-double_width,-double_height), pos)
        this.hitbox[1].position = add(vec2(- double_width,double_height), pos)
        // this.hitbox[2].position = add(vec2( double_width, double_height), pos)
        // this.hitbox[3].position = add(vec2( double_width,-double_height), pos)




        this.top_cornor = this.hitbox[1];
        this.size = vec2(width, height);
        // console.log("pos before", pos);
        // this.position = this.getTriangleCentroid();
        this.position = pos;
        // console.log("pos after", this.position);
        this.width = width;
        this.height = height;
        

        // console.log("angle2",this.getAngle());
       
        
    }

    getAngle = function(){
        const top_point = this.points[1];
        const x = top_point[0];
        const y = top_point[1];
        const posx = this.position[0];
        const posy = this.position[1];
        var angle = Math.atan2(y-posy, x-posx);
        var degrees = 180 * angle / Math.PI;
        return (360 + Math.round(degrees)) % 360;
    }

    // getTriangleCentroid(arr){
    //     var centerX = (arr[0].x + arr[1].x + arr[2].x) / 3;
    //     var centerY = (arr[0].y + arr[1].y + arr[2].y) / 3;
    //     return createVector(centerX, centerY);
    // }
    getTriangleCentroid(){
        var centerX = (this.points[0][0] + this.points[1][0] + this.points[2][0]) / 3;
        var centerY = (this.points[0][1] + this.points[1][1] + this.points[2][1]) / 3;
        return vec2(centerX, centerY);
    }

    rotate_selfv2(theta){ 
        
    
        var c = Math.cos( radians(theta) );
        var s = Math.sin( radians(theta) );  
        
        // console.log("angle inside ", this.angle);
        var px2;
        var py2;
         
        let result = [
            [c,-s],
            [s,c]
          ];
        var point;
        // console.log("result ", result);
        for ( var i = 0; i < this.points.length; ++i ){
            // console.log(mult(this.points[i], result));
            const px = this.points[i][0];
            const py = this.points[i][1];
            const ox = this.position[0];
            const oy = this.position[1];
            px2 = - s * (py-oy) + c * (px-ox)  + ox;
            py2 = s * (px-ox) + c * (py-oy) + oy;

            // console.log("before ", this.points[i])
            // point = this.multiplyMatrices(result, [[this.points[i][0]-this.position[0]], [this.points[i][1]-this.position[1]]])
            // console.log("point1 ", point);
            // point = [point[0][0]+this.position[0],point[1][0]+this.position[1]];
            point = [px2, py2];
            // console.log("point2 ", point);
            this.points[i] = vec2(point[0], point[1]);
            // console.log("after ", this.points[i])
        }
        // console.log("");
        
    }

    rotate_self(theta){
        const angle = this.getAngle();
        var angle_corrector = (angle - theta)%360;
        const posx = this.position[0];
        const posy = this.position[1];
        var mR = rotate( theta, 0.0, 0.0, -1.0 );
        // console.log("self angle", angle);
        // console.log("angle corv1 ",angle_corrector);
        var pointM;
        // var point;
        var mP;
        for ( var i = 0; i < this.points.length; ++i ){
            
            const x = this.points[i][0];
            const y = this.points[i][1];
            mP = mat4(
                vec4(x-posx),
                vec4(y-posy),
                vec4(),
                vec4()
                );

            pointM = mult( mR, mP);

            this.points[i] = vec2(pointM[0][0]+posx, pointM[1][0]+posy);
       
        } 
        this.angle = this.getAngle();
        // console.log("");
        // console.log("angle2",this.getAngle());
    }

    rotate_self_set(theta){
        const angle = this.getAngle();
        var angle_corrector = (angle - theta)%360;
        // this.rotate_cornor_point(angle_corrector);
        const posx = this.position[0];
        const posy = this.position[1];
        var mR = rotate( angle_corrector, 0.0, 0.0, -1.0 );
        // console.log("self angle", angle);
        // console.log("angle corv1 ",angle_corrector);
        var pointM;
        // var point;
        var mP;
        for ( var i = 0; i < this.points.length; ++i ){
            
            const x = this.points[i][0];
            const y = this.points[i][1];
            mP = mat4(
                vec4(x-posx),
                vec4(y-posy),
                vec4(),
                vec4()
                );

            pointM = mult( mR, mP);

            this.points[i] = vec2(pointM[0][0]+posx, pointM[1][0]+posy);
       
        } 
        // this.rotate_cornor_point(angle_corrector);
        this.angle = this.getAngle();
        
        // console.log("");
        // console.log("angle2",this.getAngle());
        
    }

    rotate_cornor_point(theta){
        const angle = this.getAngle();
        // var angle_corrector = (angle - theta)%360;
        const posx = this.position[0];
        const posy = this.position[1];
        var mR = rotate( theta, 0.0, 0.0, -1.0 );
        // console.log("self angle", angle);
        // console.log("angle corv1 ",angle_corrector);
        var pointM;
        // var point;
        var mP; 

        const x = this.top_cornor.x;
        const y = this.top_cornor.y;
        mP = mat4(
            vec4(x-posx),
            vec4(y-posy),
            vec4(),
            vec4()
            );

        pointM = mult( mR, mP);

        this.top_cornor.position = [pointM[0][0]+posx, pointM[1][0]+posy];

        // this.top_cornor.x = pointM[0][0]+posx;
        // this.top_cornor.y = pointM[1][0]+posy;
        // console.log(this.top_cornor);
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

        //   return (
        //   box1.hitbox[ref_corner].x + box1.width*2 >= box2.hitbox[ref_corner].x && // box1 right collides with box2 left
        //   box2.hitbox[ref_corner].x + box2.width*2 >= box1.hitbox[ref_corner].x && // box2 right collides with box1 left
        //   box1.hitbox[0].y + box1.height*2 >= box2.hitbox[0].y && // box1 bottom collides with box2 top
        //   box2.hitbox[0].y + box2.height*2  >= box1.hitbox[0].y // box1 top collides with box2 bottom
        // )

        return (
            box1.hitbox[ref_corner].x + box1.width*2 >= box2.hitbox[ref_corner].x && // box1 right collides with box2 left
            box2.hitbox[ref_corner].x + box2.width >= box1.hitbox[ref_corner].x && // box2 right collides with box1 left
            box1.hitbox[0].y + box1.height*2 >= box2.hitbox[0].y && // box1 bottom collides with box2 top
            box2.hitbox[0].y + box2.height >= box1.hitbox[0].y // box1 top collides with box2 bottom
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

        hitboxes_to_vecv2(){
        var temp = [];
        // for ( var i = 0; i < this.hitbox.length; ++i ){
        //     temp.push(vec2(this.hitbox[i].x, this.hitbox[i].y))
        // }
        // temp.push(vec2(this.hitbox[1].x , this.hitbox[0].y + this.height)) // 0 from 1
        // temp.push(vec2(this.hitbox[1].x , this.hitbox[0].y)) // 1 from 1
        // temp.push(vec2(this.hitbox[1].x + this.width, this.hitbox[0].y)) // 2 from 1
        // temp.push(vec2(this.hitbox[1].x + this.width, this.hitbox[0].y + this.height)) // 3 from 1

        temp.push(vec2(this.hitbox[1].x , this.hitbox[0].y + this.height*2)) // 0 from 1
        temp.push(vec2(this.hitbox[1].x , this.hitbox[0].y)) // 1 from 1
        temp.push(vec2(this.hitbox[1].x + this.width*2, this.hitbox[0].y)) // 2 from 1
        temp.push(vec2(this.hitbox[1].x + this.width*2, this.hitbox[0].y + this.height*2)) // 3 from 1
        return temp;
    }

    translatev1(vector){
        var new_cornor;
        for ( var i = 0; i < this.points.length; ++i ){
            this.points[i] = add(this.points[i], vector);
            
            
        }
        for ( var i = 0; i < this.hitbox.length; ++i ){
            new_cornor = add(this.hitbox[i].position, vector);
            this.hitbox[i].position = [new_cornor[0], new_cornor[1]];
        }
        // new_top_cornor = add(this.top_cornor.position, vector);
        // this.top_cornor.position = [new_top_cornor[0], new_top_cornor[1]];
        this.position = add(this.position, vector);
        // this.position = this.getTriangleCentroid();
        // console.log(this.hitbox);
    }

    translatev2_wrap(vector){
        var temp_points = [];
        
        for ( var i = 0; i < this.points.length; ++i ){
            temp_points.push(add(this.points[i]%this.width_screen_end, vector));
        }
          
    }
    /**
     * amount is the movement to the right
     * 1.0 is max
     * @param {float} amount 
     */
    
    move_right(amount){
        
        // this.rotate_self(90);
        this.translatev1(vec2(amount, 0));
        this.angle_self = 360;
        // var new_top_cornor = add(this.top_cornor.position, vec2(amount, 0));
        // this.top_cornor.position = [new_top_cornor[0], new_top_cornor[1]];
        
    }

    /**
     * amount is the movement to the left
     * 1.0 is max
     * @param {float} amount 
     */
    move_left(amount){
        
        // this.rotate_self(-90);
        this.translatev1(vec2(-amount, 0));
        this.angle_self = 180;
        
        // console.log(this);
    }
    /**
     * amount is the movement to the forward
     * 1.0 is max
     * @param {float} amount 
     */
    move_forward(amount){
        // const x = Math.cos(radians(this.angle));
        // const y = Math.sin(radians(this.angle));
        // console.log("angle vector", x, y);
        // console.log("angle deg", this.angle);
        // this.translatev1( vec2(x*amount, y*amount));
        
        
        this.translatev1(vec2(0, amount));
        this.angle_self = 90;
        
    }
    /**
     * amount is the movement to the backwarf
     * 1.0 is max
     * @param {float} amount 
     */
    move_backward(amount){
        
        this.translatev1(vec2(0, -amount));
        this.angle_self = 270;

    }

   

    get Position(){
        return this.position;
    }

    get Size(){
        return this.size;
    }

    render(){
        
        // console.log(this.points , "render points");
        
        this.gl.bufferData( this.gl.ARRAY_BUFFER, flatten(this.points), this.gl.STATIC_DRAW );
        // console.log(this.colorLoc);
        
        this.gl.vertexAttribPointer( this.vPosition, 2, this.gl.FLOAT, false, 0, 0 );
        
        this.gl.uniform4fv( this.colorLoc, this.color );
        this.gl.drawArrays( this.gl.TRIANGLE_FAN, 0, this.points.length );


        // var bufferId = this.gl.createBuffer();
        // this.gl.bindBuffer(  this.gl.ARRAY_BUFFER, bufferId );
        // this.gl.bufferData(  this.gl.ARRAY_BUFFER, flatten([this.points[1]]),  this.gl.STATIC_DRAW );
        // // console.log(this.points[1]);
        // this.gl.uniform4fv( this.colorLoc, vec4(1.0,1.0,1.0,1.0) );
        // this.gl.drawArrays( this.gl.POINTS, 1, 1 );

        // // var bufferId2 = this.gl.createBuffer();
        // this.gl.bindBuffer(  this.gl.ARRAY_BUFFER, this.bufferId2 );
        // // console.log(vec2(this.top_cornor.x, this.top_cornor.y));
        // this.gl.bufferData(  this.gl.ARRAY_BUFFER, flatten(vec2(this.top_cornor.x, this.top_cornor.y)),  this.gl.STATIC_DRAW );
        // // console.log(this.points[1]);
        // this.gl.uniform4fv( this.colorLoc, vec4(1.0,1.0,1.0,1.0) );
        // this.gl.drawArrays( this.gl.POINTS, 0, 1 );
        
    }  
}

    


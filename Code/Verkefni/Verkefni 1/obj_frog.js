// var char_partent = require ('obj_parent_char.js');
import char_partent from "./obj_parent_char.js"
export default class Frog extends char_partent{
    constructor(size, pos){
        var temp_points = [];
        var width = size[0];
        var height = size[1];
        temp_points.push(add(vec2(-width,-height), pos)); // bottom left
        temp_points.push(vec2(pos[0],height+pos[1])); // top middle
        temp_points.push(add(vec2(width,-height), pos)); // bottom right
        // temp_points.push(vec2(-1.0,-1.0));
        // temp_points.push(vec2(0.0,1.0));
        // temp_points.push(vec2(1.0,-1.0));
        super(temp_points);
        this.size = vec2(width, height);
        console.log("pos before", pos);
        this.position = this.getTriangleCentroid();
        console.log("pos after", this.position);
        

        
       
        
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
        
        console.log("angle inside ", this.angle);
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

            console.log("before ", this.points[i])
            // point = this.multiplyMatrices(result, [[this.points[i][0]-this.position[0]], [this.points[i][1]-this.position[1]]])
            // console.log("point1 ", point);
            // point = [point[0][0]+this.position[0],point[1][0]+this.position[1]];
            point = [px2, py2];
            // console.log("point2 ", point);
            this.points[i] = vec2(point[0], point[1]);
            console.log("after ", this.points[i])
        }
        console.log("");
        
    }

    rotate_self(theta){
        const posx = this.position[0];
        const posy = this.position[1]
        var mR = rotate( theta, 0.0, 0.0, 1.0 );
        var pointM;
        var point;
        var mP;
        for ( var i = 0; i < this.points.length; ++i ){
            // // console.log(mult(this.points[i], result));
            // const px = this.points[i][0];
            // const py = this.points[i][1];
            // const ox = this.position[0];
            // const oy = this.position[1];
            // px2 = - s * (py-oy) + c * (px-ox)  + ox;
            // py2 = s * (px-ox) + c * (py-oy) + oy;
            const x = this.points[i][0];
            const y = this.points[i][1];
            mP = mat4(
                vec4(x),
                vec4(y),
                vec4(),
                vec4()
                );
            console.log("before ", this.points[i])
            console.log("matrix", mR);
            pointM = mult( mR, mP);
            console.log("point1 ", pointM);
            // point = [point[0][0]+this.position[0],point[1][0]+this.position[1]];
            // point = vec2(point[0], point[1]);
            // console.log("point2 ", point);
            this.points[i] = vec2(pointM[0][0], pointM[1][0]);
            console.log("after ", this.points[i])
        } 
    }

//     POINT rotate_point(float cx,float cy,float angle,POINT p)
// {
//   float s = sin(angle);
//   float c = cos(angle);

//   // translate point back to origin:
//   p.x -= cx;
//   p.y -= cy;

//   // rotate point
//   float xnew = p.x * c - p.y * s;
//   float ynew = p.x * s + p.y * c;

//   // translate point back:
//   p.x = xnew + cx;
//   p.y = ynew + cy;
//   return p;
// }

    translatev1_wrap(vector){
        for ( var i = 0; i < this.points.length; ++i ){
            this.points[i] = add(this.points[i]%this.width_screen_end, vector);
        }
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
        // this.translatev1(vec2(amount, 0));
        this.angle_self = 90;
    }
    /**
     * amount is the movement to the left
     * 1.0 is max
     * @param {float} amount 
     */
    move_left(amount){
        // this.translatev1(vec2(-amount, 0));
        this.angle_self = 180;
        // console.log(this);
    }
    /**
     * amount is the movement to the forward
     * 1.0 is max
     * @param {float} amount 
     */
    move_forward(amount){
        this.translatev1(vec2(0, amount));
        // this.angle_self = 0;
    }
    /**
     * amount is the movement to the backwarf
     * 1.0 is max
     * @param {float} amount 
     */
    move_backward(amount){
        this.translatev1(vec2(0, -amount));
        // this.angle_self = 0;
    }



    get Position(){
        return this.position;
    }

    get Size(){
        return this.size;
    }

    
}
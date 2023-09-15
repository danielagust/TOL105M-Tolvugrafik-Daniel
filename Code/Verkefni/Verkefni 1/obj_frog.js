// var char_partent = require ('obj_parent_char.js');
import char_partent from "./obj_parent_char.js"
export default class Frog extends char_partent{
    constructor(id, size, pos){
        var temp_points = [];
        var half_width = size.x/2;
        var half_height = size.y/2;
        temp_points.push(add(vec2(-half_width,-half_height), pos)); // bottom left
        temp_points.push(vec2(pos.x,half_height)); // top middle
        temp_points.push(add(vec2(half_width,-half_height), pos)); // bottom right
        this.size = vec2(half_width, half_height);
        this.position = pos;

        super(id, temp_points);
       
        
    }

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
        this.translatev1(vec2(amount, 0));
        this.angle_self = 0;
    }
    /**
     * amount is the movement to the left
     * 1.0 is max
     * @param {float} amount 
     */
    move_left(amount){
        this.translatev1(vec2(-amount, 0));
        this.angle_self = 180;
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
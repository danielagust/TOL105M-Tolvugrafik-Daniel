import char_partent from "./obj_parent_char.js"
/**
    * @param {vec2} size 
    * vec2
    * @param {float} width_screen_end 
    * float
    * @param {vec2} pos
    * vec2
 */
export default class Car extends char_partent{
    /**
     * 
     * @param {vec2} size 
     * @param {float} width_screen_end 
     * @param {vec2} pos 
     */
    constructor(size, width_screen_end, pos){
        var temp_points = [];
        var half_width = size[0]/2;
        var half_height = size[1]/2;
        console.log(size.x);
        console.log(half_height);
        temp_points.push(add(vec2(-half_width,-half_height), pos)); // bottom left
        temp_points.push(add(vec2(-half_width,half_height), pos)); // top left
        temp_points.push(add(vec2(half_width,half_height), pos)); // top right
        temp_points.push(add(vec2(half_width,-half_height), pos)); // bottom right
        super(temp_points); // sent to parent
        this.size = vec2(half_width, half_height);
        this.position = pos;
        this.points = temp_points;
        console.log(this.points);
        
        
        

        
        this.width_screen_end = width_screen_end;
        
        
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

    move_right_wrap(amount){
        this.translatev1_wrap(vec2(amount, 0));
    }

    get Position(){
        return this.position;
    }

    get Size(){
        return this.size;
    }
}
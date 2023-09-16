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
        // console.log(size.x);
        // console.log(half_height);
        temp_points.push(add(vec2(-half_width,-half_height), pos)); // bottom left
        temp_points.push(add(vec2(-half_width,half_height), pos)); // top left
        temp_points.push(add(vec2(half_width,half_height), pos)); // top right
        temp_points.push(add(vec2(half_width,-half_height), pos)); // bottom right
        
        super(temp_points); // sent to parent
        
        this.size = vec2(half_width, half_height);
        this.position = pos;
        this.points = temp_points;
        // console.log(this.points);
        
        
        

        
        this.width_screen_end = width_screen_end;
        
        
    }

    translatev1_wrap(vector){
        var temp_x;
        for ( var i = 0; i < this.points.length; ++i ){
            // temp_x = this.points[i][0]%this.width_screen_end;
            // console.log(temp_x);
            // this.points[i][0] = temp_x;
            // console.log(this.points[i][0])
            
            
            this.points[i] = (add(this.points[i], vector));
            // console.log(this.points[i]);
            temp_x = this.points[i][0]%this.width_screen_end;
            // console.log(temp_x);
            this.points[i][0] = temp_x;
            // console.log(this.points[i]);
            
        }
    }

    translatev2_wrap(vector){
        var temp_points = [];
        var temp_x;
        
        for ( var i = 0; i < this.points.length; ++i ){
            temp_x = this.points[i][0]%this.width_screen_end-1.0;
            this.points[i][0] = temp_x;
            // console.log(this.points[i]);
            temp_points = (add(this.points[i], vector));
        }
          
    }

    translatev3_wrap_right(amount){
        var vector = vec2(amount, 0)
 
        
        
        if (this.points[0][0] >= this.width_screen_end){
            this.points[0] = vec2(-this.size[0]*2-this.width_screen_end,this.points[0][1])
            this.points[1] = vec2(-this.size[0]*2-this.width_screen_end,this.points[1][1])
            this.points[2] = vec2(-this.width_screen_end,this.points[2][1])
            this.points[3] = vec2(-this.width_screen_end,this.points[3][1])
            
        }
        else{
            for ( var i = 0; i < this.points.length; ++i ){
                this.points[i] = add(this.points[i], vector);
            }
        }
        // console.log("width x 1,,,",(Math.abs(this.points[3][0]) -Math.abs(this.points[0][0])))
        // console.log(this.points);
        // console.log("next\n")
        
    }


    move_right_wrap(amount){
        this.translatev3_wrap_right(amount);
    }

    get Position(){
        return this.position;
    }

    get Size(){
        return this.size;
    }
}
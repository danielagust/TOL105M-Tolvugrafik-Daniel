import char_partent from "./obj_parent_char.js"
import Point from "./point.js";
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

       
        
        super(temp_points, size, pos); // sent to parent


        temp_points.push(add(vec2(- half_width,- half_height), pos)); // bottom left
        temp_points.push(add(vec2(- half_width,half_height), pos)); // top left
        temp_points.push(add(vec2( half_width, half_height), pos)); // top right
        temp_points.push(add(vec2( half_width,- half_height), pos)); // bottom right
        

        this.position = pos;
        this.points = temp_points;
        // this.hitbox = temp_points;

        this.top_cornor = new Point(temp_points[1][0], temp_points[1][1]);

        for ( var i = 0; i < this.points.length; ++i ){
            this.hitbox[i].position = this.points[i]
        }

        
        this.width_screen_end = width_screen_end;
        
        
    }

    translatev1_wrap(vector){
        var temp_x;
        for ( var i = 0; i < this.points.length; ++i ){

            
            
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
            this.points[0] = vec2(-this.size[0]-this.width_screen_end,this.points[0][1])
            this.points[1] = vec2(-this.size[0]-this.width_screen_end,this.points[1][1])
            this.points[2] = vec2(-this.width_screen_end,this.points[2][1])
            this.points[3] = vec2(-this.width_screen_end,this.points[3][1])
            

            this.hitbox[0].position = vec2(-this.size[0]-this.width_screen_end,this.points[0][1]) // bottom left
            this.hitbox[1].position = vec2(-this.size[0]-this.width_screen_end,this.points[1][1]) // top left
            this.hitbox[2].position = vec2(-this.width_screen_end,this.points[2][1]) // top right
            this.hitbox[3].position =  vec2(-this.width_screen_end,this.points[3][1]) // bottom right
            
        }
        else{
            for ( var i = 0; i < this.points.length; ++i ){
                this.points[i] = add(this.points[i], vector);
                this.hitbox[i].position = add(this.points[i], vector);
            }
        }

        // this.hitbox = this.points;

        
    }
    // collision( box1, box2 ) {
    //     // console.log(box1);
    //     // console.log(
    //     //     box1.top_cornor.x + box1.width >= box2.top_cornor.x && // box1 right collides with box2 left
    //     //     box2.top_cornor.x + box2.width >= box1.top_cornor.x );
    //     const ref_corner = 0;
    //     // box1 right collides with box2 left
    //     // console.log("box 1 this x bool ", box1.hitbox[ref_corner].x + box1.width >= box2.hitbox[ref_corner].x);
    //     // console.log("box 1 this x value ", box1.hitbox[ref_corner].x + box1.width);
    //     // console.log("");

    //     // // box2 right collides with box1 left
    //     // console.log("box 2 this x bool ", box2.hitbox[ref_corner].x + box2.width >= box1.hitbox[ref_corner].x);
    //     // console.log("box 2 this x value ", box2.hitbox[ref_corner].x + box2.width);
    //     // console.log("");

    //     // // box1 bottom collides with box2 top
    //     // console.log("box 1 this y bool ", box1.hitbox[ref_corner].y + box1.height >= box2.hitbox[ref_corner].y);
    //     // console.log("box 1 this y value ", box1.hitbox[ref_corner].y + box1.height);
    //     // console.log("");

    //     // // box1 top collides with box2 bottom
    //     // console.log("box 2 this y bool ",  box2.hitbox[ref_corner].y + box2.height  >= box1.hitbox[ref_corner].y);
    //     // console.log("box 2 this y value ",  box2.hitbox[ref_corner].y + box2.height);
    //     // console.log("");

    //     // console.log("")

    //     return (
    //       box1.hitbox[ref_corner].x + box1.width >= box2.hitbox[ref_corner].x && // box1 right collides with box2 left
    //       box2.hitbox[ref_corner].x + box2.width >= box1.hitbox[ref_corner].x && // box2 right collides with box1 left
    //       box1.hitbox[ref_corner].y + box1.height <= box2.hitbox[ref_corner].y && // box1 bottom collides with box2 top
    //       box2.hitbox[ref_corner].y + box2.height  <= box1.hitbox[ref_corner].y // box1 top collides with box2 bottom
    //     )
    //   }


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
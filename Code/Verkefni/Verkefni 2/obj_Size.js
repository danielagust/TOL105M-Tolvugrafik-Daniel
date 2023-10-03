export default class obj_Size{
    /**
     * 
     * @param {number} length 
     * @param {number} height 
     * @param {number} width 
     */
    constructor(length, height,width=0.0){
        this.length = length;
        this.height = height;
        this.width = width;
    }

    get position2d(){
        return [this.length, this.height];
    }

    set position2d(new_size){
        this.length = new_size[0];
        this.height = new_size[1];
    }

    get position2d_to_vec(){
        return vec2(this.length, this.height);
    }


    get position3d(){
        return [this.length, this.height, this.width];
    }

    set position3d(new_size){
        this.length = new_size[0];
        this.height = new_size[1];
        this.width = new_size[2];
    }

    get position3d_to_vec(){
        return vec3(this.length, this.height, this.width);
    }
    
}
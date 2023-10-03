export default class obj_Size{
    /**
     * 
     * @param {number} length 
     * @param {number} height 
     * @param {number} width 
     */
    constructor(length, height,width=0.0, thicknes=0.0){
        this.length = length;
        this.height = height;
        this.width = width;
        this.thicknes = thicknes;
    }

    get size2d(){
        return [this.length, this.height];
    }

    set size2d(new_size){
        this.length = new_size[0];
        this.height = new_size[1];
    }

    get size2d_to_vec(){
        return vec2(this.length, this.height);
    }


    get size3d(){
        return [this.length, this.height, this.width];
    }

    set size3d(new_size){
        this.length = new_size[0];
        this.height = new_size[1];
        this.width = new_size[2];
    }

    get size3d_to_vec(){
        return vec3(this.length, this.height, this.width);
    }

    get size_with_thickens(){
        return [this.length, this.height, this.width, this.thicknes];
    }
    
}
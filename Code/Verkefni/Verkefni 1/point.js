export default class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    get position(){
        return [this.x, this.y];
    }

    set position(new_pos){
        this.x = new_pos[0];
        this.y = new_pos[1];
    }

    get position_to_vec(){
        return vec2(this.x, this.y);
    }
    
}
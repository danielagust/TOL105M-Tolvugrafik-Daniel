class car extends char_partent{
    constructor(id, size, width_screen_end, pos){
        var temp_points = [];
        var half_width = size.x/2;
        var half_height = size.y/2;
        temp_points.push(add(vec2(-half_width,-half_height), pos)); // bottom left
        temp_points.push(add(vec2(-half_width,half_height), pos)); // top left
        temp_points.push(add(vec2(half_width,half_height), pos)); // top right
        temp_points.push(add(vec2(half_width,-half_height), pos)); // bottom right
        this.size = vec2(half_width, half_height);
        this.position = pos;
        

        super(id, temp_points); // sent to parent
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
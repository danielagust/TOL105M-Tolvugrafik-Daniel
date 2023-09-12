class thing{
    constructor(id, points){
        this.id = id;
        this.points = points;
    }
    get id(){
        return this.id;
    }
    translatev1(vector){
        for ( var i = 0; i < this.points.length; ++i ){
            this.points[i] = add(this.points[i], vector);
        }
    }
    translatev2(vector){
        var temp_points = [];
        
        for ( var i = 0; i < this.points.length; ++i ){
            temp_points.push(add(this.points[i], vector));
        }
          
    }

    move_right(amount){
        this.translatev1(vec2(amount, 0));
    }

    

}
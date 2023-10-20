export class obj_Color{
    constructor(type){
        this.type = type;
    }

    hex_color(hex, alpha){

    }

    #chunkString(str,start, length) {
        str = str. substring(start)
        return str.match(new RegExp('.{1,' + length + '}', 'g'));
    }
}
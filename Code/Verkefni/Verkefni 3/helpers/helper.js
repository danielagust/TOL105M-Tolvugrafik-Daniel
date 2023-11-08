function radians( degrees ) {
    return degrees * Math.PI / 180.0;
}

function degre(angle){
    return angle * 180/Math.PI;
}

function new_pos(pos1, pos2){
    pos1.set(pos2.x, pos2.y, pos2.z)
}
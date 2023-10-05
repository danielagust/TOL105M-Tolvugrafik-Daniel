float ATan2(vec4 dir);

void main(){
    
}

float ATan2(vec4 dir)
{
    float angle = asin(dir.x) > 0.0 ? acos(dir.y) : -acos(dir.y);
    return angle;
}
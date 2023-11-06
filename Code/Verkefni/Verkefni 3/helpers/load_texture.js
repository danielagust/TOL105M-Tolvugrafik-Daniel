

function load_texture(file_name, ofsett, repeat){
    const loader = new THREE.TextureLoader();
    const texture = loader.load(file_name)
    // console.log(ofsett)
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    texture.repeat.set(repeat[0], repeat[1]);
    // texture.offset.x = ofsett[0];
    // texture.offset.y = ofsett[1];
    // texture.center.set(0.5,0.5)
    console.log(texture.center)

    texture.offset.set(ofsett[0], ofsett[1])
    return texture
}

function get_phong(file_name, ofsett, repeat){
    
}
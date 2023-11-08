

function load_texturev2(file_name, ofsett, repeat){
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
    // console.log(texture.center)

    texture.offset.set(ofsett[0], ofsett[1])
    return texture
}
function load_texturev1(file_name){
    const loader = new THREE.TextureLoader();
    const texture = loader.load(file_name)
    // console.log(ofsett)
    texture.magFilter = THREE.LinearFilter;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    
    return texture
}

function make_texture_side(length, height, has_alpha, filenames){
    var result = {};
    result.basecolor = load_texturev2(filenames.basecolor, [0.0,0.0], [length,height])
  
    result.ambientOcclusion = load_texturev2(filenames.ambientOcclusion, [0.0,0.0], [length,height])
    
    result.normal = load_texturev2(filenames.normal, [0.0,0.0], [length,height])
    
    result.roughness = load_texturev2(filenames.roughness, [0.0,0.0], [length,height])
    
    
    result.alpha_map = null
    
    return result;
}

/**
 * 
 * @param {Texture} basecolor .map
 * @param {Texture} ambientOcclusion .aoMap
 * @param {Texture} height .displacementMap 
 * @param {Texture} normal .normalMap
 * @param {Texture} roughnes .bumpMap
 */
function get_phong(basecolor, ambientOcclusion, normal ,roughness, alpha_map){
    if (alpha_map == null){
        const planeMaterial = new THREE.MeshPhongMaterial(
            {
                map:basecolor,
                aoMap: ambientOcclusion,
                
                normalMap: normal,
                bumpMap:roughness
            }
        )
        return planeMaterial
    }
    else{
        const planeMaterial = new THREE.MeshPhongMaterial(
            {
                map:basecolor,
                aoMap: ambientOcclusion,
                alphaMap: alpha_map,
                normalMap: normal,
                bumpMap:roughness
            }
        )
        // console.log("helllo")
        return planeMaterial
    }
    
    
    
    
}
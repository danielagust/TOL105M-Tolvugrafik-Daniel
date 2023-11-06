

function load_model(model_filename, model_texure, model_normal_texture){
    const objLoader = new THREE.OBJLoader();
    const loader = new THREE.TextureLoader();
    
    

    const texture = loader.load(model_texure);
    const normal = loader.load(model_normal_texture);
    const material = new THREE.MeshPhongMaterial({ map: texture, normalMap:normal});
    const model_exit = new THREE.Object3D();
    
    objLoader.load(model_filename, (model) => {
        model.traverse( child => {
            if (child.isMesh){
                child.material = material;
                
            }
        })
        model_exit.add(model);
    });
    return model_exit
}
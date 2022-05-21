function Enemy(scene, x, y) {

    let cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xB03014 });
    let adversario = new THREE.Mesh(cubeGeometry, cubeMaterial);
    adversario.position.set(x, y, 2.0);
    scene.add(adversario);
}
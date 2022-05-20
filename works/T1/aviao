function mainAirPlane(scene) {

    const geometry = new THREE.ConeGeometry(.8, 3, 30);
    const airplaneMaterial = new THREE.MeshLambertMaterial({ color: 0xFAFAD2 });
    const airplane = new THREE.Mesh(geometry, airplaneMaterial);
    airplane.position.set(0, 0, 2);
    scene.add(airplane);

    this.update = function () {
        if (this.model)
            this.model.position.y += 1;
    }

}
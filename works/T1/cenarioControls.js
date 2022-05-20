function cenarioControl() {

    const scene = new THREE.Scene();
    const renderer = initRenderer();
    new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.lookAt(0, -1, -.9);
    camera.position.set(0, 20, 20);
    camera.up.set(0, 0, 0);
    window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);


    var cameraHolder = new THREE.Object3D();
    cameraHolder.add(camera);
    scene.add(cameraHolder);

    var aviao, fundo, adversarios;

    initDefaultBasicLight(scene);

    const dynamicSubjects = [];
    criaObjetos();

    var keyMap = [];

    function criaObjetos() {
        fundo = new Plano(scene);
        aviao = new mainAirPlane(scene);
        adversarios = posicionaAdversario(scene);

        dynamicSubjects.push(aviao);
    }

    this.update = function () {
        if (camera.position.y < 2000) {
            camera.position.y += 1;

            for (let i = 0; i < dynamicSubjects.length; i++)
                dynamicSubjects[i].update();

            aviao.handleInput(keyMap, camera);

            renderer.render(scene, camera);
        }
    }

    this.handleInput = function (keyCode, isDown) {
        keyMap[keyCode] = isDown;
    }

}
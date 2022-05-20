import * as THREE from 'three';
import { Color } from '../../build/three.module.js';
//import { Sphere } from '/../../build/three.module';
import KeyboardState from '../../libs/util/KeyboardState.js';
import {
    initRenderer,
    initDefaultBasicLight,
    initCamera,
    InfoBox,
    onWindowResize,
    createGroundPlaneWired
} from "../../libs/util/util.js";

const renderer = initRenderer();

showInformation();
render();

function disparaProjeteis() {
    const ballMaterial = new THREE.MeshLambertMaterial({ color: 0x202020 });
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.4, 14, 10), ballMaterial);
    pos.copy(raycaster.ray.direction);
    pos.add(raycaster.ray.origin);
    quat.set(0, 0, 0, 1);
    const ballBody = createRigidBody(ball, ballShape, 35, pos, quat);

    pos.copy(raycaster.ray.direction);
    pos.multiplyScalar(24);
}

function showInformation() {
    var controls = new InfoBox();
    controls.add("Computer Graphics");
    controls.addParagraph();
    controls.add("Use keyboard arrows to move the airplane");
    controls.show();
}

function Plano(scene, height) {

    var bg = createGroundPlaneWired(70, 70, 50, 50);
    scene.add(bg);

    this.update = function () {

    }

}

function mainAirPlane() {

    const geometry = new THREE.ConeGeometry(.8, 3, 30);
    const airplaneMaterial = new THREE.MeshLambertMaterial({ color: 0xFAFAD2 });
    const airplane = new THREE.Mesh(geometry, airplaneMaterial);
    airplane.position.set(0, 2.4, 0);
    airplane.rotateX(-1.4);

    this.update = function () {
        if (this.model)
            this.model.position.y += 1;
    }

    var keyboard = new KeyboardState();
    function keyboardUpdate() {
        keyboard.update();

        if (keyboard.pressed("left")) airplane.translateX(-1);
        if (keyboard.pressed("right")) airplane.translateX(1);
        if (keyboard.pressed("up")) airplane.translateY(1);
        if (keyboard.pressed("down")) airplane.translateY(-1);
        if (keyboard.pressed("ctrl")) disparaProjeteis();
        if (keyboard.pressed("space")) disparaProjeteis();
    }
    keyboardUpdate();
    scene.add(airplane);

}

function Enemy(scene, x, y) {

    let cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xB03014 });
    let adversario = new THREE.Mesh(cubeGeometry, cubeMaterial);
    adversario.position.set(x, y, 2.0);
    scene.add(adversario);
}

function posicionaAdversario(scene) {

    const adversarios = [];

    [...Array(5).keys()].map(y => {

        getRandomPositions().map(x => {
            const e = new Enemy(scene, 0, 2);
            adversarios.push(e);
        });
    });

    return adversarios;

    function getRandomPositions() {

        var noEnemies = Math.floor((Math.random() * 4));

        var arr = [...Array(9).keys()];

        for (let i = arr.length - 1; i > 0; i--) {

            const j = Math.floor(Math.random() * i);
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }

        return arr.slice(0, noEnemies);
    }


}

function cenarioControl() {

    const scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
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

    cenarioControl.update = function () {
        if (camera.position.y < 2000) {
            camera.position.y += 1;

            //for (let i = 0; i < dynamicSubjects.length; i++)
            //  dynamicSubjects[i].update();

            //aviao.handleInput(keyMap, camera);

            renderer.render(scene, camera);
        }
    }

    //cenarioControl.handleInput = function (keyCode, isDown) {
    //  keyMap[keyCode] = isDown;
    //}

}

function render() {
    cenarioControl();
    requestAnimationFrame(render);
    cenarioControl.update();
}
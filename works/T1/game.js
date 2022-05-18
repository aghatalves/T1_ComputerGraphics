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

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // Init a basic renderer


var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.lookAt(0, -1, -.9);
camera.position.set(0, 20, 20);
camera.up.set(0, 0, 0);
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

showInformation();

var plane = createGroundPlaneWired(70, 70, 50, 50);
scene.add(plane);

const geometry = new THREE.ConeGeometry(.8, 3, 30);
const material = new THREE.MeshLambertMaterial();//preto - 0x202020 vermelho - 0xB03014
const airplane = new THREE.Mesh(geometry, material);
airplane.position.set(0.0, 0, 2);
plane.add(airplane);

var keyboard = new KeyboardState();

var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
scene.add(cameraHolder);

initDefaultBasicLight(scene);
render();

function keyboardUpdate() {
    keyboard.update();

    if (keyboard.pressed("left")) airplane.translateX(-1);
    if (keyboard.pressed("right")) airplane.translateX(1);
    if (keyboard.pressed("up")) airplane.translateY(1);
    if (keyboard.pressed("down")) airplane.translateY(-1);
}

function showInformation() {
    var controls = new InfoBox();
    controls.add("Computer Graphics");
    controls.addParagraph();
    controls.add("Use keyboard arrows to move the airplane");
    controls.show();
}



function render() {
    keyboardUpdate();
    requestAnimationFrame(render);
    renderer.render(scene, camera) // Render scene
}
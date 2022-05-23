import * as THREE from 'three';
import { Color, CullFaceNone } from '../../build/three.module.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
import { keyboardUpdate, airplane, missiles } from "./airplane.js";
import { placeEnemy, enemy } from "./enemySettings.js";
import { initRenderer, initDefaultBasicLight, InfoBox, onWindowResize, createGroundPlaneWired } from "../../libs/util/util.js";

export var scene = new THREE.Scene();
const renderer = initRenderer();
export var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.lookAt(0, -1, -.9);
camera.position.set(0, 20, 20);
camera.up.set(0, 0, 0);
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

export var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
scene.add(cameraHolder);

var backgrounds = [];

var background = createGroundPlaneWired(80, 80, 50, 50);
background.position.set(0, 0, 0);
scene.add(background);
cameraHolder.add(airplane);

var Zposition = 1;

initDefaultBasicLight(scene);
showInformation();
render();

function movingCamera(camera) {
    camera.translateZ(-.3);
}

export function reset() {
    enemy.forEach((e) => {
        scene.remove(e);
    });
    enemy.length = 0;
    missiles.length = 0;
    airplane.position.set(0, 2.5, 0);
}

setInterval(placeEnemy, "3000");

function placingScene() {
    var backgroundAssistant = createGroundPlaneWired(80, 80, 50, 50);
    scene.add(backgroundAssistant);
    backgrounds.push(backgroundAssistant);
    var nextZPosition = Zposition * -72;
    backgroundAssistant.position.set(0, 0, nextZPosition);
    Zposition++;
    var aux = 1;
    if (cameraHolder.position.z <= aux * -50) {
        scene.remove(backgroundAssistant); 0
        backgrounds = backgrounds.filter((e) => e.id !== backgroundAssistant.id);
        aux++;
        return;
    }
    return;
}

setInterval(placingScene, "1500");

function showInformation() {
    var controls = new InfoBox();
    controls.add("Plane Shooter - DCC065 Assignment");
    controls.addParagraph();
    controls.add("Use keyboard arrows to move the airplane");
    controls.add("Press space or ctrl to shoot the enemies");
    controls.addParagraph();
    controls.add("Student: Ághata S. Alves")
    controls.addParagraph();
    controls.show();
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera)
    movingCamera(cameraHolder);
    keyboardUpdate();
}
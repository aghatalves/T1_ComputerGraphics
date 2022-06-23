import * as THREE from 'three';
import { keyboardUpdate, airplane, missiles } from "./airplane.js";
import { placeVerticalEnemy, placeHorizontalEnemy, placeReverseHorizontalEnemy, enemy } from "./enemySettings.js";
import { initRenderer, initDefaultBasicLight, InfoBox, onWindowResize, createGroundPlaneWired } from "../../libs/util/util.js";



export var scene = new THREE.Scene();
const renderer = initRenderer();
export var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.lookAt(0, -1, -.9);
camera.position.set(0, 45, 50);
camera.up.set(0, 0, 0);
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

export var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
scene.add(cameraHolder);

var background = createGroundPlaneWired(180, 180, 80, 80);
background.position.set(0, 0, 0);
scene.add(background);

var backgorundAux = createGroundPlaneWired(180, 180, 80, 80);
backgorundAux.position.set(0,0,-180);
scene.add(backgorundAux);
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
    airplane.position.set(0, 27, 40);
}

setInterval(placeVerticalEnemy, "3000");
setInterval(placeHorizontalEnemy, "3000");
setInterval(placeReverseHorizontalEnemy, "3000");
//setInterval(placingScene, "500");

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
    //movingCamera(cameraHolder);
    keyboardUpdate();
}
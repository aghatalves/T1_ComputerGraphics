import * as THREE from 'three';
import { Color, CullFaceNone } from '../../build/three.module.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
import {
    initRenderer,
    initDefaultBasicLight,
    initCamera,
    InfoBox,
    onWindowResize,
    createGroundPlaneWired
} from "../../libs/util/util.js";
let scene = new THREE.Scene(); 
const renderer = initRenderer();
var keyboard = new KeyboardState();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.lookAt(0, -1, -.9);
    camera.position.set(0, 20, 20);
    camera.up.set(0, 0, 0);
    window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

var cameraHolder = new THREE.Object3D();
    cameraHolder.add(camera);
    scene.add(cameraHolder);

var airplane, missile, background;

 background = createGroundPlaneWired(80, 80, 50, 50);
    scene.add(background);

assistantBackground = createGroundPlaneWired(80,80,50,50);
scene.add(assistantBackground);

var geometry = new THREE.ConeGeometry(.8, 3, 30);
var airplaneMaterial = new THREE.MeshLambertMaterial(0xB3B865);
 airplane = new THREE.Mesh(geometry, airplaneMaterial);
    airplane.position.set(0, 2, 0);
    airplane.rotateX(-1.4);
    cameraHolder.add(airplane);

const missileGeometry = new THREE.SphereGeometry( 0.4, 14, 10 );
const material = new THREE.MeshBasicMaterial( { color: 0x202020 } );
 missile = new THREE.Mesh( missileGeometry, material );

 let cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xB03014 });
    var enemy = new THREE.Mesh(cubeGeometry,cubeMaterial);

initDefaultBasicLight(scene);
showInformation();
render();

function moveCamera(camera)
{
    camera.translateZ(-.1);
}

function keyboardUpdate() 
{
    keyboard.update();
    if (keyboard.pressed("left")) airplane.translateX(-.3);
    if (keyboard.pressed("right")) airplane.translateX(.3);
    if (keyboard.pressed("up")) airplane.translateY(.3);
    if (keyboard.pressed("down")) airplane.translateY(-.3);
    if (keyboard.pressed("ctrl")) shoot();
    if (keyboard.pressed("space")) shoot();
}

function showInformation() 
{
    var controls = new InfoBox();
    controls.add("Plane Shooter - DCC065 Assignment");
    controls.addParagraph();
    controls.add("Use keyboard arrows to move the airplane");
    controls.add("Press space or ctrl to shoot the enemies");
    controls.addParagraph();
    controls.add("Developer: Ághata S. Alves")
    controls.addParagraph();
    controls.show();
}

function shoot()
{
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( airplane.matrixWorld );
    missile.position.set(position.x, position.y, position.z);
    scene.add(missile);
}

function shootMove(missile) 
{
    missile.translateZ(-.4);
}

function enemy() 
{
    scene.updateMatrixWorld(true);
    var position = new THREE.Vector3();
    position.setFromMatrixPosition( background.matrixWorld );
    enemy.position.set(0, background, position.z);
    background.add(enemy);
    /*
    let cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
    const cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xB03014 });
    var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.position.set(0,7,2);
    const enemies = [];

	[...Array(5).keys()].map(y => {

		getRandomPositions().map(x => { 
			const e = new THREE.Mesh(cubeGeometry,cubeMaterial);
			enemies.push(e);
		});
	});
        enemies.translateZ(.4);
	return enemies;
	
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
    }*/

}

function enemyMovement()
{
    cube.translateY(-.4);
}

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera)
    //moveCamera(cameraHolder);
    shootMove(missile);
    keyboardUpdate();
    enemyMovement();
}
import * as THREE from 'three';
import { Color, CullFaceNone } from '../../build/three.module.js';
import KeyboardState from '../../libs/util/KeyboardState.js';
import { placeEnemy, enemy } from "./enemySettings.js";
import { reset, scene } from "./main.js";
import checkingCollision from "./collisionMechanic.js";
import { initRenderer, initDefaultBasicLight, initCamera, InfoBox, onWindowResize, createGroundPlaneWired } from "../../libs/util/util.js";

const geometry = new THREE.ConeGeometry(.8, 3, 30);
const airplaneMaterial = new THREE.MeshLambertMaterial({ color: 0xFAFAD2 });
export var airplane = new THREE.Mesh(geometry, airplaneMaterial);
airplane.position.set(0, 2, 0);
airplane.rotateX(-1.4);

var keyboard = new KeyboardState();
    export function keyboardUpdate() 
{
    keyboard.update();
    if (keyboard.pressed("left")) airplane.translateX(-.3);
    if (keyboard.pressed("right")) airplane.translateX(.3);
    if (keyboard.pressed("up")) airplane.translateY(.3);
    if (keyboard.pressed("down")) airplane.translateY(-.3);
    if (keyboard.pressed("ctrl")) shoot();
    if (keyboard.pressed("space")) shoot();
}

export var missiles = [];
    export function shoot()
{
    const missileGeometry = new THREE.SphereGeometry( 0.4, 14, 10 );
    const material = new THREE.MeshBasicMaterial( { color: 0x202020 } );
    var missile = new THREE.Mesh( missileGeometry, material );
    missiles.push(missile);
    missile.position.set(airplane.position.x, airplane.position.y, airplane.position.z);
    scene.add(missile);

    setInterval(() => 
    {
    missile.translateZ(-0.2);

    if (missile.position.z >= 160) 
    {
      scene.remove(missile);
      missiles = missiles.filter((p) => p.id !== missile.id);
      return;
    }

    enemy.forEach((enemyHit) => 
    {
      if (checkingCollision(missile, enemyHit)) 
      {
        scene.remove(missile);
        enemyHit.position.set(0, 0, 0);
        scene.remove(enemyHit);
        return;
      }
    });
  }, "10");

  return;
}

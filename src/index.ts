// add styles
// three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import "./style.css";

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  orbitControls: OrbitControls;

let cameraHorzLimit: number = 8;
let cameraVertLimit: number = 10;
let cameraCenter = new THREE.Vector3();
let mouse = new THREE.Vector2();

function init() {
  // Init
  camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Start Camera Position
  camera.position.set(-30, 30, 25); // camera.position.set( <X> , <Y> , <Z> );

  cameraCenter.x = camera.position.x;
  cameraCenter.y = camera.position.y;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000); // Body background
  document.body.appendChild(renderer.domElement);

  // Camera 360deg

  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.enableDamping = true;
  // orbitControls.dampingFactor = 0.25;
  // orbitControls.enableZoom = true;
  orbitControls.update();

  // Light
  // const pointLight = new THREE.PointLight( 0xffffff, .3, 100 );
  // camera.add( pointLight );
  // scene.add( camera );

  // let cubeLight = new THREE.PointLight( 0xffffff, .12, 0);
  // cubeLight.position.y = 25;
  // scene.add( cubeLight );

  // SquareLight
  const square = new THREE.BoxGeometry(4.5, 4.5, 4.5);
  let cubeLight = new THREE.PointLight(0xffffff, 0.7, 40);
  cubeLight.add(
    new THREE.Mesh(square, new THREE.MeshBasicMaterial({ color: 0xffffff }))
  );

  cubeLight.position.set(7.5, 5, 11);

  scene.add(cubeLight);
}

function animate() {
  requestAnimationFrame(animate);

  orbitControls.update();
  renderer.render(scene, camera);
  render();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function initObjects() {
  const loader = new OBJLoader();

  loader.load("/src/assets/models/background.obj", function (object) {
    // const materialScene = new THREE.MeshBasicMaterial( { color: 0x000000, roughness: 1 } );

    // object.traverse( function ( child ) {
    // 	if ( child instanceof THREE.Mesh ){
    // 		child.material = materialScene;
    // 	}
    // });

    object.scale.x = 0.2;
    object.scale.y = 0.2;
    object.scale.z = 0.2;

    scene.add(object);
  });

  loader.load("/src/assets/models/lines.obj", function (object) {
    const materialScene = new THREE.MeshBasicMaterial({ color: 0xffffff });

    object.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = materialScene;
      }
    });

    object.position.set(8, 5, 15);

    object.scale.x = 0.2;
    object.scale.y = 0.2;
    object.scale.z = 0.2;
    scene.add(object);
  });
}

function render() {
  camera.position.x = cameraCenter.x + cameraHorzLimit * mouse.x;
  camera.position.y = cameraCenter.y + cameraVertLimit * mouse.y;
}

function onDocumentMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener("resize", onWindowResize, false);
document.addEventListener("mousemove", onDocumentMouseMove, false);

init();
initObjects();
animate();

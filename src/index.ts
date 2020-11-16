// add styles
// three.js
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module.js";
import { RectAreaLightUniformsLib } from "three/examples/jsm/lights/RectAreaLightUniformsLib";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import "./style.css";

let scene: THREE.Scene,
  camera: THREE.PerspectiveCamera,
  renderer: THREE.WebGLRenderer,
  orbitControls: OrbitControls,
  stats: Stats;

let cameraCenter: THREE.Vector3 = new THREE.Vector3();

let container: HTMLElement;

function init() {
  container = document.getElementById("JS-3d");

  // Init
  camera = new THREE.PerspectiveCamera(
    18,
    window.innerWidth / window.innerHeight,
    0.1,
    6000
  );

  // Start Camera Position
  camera.position.set(120, 120, 120); // camera.position.set( <X> , <Y> , <Z> );
  cameraCenter.x = camera.position.x;
  cameraCenter.y = camera.position.y;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.BasicShadowMap;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000); // Body background
  //   scene.fog = new THREE.FogExp2( 0x000000, 0.002 ); // Fog

  document.body.appendChild(container);

  container.appendChild(renderer.domElement);

  stats = Stats();
  // stats.showPanel(1);
  container.appendChild(stats.dom);

  // controls
  orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.minDistance = 10;
  orbitControls.maxDistance = 1000;
  orbitControls.enablePan = false;

  //Axes
  // const axesHelper = new THREE.AxesHelper(20);
  // axesHelper.position.set(0, 10, 100);
  // scene.add(axesHelper);

  //RectAreaLight
  RectAreaLightUniformsLib.init();

  let cubeLight1 = new THREE.RectAreaLight(0xffffff, 6, 12, 40);
  cubeLight1.position.set(6, 8, 0);
  cubeLight1.lookAt(100, 8, 0);
  scene.add(cubeLight1);

  let cubeLight2 = new THREE.RectAreaLight(0xffffff, 6, 12, 40);
  cubeLight2.position.set(0, 8, 6);
  cubeLight2.lookAt(0, 8, 100);
  scene.add(cubeLight2);

  let cubeLight3 = new THREE.RectAreaLight(0xffffff, 6, 12, 40);
  cubeLight3.position.set(-6, 8, 0);
  cubeLight3.lookAt(-100, 8, 0);
  scene.add(cubeLight3);

  let cubeLight4 = new THREE.RectAreaLight(0xffffff, 6, 12, 40);
  cubeLight4.position.set(0, 8, -6);
  cubeLight4.lookAt(0, 8, -100);
  scene.add(cubeLight4);

  const lightShape = new THREE.BoxBufferGeometry(12, 20, 12);
  const matStdFloor = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const mshStdFloor = new THREE.Mesh(lightShape, matStdFloor);
  mshStdFloor.position.set(0, 6, 0);
  scene.add(mshStdFloor);

  // let rectLight1 = new THREE.RectAreaLight( 0xffffff, 20, 4, 100 );
  // rectLight1.position.set( 4, 30, 4 );
  // rectLight1.lookAt( 4, -100, 4 );
  // scene.add( rectLight1 );

  // let rectLight2 = new THREE.RectAreaLight( 0xffffff, 20, 100, 4 );
  // rectLight2.position.set( 20, 30, 4 );
  // rectLight2.lookAt( 20, -100, 4 );
  // scene.add( rectLight2 );

  //AMBIENT
  // let ambient = new THREE.AmbientLight( 0x000000, 0.2);
  // scene.add( ambient );

  //HEMI
  // let hemi = new THREE.HemisphereLight( 0xffffff, 0.2);
  // scene.add( hemi );

  //TEST_LIGHT
  // let light1 = new THREE.PointLight( 0xffffff, 1, 200 );
  // light1.castShadow = true;
  // light1.shadow.mapSize.width = 1024;
  // light1.shadow.mapSize.height = 1024;
  // light1.shadow.camera.near = 0.5;
  // light1.shadow.camera.far = 200;
  // light1.shadow.normalBias = 0.1;
  // light1.shadow.bias = 0.0001;

  // light1.position.set(0,20,0);
  // scene.add( light1 );

  window.addEventListener("resize", onWindowResize, false);
}

//cubemap
const path = "/src/assets/textures/cube/";
const format = ".jpg";
const urls = [
  path + "px" + format,
  path + "nx" + format,
  path + "py" + format,
  path + "ny" + format,
  path + "pz" + format,
  path + "nz" + format,
];
const reflectionCube = new THREE.CubeTextureLoader().load(urls);

function initObjects() {
  let loader = new OBJLoader();

  //SHPERE
  // const sphere = new THREE.SphereBufferGeometry( 5, 32, 32 );
  // 			const matSphere = new THREE.MeshStandardMaterial( { color: 0x212121, metalness:1, roughness: 0, envMap: reflectionCube } );
  //       const mshSphere = new THREE.Mesh( sphere, matSphere );
  //       mshSphere.position.set( 0, 10, 0 );
  // 			scene.add( mshSphere );

  //FLOOR
  // loader.load("/src/assets/models/background_3.obj", function (floor) {
  // const blackMaterial = new THREE.MeshStandardMaterial( { color: 0x212121, metalness: 0, roughness: 0.3, transparent: true, opacity: 1, envMap: reflectionCube} );

  //   floor.traverse(function (child) {
  //     if (child instanceof THREE.Mesh) {
  //       child.material = blackMaterial;
  //       child.castShadow = true;
  //       child.receiveShadow = true;
  //     }
  //   });

  //   scene.add(floor);

  //   floor.scale.set(0.5,0.5,0.5);
  // });

  let loadObjectSrc = "/src/assets/models/background.obj";
  let ObjMaterial = new THREE.MeshStandardMaterial({
    color: 0x121212,
    roughness: 0.3,
    envMap: reflectionCube,
    transparent: false,
    opacity: 1,
  });

  function setMaterial(obj: THREE.Group) {
    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = ObjMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  // Level1

  // const lightShape = new THREE.BoxBufferGeometry( 40, 0.1, 4 );
  // 				const matStdFloor = new THREE.MeshBasicMaterial( { color: 0xffffff } );
  //         const mshStdFloor = new THREE.Mesh( lightShape, matStdFloor );
  //         mshStdFloor.position.set( 2, 20, 2 );
  // 				scene.add( mshStdFloor );

  const listOfObjects: THREE.Group[] = [];

  let level1ObjScale = 1;
  let level2ObjScale = 1.5;
  let level3ObjScale = 2.5;
  let level4ObjScale = 2;

  interface PositionType {
    x: number;
    y: number;
    z: number;
  }

  function createTile(
    object: THREE.Group,
    scale: number,
    position: PositionType,
    rotationY: number = 0
  ) {
    object.scale.multiplyScalar(scale);
    object.position.set(position.x, position.y, position.z);
    setMaterial(object);

    object.rotation.y = rotationY;
    listOfObjects.push(object);
  }

  loader.load(loadObjectSrc, function (object) {
    setMaterial(object);

    // Level_1
    let obj1_1Position: PositionType = {
      x: 10,
      y: Math.PI / 2,
      z: -10,
    };
    createTile(object.clone(), level1ObjScale, obj1_1Position, Math.PI / 2);

    let obj1_2Position: PositionType = {
      x: 10,
      y: Math.PI / -2,
      z: 10,
    };
    createTile(object.clone(), level1ObjScale, obj1_2Position, Math.PI / -2);

    let obj1_3Position: PositionType = {
      x: -10,
      y: 0,
      z: 10,
    };
    createTile(object.clone(), level1ObjScale, obj1_3Position);

    let obj1_4Position: PositionType = {
      x: -10,
      y: Math.PI / 2,
      z: -10,
    };
    createTile(object.clone(), level1ObjScale, obj1_4Position, Math.PI / 2);

    // Level_2
    let obj2_1Position: PositionType = {
      x: 0,
      y: 1,
      z: -32,
    };
    createTile(object.clone(), level2ObjScale, obj2_1Position, Math.PI / 2);

    let obj2_2Position: PositionType = {
      x: 32,
      y: 1,
      z: 1,
    };
    createTile(object.clone(), level2ObjScale, obj2_2Position);

    let obj2_3Position: PositionType = {
      x: 0,
      y: 1,
      z: 32,
    };
    createTile(object.clone(), level2ObjScale, obj2_3Position, Math.PI / -2);

    let obj2_4Position: PositionType = {
      x: -32,
      y: 1,
      z: 1,
    };
    createTile(object.clone(), level2ObjScale, obj2_4Position);

    // Level 3
    let obj3_1Position: PositionType = {
      x: 42,
      y: 0,
      z: -42,
    };
    createTile(object.clone(), level3ObjScale, obj3_1Position, Math.PI / 2);

    let obj3_2Position: PositionType = {
      x: 42,
      y: 0,
      z: 42,
    };
    createTile(object.clone(), level3ObjScale, obj3_2Position);

    let obj3_3Position: PositionType = {
      x: -42,
      y: 0,
      z: 42,
    };
    createTile(object.clone(), level3ObjScale, obj3_3Position, Math.PI / -2);

    let obj3_4Position: PositionType = {
      x: -42,
      y: 0,
      z: -42,
    };
    createTile(object.clone(), level3ObjScale, obj3_4Position, Math.PI / 2);

    // Level4

    let obj4_1Position: PositionType = {
      x: 0,
      y: 4,
      z: -60,
    };
    createTile(object.clone(), level4ObjScale, obj4_1Position, Math.PI / -2);

    let obj4_2Position: PositionType = {
      x: 60,
      y: 4,
      z: 0,
    };
    createTile(object.clone(), level4ObjScale, obj4_2Position, Math.PI / 2);

    let obj4_3Position: PositionType = {
      x: 0,
      y: 4,
      z: 60,
    };
    createTile(object.clone(), level4ObjScale, obj4_3Position, Math.PI / 2);

    let obj4_4Position: PositionType = {
      x: -60,
      y: 4,
      z: 0,
    };
    createTile(object.clone(), level4ObjScale, obj4_4Position, Math.PI / -2);

    scene.add(...listOfObjects);
  });

  // loader.load(loadObjectSrc, function (obj1_1) {
  //   obj1_1.scale.multiplyScalar(level1ObjScale);
  //   setMaterial(obj1_1);

  //   obj1_1.position.set(10, Math.PI / 2, -10);

  //   scene.add(obj1_1);
  // });

  // loader.load(loadObjectSrc, function (obj1_2) {
  //   obj1_2.scale.multiplyScalar(level1ObjScale);
  //   obj1_2.position.set(10, Math.PI / -2, 10);
  //   setMaterial(obj1_2);

  //   scene.add(obj1_2);
  // });

  // loader.load(loadObjectSrc, function (obj1_3) {
  //   obj1_3.scale.multiplyScalar(level1ObjScale);
  //   obj1_3.position.set(-10, 0, 10);
  //   setMaterial(obj1_3);

  //   scene.add(obj1_3);
  // });

  // loader.load(loadObjectSrc, function (obj1_4) {
  //   obj1_4.scale.multiplyScalar(level1ObjScale);
  //   obj1_4.position.set(-10, Math.PI / 2, -10);
  //   setMaterial(obj1_4);

  //   scene.add(obj1_4);
  // });

  // // Level2

  // let level2ObjScale = 1.5;

  // loader.load(loadObjectSrc, function (obj2_1) {
  //   obj2_1.scale.multiplyScalar(level2ObjScale);
  //   obj2_1.position.set(0, 1, -32);
  //   setMaterial(obj2_1);

  //   scene.add(obj2_1);
  // });

  // loader.load(loadObjectSrc, function (obj2_2) {
  //   obj2_2.scale.multiplyScalar(level2ObjScale);
  //   obj2_2.position.set(32, 1, 1);
  //   setMaterial(obj2_2);

  //   scene.add(obj2_2);
  // });

  // loader.load(loadObjectSrc, function (obj2_3) {
  //   obj2_3.scale.multiplyScalar(level2ObjScale);
  //   obj2_3.position.set(0, 1, 32);
  //   setMaterial(obj2_3);

  //   scene.add(obj2_3);
  // });

  // loader.load(loadObjectSrc, function (obj2_4) {
  //   obj2_4.scale.multiplyScalar(level2ObjScale);
  //   obj2_4.position.set(-32, 1, 1);
  //   setMaterial(obj2_4);

  //   scene.add(obj2_4);
  // });

  // // Level3

  // let level3ObjScale = 2.5;

  // loader.load(loadObjectSrc, function (obj3_1) {
  //   obj3_1.scale.multiplyScalar(level3ObjScale);
  //   obj3_1.position.set(42, 0, -42);
  //   setMaterial(obj3_1);

  //   scene.add(obj3_1);
  // });

  // loader.load(loadObjectSrc, function (obj3_2) {
  //   obj3_2.scale.multiplyScalar(level3ObjScale);
  //   obj3_2.position.set(42, 0, 42);
  //   setMaterial(obj3_2);

  //   scene.add(obj3_2);
  // });

  // loader.load(loadObjectSrc, function (obj3_3) {
  //   obj3_3.scale.multiplyScalar(level3ObjScale);
  //   obj3_3.position.set(-42, 0, 42);
  //   setMaterial(obj3_3);

  //   scene.add(obj3_3);
  // });

  // loader.load(loadObjectSrc, function (obj3_4) {
  //   obj3_4.scale.multiplyScalar(level3ObjScale);
  //   obj3_4.position.set(-42, 0, -42);
  //   setMaterial(obj3_4);

  //   scene.add(obj3_4);
  // });

  // // Level4

  // let level4ObjScale = 2;

  // loader.load(loadObjectSrc, function (obj4_1) {
  //   obj4_1.scale.multiplyScalar(level4ObjScale);
  //   obj4_1.position.set(0, 4, -60);
  //   setMaterial(obj4_1);

  //   scene.add(obj4_1);
  // });

  // loader.load(loadObjectSrc, function (obj4_2) {
  //   obj4_2.scale.multiplyScalar(level4ObjScale);
  //   obj4_2.position.set(60, 4, 0);
  //   setMaterial(obj4_2);

  //   scene.add(obj4_2);
  // });

  // loader.load(loadObjectSrc, function (obj4_3) {
  //   obj4_3.scale.multiplyScalar(level4ObjScale);
  //   obj4_3.position.set(0, 4, 60);
  //   setMaterial(obj4_3);

  //   scene.add(obj4_3);
  // });

  // loader.load(loadObjectSrc, function (obj4_4) {
  //   obj4_4.scale.multiplyScalar(level4ObjScale);
  //   obj4_4.position.set(-60, 4, 0);
  //   setMaterial(obj4_4);
  //   scene.add(obj4_4);
  // });

  //LIGHT_CUBE
  // loader.load("/src/assets/models/cube.obj", function (object) {
  // const whiteMaterial = new THREE.MeshBasicMaterial({
  //     color: 0xffffff,

  //   });

  //   object.traverse(function (child) {
  //     if (child instanceof THREE.Mesh) {
  // 	child.material = whiteMaterial;
  // 	child.castShadow = false;

  //     }
  //   });

  //   scene.add(object);

  //   object.position.set(0,4,0);
  //   object.scale.set(0.4,0.4,0.4);
  // });

  //LINES1

  function setWhiteMaterial(obj: THREE.Group) {
    const whiteMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = whiteMaterial;
      }
    });
  }

  loader.load("/src/assets/models/lines.obj", function (object) {
    setWhiteMaterial(object);
    object.position.set(0, 6, 3);
    object.scale.set(0.2, 0.2, 0.2);

    scene.add(object);
  });

  //LINES2
  loader.load("/src/assets/models/lines.obj", function (object) {
    setWhiteMaterial(object);
    object.position.set(0, 8, 0);
    object.scale.set(0.3, -4, 0.3);
    scene.add(object);
  });
}

function animate() {
  requestAnimationFrame(animate);
  orbitControls.update();
  renderer.render(scene, camera);
  stats.update();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// function onDocumentMouseMove(event) {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// }

// document.addEventListener("mousemove", onDocumentMouseMove, false);

init();
initObjects();
animate();

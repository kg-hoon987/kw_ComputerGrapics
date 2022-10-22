import * as THREE from 'three';
import {OrbitControls} from "../node_modules/three/examples/jsm/controls/OrbitControls.js"
const renderer = new THREE.WebGLRenderer();
renderer.setSize( 640, 480 );
renderer.setViewport( 0, 0, 640, 480 );

const container = document.getElementById( 'container' );

container.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera( 45, 640.0/480.0, 1, 500 );
camera.position.set( 0, 0, -100 );
camera.up.set( 0, 1, 0);
camera.lookAt( 0, 0, 0);

const contlor = new OrbitControls(camera, renderer.domElement);

// geometry setting
const points = [
    // new THREE.Vector3( 10, 0, 0 ),
    // new THREE.Vector3( 0, 10, 0 ),
    // new THREE.Vector3( 0, 0, 10 ),
    // new THREE.Vector3( 0, 0, 0) 
    10, 0, 0,
    0, 10, 0,
    0, 0, 10,
    0, 0, 0
];

// counter clock wise
const triIndices = [
    1, 0, 3,
    2, 1, 3,
    3, 0, 2,
    1, 2, 0         // ?
]

const pointsArray = new Float32Array(points);
const geometry = new THREE.BufferGeometry();
// geometry.setFromPoints(); 벡터로 점의 위치를 받는거 해야함...
geometry.setAttribute('position', new THREE.BufferAttribute(pointsArray, 3));
geometry.setIndex(triIndices);

const material = new THREE.MeshBasicMaterial( { color: 0xff00ff, wireframe: true} );

const myMesh = new THREE.Mesh( geometry, material );
myMesh.position.set(0, 0, 0);
// myMesh.matrix
const myScene = new THREE.Scene();
myScene.add( myMesh  );

// position.set, rotation.set한거랑 matrix4로 .maketranslation,scale 끼리 premultiply해서 clone하는 차이 : 순서 바꾸기불가 와 가능
// myMesh.matrixAutoUpdate doc찾아보기

function animate(){
    requestAnimationFrame(animate);
    contlor.update();
    renderer.render( myScene, camera );
}
animate()
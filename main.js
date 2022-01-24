import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


//scene set up
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#three-head'),
});

//resize function
function resizeCanvasToDisplaySize() {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
}

//sphere
const geometry = new THREE.SphereGeometry(10, 32,16);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347, wireframe: false});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);
camera.position.set(0,1,30);


//hand model
const loader = new GLTFLoader();
loader.load( '/hand.glb', function ( gltf ) {
    gltf.scene.position.set(0,20,0);
    console.log(gltf.scene.position);
    console.log(gltf.scene);
	scene.add( gltf.scene );
    console.log("good?")

}, undefined, function ( error ) {
    console.log("ok")
	console.error( error );

} );

//light
const light = new THREE.AmbientLight(0x404040,100);
scene.add(light);
const light2 = new THREE.PointLight( 0xff0000, 1, 100 );
light2.position.set( 50, 50, 50 );
scene.add( light2 );


//animation loop
function animate(time) {
    time *= 0.001;
    resizeCanvasToDisplaySize();
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

requestAnimationFrame(animate);





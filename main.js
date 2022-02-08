import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

//scene set up
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 2, 0.1, 100);
scene.background = new THREE.Color("rgb(0, 0, 0)");
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#three-head'),
});
renderer.shadowMap.enabled = true;

camera.position.set(0, -9.8, 1.2);

//hand
let hand;

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
const geometry = new THREE.SphereGeometry(0.7, 16, 16);
const material = new THREE.MeshBasicMaterial({ color: 0xFF6347, wireframe: false });
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(0, -9.8, 0)
sphere.visible = false;

//sphere2
const geometry2 = new THREE.SphereGeometry(0.72, 16, 16);
const material2 = new THREE.MeshBasicMaterial({ color: 0xFFFFF, wireframe: true });
const sphere2 = new THREE.Mesh(geometry2, material2);
sphere2.position.set(0, -9.8, 0)

//stars

function addStar() {
    const geometry = new THREE.SphereGeometry(0.1, 5, 5);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(-70));

    star.position.set(x, y, z);
    scene.add(star);
}

Array(1000).fill().forEach(addStar);



//hand model
const loader = new GLTFLoader();
loader.load('/handeyesspread.glb', function (gltf) {
    gltf.scene.position.set(0, -10.4, 0);
    gltf.scene.scale.set(2.5, 2.5, 2.5);
    hand = gltf.scene;
    hand.rotation.y -= 1.545;
    hand.rotation.x -= 0;
    // gltf.scene.traverse((obj) => {
    //     if ((obj.isMesh)) 
    //         var wireframeGeomtry = new THREE.WireframeGeometry( obj.geometry );
    //     var wireframeMaterial = new THREE.LineBasicMaterial( { color: 0xffffff } );
    //     var wireframe = new THREE.LineSegments( wireframeGeomtry, wireframeMaterial );
    //     obj.add(wireframe);
    //         console.log("Ok")
    //     }
    // });

    scene.add(hand);
}, (xhr) => {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded')

}, (error) => {
    console.log("ok")
    console.error(error);

});

//Text Loader


const textLoader = new FontLoader();
textLoader.load('./fonts/fenty.json', function (font) {
    const geometry = new TextGeometry('nice tips', {
        font: font,
        size: 6,
        height: 3,

        bevelThickness: 1,
        bevelSize: 1,
        bevelEnabled: true
    });

    geometry.center();

    const material = new THREE.MeshPhongMaterial({ color: 0xad4000, specular: 0xffffff });

    const textMesh = new THREE.Mesh(geometry, material);

    console.log(textMesh);
    textMesh.castShadow = true;
    if (textMesh == null) { console.log("ur fucked") }
    textMesh.visible = false;
    scene.add(textMesh);
    textMesh.set.position(5,10,10);

});

//light
// const light = new THREE.AmbientLight(0xff0000, 3);
// scene.add(light);
// const light2 = new THREE.PointLight(0xff0000, 1, 100);
// light2.position.set(0, -10, 1.2);
// scene.add(light2);

const light3 = new THREE.PointLight(0xffffff, 1, 100);
light3.position.set(0, -10, 1.2);
scene.add(light3);

scene.add(sphere);
scene.add(sphere2);


//animation loop
function animate(time) {
    time *= 0.1;
    resizeCanvasToDisplaySize();
    sphere2.rotation.y += 0.005;
    sphere2.rotation.x += 0.005;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}

requestAnimationFrame(animate);





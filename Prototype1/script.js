import * as THREE from 'three';

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector(".webgl")

// Sceene
const scene = new THREE.Scene()
scene.background = new THREE.Color("#EDE8D0")

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 5)

// Renderer 
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

/************
 ** Meshes **
 ************/
// testsphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)

// newBox
const boxGeometry = new THREE.BoxGeometry(1.2, 1.2, 1.2)
const boxMaterial = new THREE.MeshNormalMaterial()
const testBox = new THREE.Mesh(boxGeometry, boxMaterial)

scene.add(testBox)

/********************
 ** ANIMATION LOOP **
 ********************/
const clock = new THREE.Clock()  

const animation = () => 
{
    
    //Return elapsed time
    const elapsedTime = clock.getElapsedTime()
    

    // Animate testSphere
    testSphere.position.x = Math.sin(elapsedTime)
    testSphere.position.y = Math.cos(elapsedTime)
    testSphere.rotation.x += 0.01;
    testSphere.rotation.y += 0.01;

     // Animate  distance
    const distance = 2
    testSphere.position.x = Math.sin(elapsedTime) * distance
    testSphere.position.y = Math.cos(elapsedTime) * distance
    testBox.position.x = Math.sin(elapsedTime) * distance
    testBox.position.y = Math.cos(elapsedTime) * distance

        // Animate testBox
        testBox.position.x = Math.sin(elapsedTime + 60)
        testBox.position.y = Math.cos(elapsedTime + 60)
        testBox.rotation.x += 0.01;
        testBox.rotation.y += 0.01;
    
    //Renderer
    renderer.render(scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation()
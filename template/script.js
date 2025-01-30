import * as THREE from "three"

/**********
** SCENE **
**********/

//Canvas
const canvas= document.querySelector('.webgl')

//Scene
const Scene = new THREE.Scene()
Scene.background = new THREE.Color('grey')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
Scene.add(camera)
camera.position.set(0,0,5)

//Renderer
const Renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
Renderer.setSize(window.innerWidth,  window.innerHeight)


/***********
** MESHES **
***********/

//testsphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere =new THREE.Mesh(sphereGeometry, sphereMaterial)

Scene.add(testSphere)
testSphere.position.set(0,0,0)



/*******************
** Animation Loop **
*******************/
const clock = new THREE.Clock()

const animation = () => 
{
    //Return elapsed time
    const elapsedTime = clock.getElapsedTime()
    console.log(elapsedTime)

    //Renderer
    Renderer.render(Scene, camera)

    //Request next frame
    window.requestAnimationFrame(animation)
}

animation
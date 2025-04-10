import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"

/***********
 ** SETUP **
 ***********/
//sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/***********
 ** SCENE **
 ***********/
 // Canvas
 const canvas = document.querySelector('.webgl')

 // Scene
 const scene = new THREE.Scene()
 scene.background = new THREE.Color('grey')

 // Camera
 const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
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
    renderer.setSize(sizes.width, sizes.height)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
 


/***********
** MESHES **
************/
//testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)
testSphere.position.set(0,0,-5)

/*******
** UI **
********/
// UI
const ui = new dat.GUI()


/********************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock() 

const animation = () =>
    {
        // Return elapsedTime
        const elapsedTime = clock.getElapsedTime()

        // Update OrbitControls
        controls.update()

        // Renderer
        renderer.render(scene, camera)

        //Request next frame
        window.requestAnimationFrame(animation)
    }

    animation()
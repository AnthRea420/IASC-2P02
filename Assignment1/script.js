import * as THREE from "three"
import {OrbitControls} from "OrbitControls"
import * as dat from "lil-gui"
/* Setup*/
const sizes = {
    width: window.innerWidth * 0.5,
    height: window.innerHeight,
    aspectRatio:window.innerWidth * 0.4 / window.innerHeight
}
/********
 * Scene*
 */
//canvas
const canvas = document.querySelector('.webgl')
//scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('pink')
//camera
const camera = new THREE.PerspectiveCamera(
    75,sizes.aspectRatio,0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7.5)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width,sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true

//update controls
controls.update()





//Meshe

//CAVE
const caveGeometry = new THREE.PlaneGeometry(15.5,10.0)
const caveMaterial = new THREE.MeshStandardMaterial({
    color : new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry,caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)
//Objects 
// Objects

const sunGeometry = new THREE.SphereGeometry(1.5, 32, 16)
const sunMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color('yellow') })
const sun = new THREE.Mesh(sunGeometry, sunMaterial)
sun.position.set(30, 5, 1)
sun.castShadow = true
scene.add(sun)

// 4 planets each rotates sun.
const planetGeometry = new THREE.SphereGeometry(0.8, 32, 16)
const planetMaterial1 = new THREE.MeshStandardMaterial({ color: new THREE.Color('blue') })
const planetMaterial2 = new THREE.MeshStandardMaterial({ color: new THREE.Color('red') })
const planetMaterial3 = new THREE.MeshStandardMaterial({ color: new THREE.Color('green') })
const planetMaterial4 = new THREE.MeshStandardMaterial({ color: new THREE.Color('purple') })

const planet1 = new THREE.Mesh(planetGeometry, planetMaterial1)
const planet2 = new THREE.Mesh(planetGeometry, planetMaterial2)
const planet3 = new THREE.Mesh(planetGeometry, planetMaterial3)
const planet4 = new THREE.Mesh(planetGeometry, planetMaterial4)
planet1.position.set(sun.position.x + 5, 5, sun.position.z) //this will make each planet stand out behind sun 
planet2.position.set(sun.position.x + 8, 5, sun.position.z)        //this will make each planet stand out behind sun
planet3.position.set(sun.position.x + 11, 5, sun.position.z) //this will make each planet stand out behind sun     
planet4.position.set(sun.position.x + 14, 5, sun.position.z) //this will make each planet stand out behind sun

planet1.castShadow = planet2.castShadow = planet3.castShadow = planet4.castShadow = true
scene.add(planet1, planet2, planet3, planet4)




/*const torusKnotgeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16)
const torusKnotMaterial = new THREE.MeshStandardMaterial({
   color:  new THREE.Color('blue')
})
const torusKnot = new THREE.Mesh(torusKnotgeometry, torusKnotMaterial)
torusKnot.position.set(10, 2, 1)
torusKnot.castShadow = true
scene.add(torusKnot)

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 16)
const sphereMaterial = new THREE.MeshStandardMaterial({
   color:  new THREE.Color('red')
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.position.set(10, 2, -2)
sphere.castShadow = true
scene.add(sphere)



/*const torusKnotgeometry = new THREE.TorusKnotGeometry(10, 3, 100,16)
const torusKnotMaterial = new THREE.MeshBasicMaterial({
   color:  new THREE.Color('blue')
})
const torusKnot = new THREE.Mesh(torusKnotgeometry,torusKnotMaterial)
torusKnot.position.set(5, 2, 3)
torusKnot.castShadow = true
scene.add(torusKnot)

const spheregeometry = new THREE.SphereGeometry(0.5, 32, 16)
const sphereMaterial = new THREE.MeshBasicMaterial({
   color:  new THREE.Color('blue')
})
const sphareMaterial = new THREE.Mesh(spheregeometry,sphereMaterial)
sphareMaterial.position.set(5, 2, 1)
sphareMaterial.castShadow = true
scene.add(sphareMaterial)
/*
const lineGeometry = new THREE.BufferGeometry();
lineGeometry.setFromPoints([
    new THREE.Vector3(5, 0.5, 3), 
    new THREE.Vector3(5, 0.5, 1)])
const lineMaterial = new THREE.LineBasicMaterial({
    color: new THREE.Color('red')
});

// Create the Line Object
const line = new THREE.Line(lineGeometry, lineMaterial);
line.castShadow = true
scene.add(line);
*/
///Lights///
//Ambient Light//
//const ambinetlight = new THREE.AmbientLight(
  //  new THREE.Color('white')
//)
//scene.add(ambinetlight)
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(40, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048



//Directional helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)
//DOM INTERACTIONS
const domObject = {
    part: 0,
    firstChange:false,
    secondChange:false,
    thirdChange:false,
    forthChange:false

}
///part-one
document.querySelector('#part-one').onclick = function(){
domObject.part = 1
}
///part-two
document.querySelector('#part-two').onclick = function(){
    domObject.part = 2
}
//first change
document.querySelector('#first-change').onclick = function(){
    domObject.firstChange = true
    
}

//second change
document.querySelector('#second-change').onclick = function(){
    domObject.secondChange = true
}
//third change
document.querySelector('#third-change').onclick = function(){
    domObject.thirdChange = true
}

//forth change
document.querySelector('#forth-change').onclick = function(){
    domObject.forthChange = true
}




//UI//
/*const ui = new dat.GUI()
const lightPositionFolder = ui.addFolder('Light Position')
lightPositionFolder
.add(directionalLight.position, 'y')
.min(-10)
.max(10)
.step(0.1)
.name('Y')
lightPositionFolder
.add(directionalLight.position, 'z')
.min(-10)
.max(10)
.step(0.1)
.name('Z')
*/
//animation loop

const clock = new THREE.Clock()

const animation = ()=>
{
    
    //return elapsedTime
    const elapsedTime = clock.getElapsedTime()
    console.log(camera.position)
    //animate objects
    //part-one
    if(domObject.part === 1){
       camera.position.set(16.84, 4.63 ,15.58)
        camera.lookAt(0,0,0)
        

    }
    //part-two
    if(domObject.part === 2){
        
        camera.position.set(70.39,15.59,6.69)
        camera.lookAt(0,0,0)
    }
    //first change
    if(domObject.firstChange){
        const radius1 = 5
    const speed1 = 0.5
    planet1.position.x = sun.position.x + Math.cos(elapsedTime * speed1) * radius1
    planet1.position.z = sun.position.z + Math.sin(elapsedTime * speed1) * radius1
    planet1.position.y = 5}
    
    //second change
 if(domObject.secondChange){
    const radius2 = 7
    const speed2 = 0.4
    planet2.position.x = sun.position.x + Math.cos(elapsedTime * speed2) * radius2
    planet2.position.z = sun.position.z + Math.sin(elapsedTime * speed2) * radius2
    planet2.position.y = 5
   
     
    }
    
    //third change
    if(domObject.thirdChange){
        const radius3 = 9
        const speed3 = 0.3
        planet3.position.x = sun.position.x + Math.cos(elapsedTime * speed3) * radius3
        planet3.position.z = sun.position.z + Math.sin(elapsedTime * speed3) * radius3
        planet3.position.y = 5
    
    }
    //forth change
    if(domObject.forthChange){
        const radius4 = 11
    const speed4 = 0.1
    planet4.position.x = sun.position.x + Math.cos(elapsedTime * speed4) * radius4
    planet4.position.z = sun.position.z + Math.sin(elapsedTime * speed4) * radius4
    planet4.position.y = 5 
    }
    //update directional light helper//
    //directionalLightHelper.update()


    //renderer
    renderer.render(scene,camera)

    //request next frame
    window.requestAnimationFrame(animation)


}
animation()
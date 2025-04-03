import * as THREE from "three";
import * as dat from "lil-gui";
import { OrbitControls } from "OrbitControls";

/**********
** SETUP **
***********/

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
};

// Resizing window
window.addEventListener('resize', () => {

    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    sizes.aspectRatio = window.innerWidth / window.innerHeight;

    // Update camera
    camera.aspect = sizes.aspectRatio;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/***********
 ** SCENE **
 ***********/
// Canvas
const canvas = document.querySelector('.webgl');

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('blue');

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.aspectRatio, 0.1, 100);
scene.add(camera);
camera.position.set(0, 12, -20);

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(sizes.width, sizes.height);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.update();

/*********** 
** LIGHTS **
************/
// Directional light
const directionalLight = new THREE.DirectionalLight(0x404040, 100);
scene.add(directionalLight);

/*********** 
** MESHES **
************/
// Cube geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

// Function to draw cubes
const drawCube = (height, params) => {
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(params.color)
    });

    const cube = new THREE.Mesh(cubeGeometry, material);

    // Position Cube
    cube.position.x = (Math.random() - 0.5) * params.diamater;
    cube.position.z = (Math.random() - 0.5) * params.diamater;
    cube.position.y = height + 10; // Start higher

    // Scale cube
    cube.scale.set(params.scale, params.scale, params.scale);

    // Random rotation
    if (params.randomized) {
        cube.rotation.x = Math.random() * 2 * Math.PI;
        cube.rotation.z = Math.random() * 2 * Math.PI;
        cube.rotation.y = Math.random() * 2 * Math.PI;
    }

    // Store animation properties
    cube.userData.shrinkSpeed = 0.98; // Shrinking factor
    cube.userData.fallSpeed = 0.02;   // Fall speed for time-travel cubes
    cube.userData.originalScale = params.scale; // Store original scale
    cube.userData.maxHeight = 10 + Math.random() * 3; // Floating height

    // Add Cube to the group
    params.group.add(cube);
};

/********
 ** UI **
 ********/
const ui = new dat.GUI();
let preset = {};

// Groups
const group1 = new THREE.Group()
scene.add(group1)
const group2 = new THREE.Group()
scene.add(group2)
const group3 = new THREE.Group()
scene.add(group3)

// UI Object for storing data
const uiObj = {
    sourceText: "marty mcFly has to time travel Back to the Future to make his parents fall in love to save his own existence with the help of doc brown",

    saveSourceText() {
        saveSourceText();
    },

    term1: {
        term: 'time',
        color: '#ADD8E6',
        diamater: 20,
        group: group1,
        nCubes: 200,
        randomized: true,
        scale: 2
    },
    term2: {
        term: 'marty',
        color: '#FF5733',
        diamater: 10,
        group: group2,
        nCubes: 100,
        randomized: true,
        scale: 1
    },
    term3: {
        term: 'doc',
        color: '#008000',
        diamater: 10,
        group: group3,
        nCubes: 100,
        randomized: true,
        scale: 1
    },

    saveTerms() {
        saveTerms();
    },

    rotateCamera: false
};

// UI functions for saving
const saveSourceText = () => {
    preset = ui.save();
    textFolder.hide();
    termsFolder.show();
    VisualizeFolder.show();
    tokenizeSourceText(uiObj.sourceText);
};

const saveTerms = () => {
    preset = ui.save;
    VisualizeFolder.hide();
    cameraFolder.show();
    findSearchTerminTokenizedText(uiObj.term1);
    findSearchTerminTokenizedText(uiObj.term2);
    findSearchTerminTokenizedText(uiObj.term3);
};

// Text Folder
const textFolder = ui.addFolder("Source Text");
textFolder
    .add(uiObj, 'sourceText')
    .name("Source Text");
textFolder
    .add(uiObj, 'saveSourceText')
    .name('Save');

// Terms and Visualize Folder, Camera Folder
const termsFolder = ui.addFolder("Search Terms");
const VisualizeFolder = ui.addFolder("Visualize");
const cameraFolder = ui.addFolder("Camera");

termsFolder
    .add(uiObj.term1, 'term')
    .name("Term 1");
termsFolder
    .add(group1, 'visible')
    .name("Term 1 visibility");
termsFolder
    .addColor(uiObj.term1, 'color')
    .name('Term 1 Color');

termsFolder
    .add(uiObj.term2, 'term')
    .name("Term 2");
termsFolder
    .add(group2, 'visible')
    .name("Term 2 visibility");
termsFolder
    .addColor(uiObj.term2, 'color')
    .name('Term 2 Color');

termsFolder
    .add(uiObj.term3, 'term')
    .name("Term 3");
termsFolder
    .add(group3, 'visible')
    .name("Term 3 visibility");
termsFolder
    .addColor(uiObj.term3, 'color')
    .name('Term 3 Color');

VisualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize");
cameraFolder
    .add(uiObj, 'rotateCamera')
    .name("Turntable");

// Hide folders initially
termsFolder.hide();
VisualizeFolder.hide();
cameraFolder.hide();

// Text analysis variables
let parsedText, tokenizedText;

// Parse and tokenize the source text
const tokenizeSourceText = (sourceText) => {
    parsedText = sourceText.replaceAll(".", "").toLowerCase();
    tokenizedText = parsedText.split(/[^\w']+/);
    console.log(tokenizedText);
};

// Find search term in tokenized text
const findSearchTerminTokenizedText = (params) => {
    for (let i = 0; i < tokenizedText.length; i++) {
        if (tokenizedText[i] == params.term) {
            const height = (100 / tokenizedText.length) * i * 0.2;
            for (let a = 0; a < params.nCubes; a++) {
                drawCube(height, params)
            }
        }
    }
};

/***************
 ** ANIMATION **
 ***************/
// Animation loop
const clock = new THREE.Clock();

const animation = () => {
    const elapsedTime = clock.getElapsedTime();
    controls.update();

    // Debugging: Check if cubes exist
    console.log(`Cubes in group1: ${group1.children.length}`);
    console.log(`Cubes in group2: ${group2.children.length}`);

    // Group 1 - Time-travel cubes shrinking and falling
    group1.children.forEach(cube => {
        cube.scale.x = Math.max(cube.scale.x * cube.userData.shrinkSpeed, 0.1);
        cube.scale.y = Math.max(cube.scale.y * cube.userData.shrinkSpeed, 0.1);
        cube.scale.z = Math.max(cube.scale.z * cube.userData.shrinkSpeed, 0.1);
        cube.position.y -= cube.userData.fallSpeed;
    });

    // Group 2 - Marty McFly glowing cubes
    group2.children.forEach(cube => {
        const pulseScale = 0.2 * Math.sin(elapsedTime * 2) + 1;
        cube.scale.set(
            cube.userData.originalScale * pulseScale,
            cube.userData.originalScale * pulseScale,
            cube.userData.originalScale * pulseScale
        );
    });

    // Group 3 - Doc Brown cubes floating
    group3.children.forEach(cube => {
        cube.position.y += 0.02 * Math.sin(elapsedTime);
    });

    // Rotate camera
    if (uiObj.rotateCamera) {
        camera.position.x = Math.sin(elapsedTime * 0.5) * 20;
        camera.position.z = Math.cos(elapsedTime * 0.5) * 20;
        camera.position.y = 5;
        camera.lookAt(0, 0, 0);
    }

    // Render scene
    renderer.render(scene, camera);

    // Next frame
    requestAnimationFrame(animation);
};

animation();

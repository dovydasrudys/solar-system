import * as THREE from 'three';
import SolarSystemScene from './SolarSystemScene';
import AstronomicalBody from './modules/AstronomicalBody';

function main() {
    const canvas = document.querySelector('#canvas');
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    //set up camera
    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 100);
    // camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    const scene = new SolarSystemScene();

    {
        const color = 0xFFFFFF;
        const intensity = 2;
        const light = new THREE.PointLight(color, intensity);
        light.castShadow = true;
        scene.add(light);
    }

    const radius = 1;
    const widthSegments = 15;
    const heightSegments = 15;
    const sphereGeometry = new THREE.SphereBufferGeometry(
        radius, widthSegments, heightSegments);

    var loader = new THREE.TextureLoader();
    const sun = new AstronomicalBody(sphereGeometry, 0xFFFF00, 0xFFFF00, 10, 10, 10);
    sun.mesh.castShadow = false;
    sun.mesh.receiveShadow = false;
    scene.add(sun.orbit);

    const earth = new AstronomicalBody(sphereGeometry, 0x2233FF, null)
    sun.addSatellite(earth, 1, 15);

    const moon = new AstronomicalBody(sphereGeometry, 0x888888, null, 0.3, 0.3, 0.3)
    earth.addSatellite(moon, 1, 1.5);

    const mars = new AstronomicalBody(sphereGeometry, 0x8B0000, null, 1.4, 1.4, 1.4)
    sun.addSatellite(mars, 0.5, 30);

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }

    function render(time) {
        time *= 0.001;

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        sun.rotateSelf(time);
        sun.rotateOrbits(time);

        earth.rotateSelf(time);
        earth.rotateOrbits(time);

        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
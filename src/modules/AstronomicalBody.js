import { Object3D, MeshPhongMaterial, Mesh } from 'three';
import Orbit from './Orbit';

export default class AstronomicalBody extends Object3D {

  constructor(geometry, color, emissiveColor, xSize = 1, ySize = 1, zSize = 1){
    super();

    this.material = new MeshPhongMaterial({
        emissive: emissiveColor,
        color: color
    })
    this.mesh = new Mesh(geometry, this.material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.mesh.scale.set(xSize, ySize, zSize);

    this.orbits = [];

    this.orbit = new Orbit();
    this.orbit.add(this.mesh);
  }

  addSatellite(satellite, travelSpeed, xOff = 0, yOffset = 0, zOffset = 0){
    const newOrbit = new Orbit(travelSpeed);
    newOrbit.add(satellite.orbit);
    this.orbit.add(newOrbit);
    this.orbits.push(newOrbit);
    satellite.orbit.position.x = xOff;
    satellite.orbit.position.y = yOffset;
    satellite.orbit.position.z = zOffset;
  }

  rotateSelf(time){
    this.mesh.rotation.y = time;
  }

  rotateOrbits(time){
    this.orbits.forEach(orbit => {
      orbit.rotateOrbit(time);
    });
  }
}
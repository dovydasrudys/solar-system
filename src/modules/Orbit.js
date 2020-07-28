import { Object3D } from 'three';

export default class Orbit extends Object3D {
    constructor(rotationSpeed = 1, xOffset = 0, yOffset = 0, zOffset = 0){
        super();
        this.rotationSpeed = rotationSpeed;
        this.position.x = xOffset;
        this.position.y = yOffset;
        this.position.z = zOffset;
    }

    rotateOrbit(time){
        this.rotation.y = time * this.rotationSpeed;
    }
}

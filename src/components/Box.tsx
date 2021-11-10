import React, { FC, useEffect } from 'react';
import { useThreeDispatch, useThreeState } from '../libs/context/threeContext';
import * as THREE from 'three';

const createCube = (x: number, y: number, z: number) => {
    const group = new THREE.Group();

    const box = new THREE.Mesh(
        new THREE.BoxGeometry(4, 4, 4),
        new THREE.MeshPhongMaterial({ color: 0x3AE3ED, opacity: 0.7, transparent: true, side: THREE.DoubleSide })
    );
    box.position.set(x, y, z);

    const light = new THREE.PointLight(0xffffff, 0.5, 50);
    const light1 = new THREE.PointLight(0xffffff, 0.5, 50);
    
    light.position.set(x + 5, y + 5, z + 5);
    light1.position.set(x - 5, y - 5, z - 5);

    group.add(box);
    group.add(light);
    group.add(light1);

    return group;
}

const Box: FC<{x?: number; y?: number; z?: number}> = ({
    x = 0,
    y = 0,
    z = 0
}) => {
    const state = useThreeState();
    const dispatch = useThreeDispatch();

    useEffect(() => {
        if(!state.scene) return;

        const cube = createCube(x, y, z);
        state.scene.add(cube);

        dispatch({
            type: "ADD_MESH",
            payload: cube
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.renderer]);

    return (
        <>
        </>
    );
}

export default Box;
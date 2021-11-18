import React, { FC, useEffect } from 'react';
import { useThreeDispatch, useThreeState } from '../libs/context/threeContext';
import * as THREE from 'three';
import { Vector3 } from 'three';

const Line: FC<{points: Vector3[], isTrue: boolean}> = ({
    points,
    isTrue
}) => {
    const state = useThreeState();
    const dispatch = useThreeDispatch();

    useEffect(() => {
        if(!state.scene) return;
        let num = 1;

        const material = new THREE.LineBasicMaterial({ color: 0x3AE3ED });
        material.needsUpdate = true;
        material.colorWrite = true;

        const path = new THREE.LineCurve3(points[0], points[1]);
        const ps = path.getPoints(120);

        const geometry = new THREE.BufferGeometry().setFromPoints(ps);
        geometry.attributes.position.needsUpdate = true;
        
        setInterval(() => { 
            geometry.setDrawRange(0, num);
            num += 1;
        }, 1000 / 100);

        const Line = new THREE.Line(
            geometry,
            material
        );

        state.scene.add(Line);

        dispatch({
            type: "ADD_MESH",
            payload: Line
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.renderer]);

    useEffect(() => {
        if(isTrue && state.scene) {
            const path = new THREE.LineCurve3(points[0], points[1]);
            const light = new THREE.Mesh(
                new THREE.BoxGeometry(0.3, 0.3),
                new THREE.MeshStandardMaterial({color: 0xffffff})
            )
            light.position.set(points[0].x, points[0].y, points[0].z);
            state.scene.add(light);
            let count = 0;
            dispatch({
                type: "ADD_ANIMATION",
                payload: (t) => {
                    if(count >= 1) {
                        state.scene?.remove(light);
                        return;
                    }
                    const position = new THREE.Vector3()
                    const nextPostion = new THREE.Vector3();
                    path.getPointAt(count, position);
                    path.getPointAt(count, nextPostion);
                    light.lookAt(nextPostion);
                    const { x, y, z } = position;
                    light.position.set(x, y, z);
                    count += 0.00075
                    // neposi가 point[1] 보다 크거나 같으면 끝
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTrue])

    return (
        <>
        </>
    )
}

export default Line;
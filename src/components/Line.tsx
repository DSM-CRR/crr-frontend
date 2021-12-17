import React, { FC, useEffect, useRef } from 'react';
import { useThreeDispatch, useThreeState } from '../libs/context/threeContext';
import * as THREE from 'three';
import { Vector3 } from 'three';

const rc = (len: number) =>{
    var text = "";
    var possible = "abcdef0123456789";
    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

const Line: FC<{points: Vector3[]; isTrue: boolean; del: () => void; index: number; isPlay: boolean;}> = ({
    points,
    isTrue,
    del,
    index,
    isPlay
}) => {
    const pRef = useRef<boolean>(true);
    const state = useThreeState();
    const dispatch = useThreeDispatch();
    const started = useRef<boolean>(false);

    useEffect(() => {
        if(started.current) pRef.current = isPlay;
        else started.current = true;
    }, [isPlay]);

    useEffect(() => {
        if(!state.scene) return;
        const pointCount = 120;
        let num = 1;

        const material = new THREE.LineBasicMaterial({ color: 0x3AE3ED });
        material.needsUpdate = true;
        material.colorWrite = true;

        const path = new THREE.LineCurve3(points[0], points[1]);

        const geometry = new THREE.BufferGeometry().setFromPoints(path.getPoints(pointCount));
        geometry.attributes.position.needsUpdate = true;
        
        const counter = setInterval(() => {
            if(num >= pointCount) clearInterval(counter); 
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
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.renderer]);

    useEffect(() => {
        if(isTrue && state.scene) {
            const path = new THREE.LineCurve3(points[0], points[1]);
            const light = new THREE.Mesh(
                new THREE.BoxGeometry(0.5, 0.5, 2),
                new THREE.MeshPhongMaterial({ color: 0xffffff, shininess: 300 })
            );
            const data = {
                id: `0x${rc(32)}`,
                from: `0x${rc(32)}`,
                to: `0x${rc(32)}`,
                gas: Math.round((Math.random() * 8) + 1) / 100000,
                method: "transfer"
            };
            light.name = `dataLine${index}${JSON.stringify(data)}`;
            light.position.set(points[0].x, points[0].y, points[0].z);
            state.scene.add(light);
            let count = 0;
            let prevCount = -1;
            const p = pRef;
            dispatch({
                type: "ADD_ANIMATION",
                payload: (t) => {
                    if(prevCount === count) return;
                    if(count >= 1) {
                        del();
                        state.scene?.remove(light);
                        return;
                    }
                    const position = new THREE.Vector3()
                    const nextPostion = new THREE.Vector3();
                    path.getPointAt(count, position);
                    path.getPointAt(count + 0.00075, nextPostion);
                    light.lookAt(nextPostion);
                    const { x, y, z } = position;
                    light.position.set(x, y, z);
                    if(p.current) {
                        prevCount = count;
                        count += 0.00075;
                    }
                }
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTrue]);

    return (
        <>
        </>
    )
}

export default Line;
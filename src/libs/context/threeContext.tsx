import React, { Dispatch, useContext, useReducer, createContext, RefObject, useEffect } from 'react';
import Canvas from '../../components/Canvas';
import * as THREE from 'three';
import { Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import styled from 'styled-components';

type State = {
    renderer?: WebGLRenderer,
    camera?: PerspectiveCamera,
    scene?: Scene,
    controls?: OrbitControls,
    callback: (() => void)[];
    meshes: Object3D[];
}

type Action =
    | { type: "SET_CANVAS", payload: RefObject<HTMLCanvasElement> }
    | { type: "ADD_ANIMATION", payload: () => void }
    | { type: "ADD_MESH", payload: Object3D }

type threeDispatch = Dispatch<Action>;

const initialState: State = {
    callback: [],
    meshes: []
};

const ThreeStateContext = createContext(initialState);
const ThreeDispatchContext = createContext<threeDispatch | null>(null);

const reducer = (state: State, action: Action): State => {
    switch(action.type) {
        case "SET_CANVAS":
            return {
                ...state,
                ...canvas2ThreeObjects(action.payload),
            }
        case "ADD_ANIMATION":
            return {
                ...state,
                callback: [...state.callback, action.payload],
            }
        case "ADD_MESH":
            return {
                ...state,
                meshes: [...state.meshes, action.payload],
            }
    }
}

const createGridPlaneMesh = (size: number, { x, y, z }: Vector3, div?: number, pos?: "top" | "bottom") => {
    const posValue = pos ? 
        pos === "top" ? -1 : 1
        : 1;

    const group = new THREE.Group();
    const grid = new THREE.GridHelper(size, div ? div : 20, 0x3AE3ED, 0x3AE3ED);
    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(size, size, 1),
        new THREE.MeshBasicMaterial({color: 0xffffff, transparent: true, opacity: 0.4})
    );
    plane.rotation.x = -90 * posValue * Math.PI / 180;

    group.add(grid);
    // group.add(plane);

    group.position.set(x, y, z);

    return group;
}

const canvas2ThreeObjects = (canvas: RefObject<HTMLCanvasElement>) => {
    if(canvas.current === null) return;
    const renderer = new THREE.WebGL1Renderer({ canvas: canvas.current, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    const camera = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 45;
    camera.position.y = 10;
    camera.lookAt(new Vector3(0, 0, 0));
    const scene = new THREE.Scene();
    const controls = new OrbitControls(
        camera,
        renderer.domElement
    );
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.2;

    const light = new THREE.AmbientLight(0xffffff, 0.1);
    light.position.set(0, 0, 0);

    scene.fog = new THREE.Fog(0x001324, 800, 1000);

    scene.add(createGridPlaneMesh(2500, new THREE.Vector3(0, -300, 0), 65));
    scene.add(createGridPlaneMesh(2500, new THREE.Vector3(0, 300, 0), 65, "top"));
    scene.add(light);

    return {
        renderer,
        camera,
        scene,
        controls,
    }
}

const Container = styled.div`
`;

export const ThreeProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const { callback, renderer, camera, scene, controls } = state;

        const animate = () => {
            if(renderer === undefined || scene === undefined || camera === undefined || controls === undefined) return;

            window.requestAnimationFrame(animate);

            callback.forEach(fn => fn());
            renderer.render(scene, camera);
            controls.update();
        };

        window.requestAnimationFrame(animate);
    }, [state]);

    return (
        <ThreeStateContext.Provider value={state}>
            <ThreeDispatchContext.Provider value={dispatch}>
                <Canvas />
                <Container>
                    {children}
                </Container>
            </ThreeDispatchContext.Provider>
        </ThreeStateContext.Provider>
    )
}

export const useThreeState = () => {
    const state = useContext(ThreeStateContext);
    if(!state) throw new Error("Cannot find ThreeProvider");
    return state;
}

export const useThreeDispatch = () => {
    const dispatch = useContext(ThreeDispatchContext);
    if(!dispatch) throw new Error("Cannot find ThreeProvider");
    return dispatch;
}
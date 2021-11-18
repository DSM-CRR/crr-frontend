import React, { Dispatch, useContext, useReducer, createContext, RefObject, useEffect, useRef } from 'react';
import Canvas from '../../components/Canvas';
import * as THREE from 'three';
import { BufferGeometry, Line, LineBasicMaterial, Object3D, PerspectiveCamera, Scene, Vector2, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import styled from 'styled-components';

type State = {
    renderer?: WebGLRenderer,
    camera?: PerspectiveCamera,
    scene?: Scene,
    controls?: OrbitControls,
    callback: ((t: number) => void)[];
    meshes: Object3D[];
}

type Action =
    | { type: "SET_CANVAS", payload: RefObject<HTMLCanvasElement> }
    | { type: "ADD_ANIMATION", payload: (t: number) => void }
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

const createGrid = (size: number, { x, y, z }: Vector3, div?: number) => {
    const grid = new THREE.GridHelper(size, div ? div : 20, 0x3AE3ED, 0x3AE3ED);

    grid.position.set(x, y, z);

    return grid;
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
    controls.enableDamping = true;

    const light = new THREE.AmbientLight(0xffffff, 0.1);
    light.position.set(0, 0, 0);

    scene.fog = new THREE.Fog(0x001324, 800, 1000);

    scene.add(createGrid(2500, new THREE.Vector3(0, -300, 0), 65));
    scene.add(createGrid(2500, new THREE.Vector3(0, 300, 0), 65));
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
    const functions = useRef<((t:number) => void)[]>([]);

    useEffect(() => {
        const { renderer, camera, scene, controls } = state;
        const raycaster = new THREE.Raycaster();
        const mouse = new Vector2();
        let obj: Line<BufferGeometry, LineBasicMaterial> | null;

        raycaster.params.Line!.threshold = 1;

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        const animate = (t: number) => {
            if(renderer === undefined || scene === undefined || camera === undefined || controls === undefined) return;

            window.requestAnimationFrame(animate);

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children);
            
            if(obj && obj.type === "Line") obj.material = new THREE.LineBasicMaterial({ color: 0x3AE3ED })
            if(intersects.length > 0 && obj !== intersects[0].object) {
                obj = intersects[0].object as Line<BufferGeometry, LineBasicMaterial>;
                if(obj && obj.type === "Line") obj.material = new THREE.LineBasicMaterial({ color: 0xffffff });
            } else obj = null;

            if(obj && intersects.length > 0 && obj.type === "Line") {
                controls.autoRotate = false;
                renderer.domElement.style.cursor = "pointer";
            } else {
                controls.autoRotate = true;
                renderer.domElement.style.cursor = "auto";
            }

            functions.current.forEach(fn => fn(t));
            renderer.render(scene, camera);
            controls.update();
        };

        window.addEventListener("mousemove", onMouseMove);
        const afHandle = window.requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.cancelAnimationFrame(afHandle);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.renderer]);

    useEffect(() => {
        functions.current = state.callback;
    }, [state.callback])

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
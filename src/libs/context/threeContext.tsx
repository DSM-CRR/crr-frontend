import React, { Dispatch, useContext, useReducer, createContext, RefObject, useEffect, useRef, MutableRefObject } from 'react';
import Canvas from '../../components/Canvas';
import * as THREE from 'three';
import { BufferGeometry, Line, LineBasicMaterial, Mesh, Object3D, PerspectiveCamera, Scene, Vector2, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import styled from 'styled-components';

type State = {
    renderer?: WebGLRenderer,
    camera?: PerspectiveCamera,
    scene?: Scene,
    controls?: OrbitControls,
    isPlay?: boolean[];
    callback: ((t: number) => void)[];
    meshes: Object3D[];
    index: number;
    isOver: boolean;
}

type Action =
    | { type: "SET_CANVAS", payload: RefObject<HTMLCanvasElement> }
    | { type: "ADD_ANIMATION", payload: (t: number) => void }
    | { type: "ADD_MESH", payload: Object3D }
    | { type: "CHANGE_INDEX", payload: { isOver: boolean; index: number; }}
    | { type: "CHANGE_OVER", payload: boolean; }

type threeDispatch = Dispatch<Action>;

const initialState: State = {
    callback: [],
    meshes: [],
    index: 0,
    isOver: false
};

const ThreeStateContext = createContext(initialState);
const ThreeDispatchContext = createContext<threeDispatch | null>(null);
const ThreeRefContext = createContext<MutableRefObject<HTMLDivElement | null> | null>(null);

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
        case "CHANGE_INDEX":
            return {
                ...state,
                index: action.payload.index,
                isOver: action.payload.isOver
            }
        case "CHANGE_OVER":
            return {
                ...state,
                isOver: action.payload
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
    const modalRef = useRef<HTMLDivElement | null>(null);
    const functions = useRef<((t:number) => void)[]>([]);

    useEffect(() => {
        const { renderer, camera, scene, controls } = state;
        const raycaster = new THREE.Raycaster();
        const mouse = new Vector2();
        // let obj: Line<BufferGeometry, LineBasicMaterial> | null;
        let obj: Mesh<BufferGeometry, LineBasicMaterial> | null;

        raycaster.params.Line!.threshold = 0;

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const animate = (t: number) => {
            if(renderer === undefined || scene === undefined || camera === undefined || controls === undefined) return;

            window.requestAnimationFrame(animate);

            raycaster.setFromCamera(new Vector2((mouse.x  / window.innerWidth) * 2 - 1, -(mouse.y / window.innerHeight) * 2 + 1), camera);
            const intersects = raycaster.intersectObjects(scene.children);

            if(intersects.length > 0 && obj !== intersects[0].object) {
                obj = intersects[0].object as Mesh<BufferGeometry, LineBasicMaterial>;
                if(obj && obj.name !== "") {
                    controls.autoRotate = false;
                    renderer.domElement.style.cursor = "pointer";
                    if(modalRef && modalRef.current) {
                        modalRef.current.innerHTML = "";
                        const data = JSON.parse(`{${obj.name.split(/{/)[1]}`);
                        dispatch({ type: "CHANGE_INDEX", payload: {
                            index: Number(obj.name.match(/([0-9]{1,})/)![0]),
                            isOver: true
                        }});
                        modalRef.current.innerHTML = `<b>Transaction ID:</b> ${data.id} <br><br> <b>Sender:</b>  ${data.from} <br><br> <b>Recipient:</b> ${data.to} <br><br> <b>Gasfee:</b> <br> ${data.gas}`;
                        const bottomToY = window.innerHeight - mouse.y;
                        const bottomPosi = mouse.y - modalRef.current.offsetHeight;
                        if(bottomToY > modalRef.current.offsetHeight) modalRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
                        else modalRef.current.style.transform = `translate(${mouse.x}px, ${bottomPosi}px)`;
                        modalRef.current.style.display = "inline-block";
                    } 
                } else {
                    dispatch({ type: "CHANGE_OVER", payload: false });
                    if(modalRef && modalRef.current) modalRef.current.style.display = "none";
                    controls.autoRotate = true;
                    renderer.domElement.style.cursor = "auto";
                }
            } else if(intersects.length < 1) {
                dispatch({ type: "CHANGE_OVER", payload: false });
                if(modalRef && modalRef.current) modalRef.current.style.display = "none";
                controls.autoRotate = true;
                renderer.domElement.style.cursor = "auto";
            } else obj = null;

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
                <ThreeRefContext.Provider value={modalRef}>
                    <Canvas />
                    <Container>
                        {children}
                    </Container>
                </ThreeRefContext.Provider>
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

export const useThreeRef = () => {
    const state = useContext(ThreeRefContext);
    if(!state) throw new Error("Cannot find ThreeProvider");
    return state;
}
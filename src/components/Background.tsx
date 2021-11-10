import React, { FC, useEffect } from 'react';
import { useThreeState } from '../libs/context/threeContext';
import * as THREE from 'three';
import backgroundImage2 from '../assets/images/background2.jpg';

const Background: FC<{}> = () => {
    const state = useThreeState();
    useEffect(() => {
        if(!state.scene) return;

        const loader = new THREE.TextureLoader();
        const bgTexture = loader.load(backgroundImage2);
        
        state.scene.background = bgTexture;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.renderer]);

    return (
        <>
            
        </>
    );
}

export default Background;
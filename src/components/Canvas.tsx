import React, { FC, useEffect, useRef } from 'react';
import { useThreeDispatch } from '../libs/context/threeContext'
import styled from 'styled-components';

const CanvasElement = styled.canvas`
    width: 100%;
    height: 100%;
    position: absolute;
`;

const CanvasComponent: FC<{}> = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const dispatch = useThreeDispatch();

    useEffect(() => {
        if(!canvasRef.current) return;
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        dispatch({
            type: "SET_CANVAS",
            payload: canvasRef
        });
    }, [dispatch]);

    return (
        <>
            <CanvasElement ref={canvasRef} />
        </>
    )
}

export default CanvasComponent
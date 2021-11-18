import React, { FC, useEffect, useState } from 'react';
import { useThreeState } from '../../libs/context/threeContext';
import Box from '../Box';
import * as S from './styles';
import { randomVector3Array } from '../../libs/functions'
import useScroll from '../../libs/hook/useScroll';
import Line from '../Line';
import { Vector3 } from 'three';
import { useNavigate } from 'react-router-dom';

const data = randomVector3Array(15, [25, 15, 25], [-25, -15, -25]);

const Main: FC<{}> = () => {
    const [ld, setLd] = useState<boolean[]>(new Array(15));

    const state = useThreeState();
    const navigate = useNavigate();

    const { ref: divRef, style: divStyle } = useScroll<HTMLDivElement>(.7, 0);
    const { ref: buttonRef, style: buttonStyle } = useScroll<HTMLDivElement>(.7, .5);
    
    useEffect(() => {
        console.log(state);
    }, [state]);

    const createLines = () => {
        const arr: React.ReactNode[] = [];
        let i = 0;

        data.forEach(({ x, y, z }, index) => {
            const { x: px, y: py, z: pz } = data[index - 1] ? data[index - 1] : { x: 0, y: 0, z: 0 };
            const { x: nx, y: ny, z: nz } = data[index + 1] ? data[index + 1] : { x: 0, y: 0, z: 0 };
            const prevVec = new Vector3(px, py, pz);
            const nextVec = new Vector3(nx, ny, nz);
            const curVec = new Vector3(x, y, z);

            if(index <= 0) {
                arr.push(<Line points={[curVec, nextVec]} key={++i} isTrue={ld[i]} />);
            } else if(index >= data.length - 1) {
                arr.push(<Line points={[curVec, prevVec]} key={++i} isTrue={ld[i]} />);
            } else {
                arr.push(<Line points={[curVec, prevVec]} key={++i} isTrue={ld[i]} />, <Line points={[curVec, nextVec]} key={++i} isTrue={ld[i]} />);
            }
        });

        return arr.map(dom => dom);
    }

    useEffect(() => {
        const onKeydown = () => {
            setLd(prev => {
                const temp = [...prev]
                temp[Math.round(Math.random() * 29)] = true;
                return temp;
            })
        };
        window.addEventListener("keydown", onKeydown);

        return () => {
            window.removeEventListener("keydown", onKeydown);
        }
    }, [])

    return (
        <S.Container>
            <S.Wrapper ref={divRef} style={divStyle}>
                <S.Title>Write down the reviews!</S.Title>
                <div ref={buttonRef} style={buttonStyle}>
                    <S.Button onClick={() => navigate("/docs/1")}>Get Started</S.Button>
                </div>
            </S.Wrapper>
            {
                data.map((props, i) => (
                    <Box key={i} {...props} />
                ))
            }
            {
                createLines()
            }
        </S.Container>
    )
}

export default Main;
import React, { FC, useEffect, useRef, useState } from 'react';
import { useThreeRef, useThreeState } from '../../libs/context/threeContext';
import Box from '../Box';
import * as S from './styles';
import { randomVector3Array } from '../../libs/functions'
import useScroll from '../../libs/hook/useScroll';
import Line from '../Line';
import { Vector3 } from 'three';
import { useNavigate } from 'react-router-dom';

const dataSize = 11;
const data = randomVector3Array(dataSize, [25, 15, 25], [-25, -15, -25]);
const tempArr = Array.from(Array(dataSize), () => true);
const psArr = Array.from(Array(dataSize * 2 - 2), () => true);

const Main: FC<{}> = () => {
    const [ld, setLd] = useState<boolean[]>([...tempArr]);
    const [ps, setPs] = useState<boolean[]>([...psArr]);

    const state = useThreeState();
    const navigate = useNavigate();
    const ref = useThreeRef();

    const { ref: divRef, style: divStyle } = useScroll<HTMLDivElement>(.7, 0);
    const { ref: buttonRef, style: buttonStyle } = useScroll<HTMLDivElement>(.7, .5);
    
    useEffect(() => {
        setPs(prev => {
            const temp = [...prev];
            if(state.isOver) temp[state.index] = false;
            else if(!state.isOver) temp[state.index] = true;
            return temp;
        });
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
                arr.push(
                    <Line points={[curVec, nextVec]} key={++i} isTrue={ld[i]} del={deleteIndex(i)} index={i} isPlay={ps[i]} />
                );
            } else if(index >= data.length - 1) {
                arr.push(
                    <Line points={[curVec, prevVec]} key={++i} isTrue={ld[i]} del={deleteIndex(i)} index={i} isPlay={ps[i]} />
                );
            } else {
                arr.push(
                    <Line points={[curVec, prevVec]} key={++i} isTrue={ld[i]} del={deleteIndex(i)} index={i} isPlay={ps[i]} />,
                    <Line points={[curVec, nextVec]} key={++i} isTrue={ld[i]} del={deleteIndex(i)} index={i} isPlay={ps[i]} />
                );
            }
        });

        return arr.map(dom => dom);
    }

    useEffect(() => {
        let handle: number;
        let t: number;
        const animate = (d: number) => {
            if(!t) t = d;
            const now = d - t;
            if(now > 2000 && Math.random() > 0.95) {
                t = d;
                setLd(prev => {
                    const temp = [...prev];
                    let randomIndex = Math.round(Math.random() * 29);
                    while(temp[randomIndex]) randomIndex = Math.round(Math.random() * 29);
                    temp[randomIndex] = true;
                    return temp;
                });
            }
            handle = window.requestAnimationFrame(animate);
        }

        handle = window.requestAnimationFrame(animate);

        return () => {
            window.cancelAnimationFrame(handle);
        }
    }, []);

    const deleteIndex = (i: number) => {
        return () => {
            setLd(prev => {
                const temp = [...prev];
                temp[i] = false;
                return temp;
            });
        }
    }

    return (
        <>
            <S.Container>
                <S.Wrapper ref={divRef} style={divStyle}>
                    <S.Title>Write down the reviews!</S.Title>
                    <div ref={buttonRef} style={buttonStyle}>
                        <S.Button onClick={() => navigate("/docs/intro")}>Get Started</S.Button>
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
            <S.Modal ref={ref}>

            </S.Modal>
        </>
    )
}

export default Main;
import React, { FC, useEffect } from 'react';
import { useThreeState } from '../../libs/context/threeContext';
import Box from '../Box';
import Header from '../Header';
import * as S from './styles';
import { randomVector3Array } from '../../libs/functions'
import useScroll from '../../libs/hook/useScroll';

const data = randomVector3Array(20, [25, 15, 25], [-25, -15, -25]);

const Main: FC<{}> = () => {
    const state = useThreeState();
    const { ref: divRef, style: divStyle } = useScroll<HTMLDivElement>(.7, 0);
    const { ref: buttonRef, style: buttonStyle } = useScroll<HTMLDivElement>(.7, .5);
    
    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <>
            <Header />
            <S.Container>
                <S.Wrapper ref={divRef} style={divStyle}>
                    <S.Title>Write down the reviews!</S.Title>
                    <div ref={buttonRef} style={buttonStyle}>
                        <S.Button>Get Started</S.Button>
                    </div>
                </S.Wrapper>
            </S.Container>
            {
                data.map((props, i) => (
                    <Box key={i} {...props} />
                ))
            }
        </>
    )
}

export default Main;
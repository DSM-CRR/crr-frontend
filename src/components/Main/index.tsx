import React, { FC, useEffect } from 'react';
import { useThreeState } from '../../libs/context/threeContext';
import Box from '../Box';
import Header from '../Header';
import * as S from './styles';
import { randomVector3Array } from '../../libs/functions'

const data = randomVector3Array(20, [25, 15, 25], [-25, -15, -25]);

const Main: FC<{}> = () => {
    const state = useThreeState();
    
    useEffect(() => {
        console.log(state)
    }, [state]);

    return (
        <>
            <Header />
            <S.Container>
                <S.Title>Write down the reviews!</S.Title>
                <S.Button>Get Started</S.Button>
            </S.Container>
            {
                data.map((props) => (
                    <Box {...props} />
                ))
            }
        </>
    )
}

export default Main;
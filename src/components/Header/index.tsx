import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as S from './styles';

const Header: FC<{}> = () => {
    const location = useLocation();

    useEffect(() => {
        console.log(location);
    }, [location]);

    return (
        <S.Container height={location.pathname === "/" ? 80 : 64}>
            <S.Wrapper>
                <S.Logo fontSize={location.pathname === "/" ? 60 : 46} to="/">CRR</S.Logo>
                <S.NavItem to="/docs/1">Demo</S.NavItem>
            </S.Wrapper>
        </S.Container>
    );
}

export default Header;
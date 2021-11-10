import React, { FC } from 'react';
import * as S from './styles';

const Header: FC<{}> = () => {
    return (
        <S.Container>
            <S.Wrapper>
                <S.Logo>CRR</S.Logo>
                <S.NavItem>Demo</S.NavItem>
            </S.Wrapper>
        </S.Container>
    );
}

export default Header;
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './styles';

const Docs = () => {
    const params = useParams();

    useEffect(() => {
        console.log(params.page);
    }, [params]);

    return (
        <S.Container>
            Docs
        </S.Container>
    )
}

export default Docs;
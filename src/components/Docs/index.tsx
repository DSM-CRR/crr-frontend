import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Example from './Example';
import Intro from './Intro';
import * as S from './styles';

interface SideItemType {
    name: string;
    path: string;
}

const data: SideItemType[] = [{
    name: "소개",
    path: "/intro"
}, {
    name: "예제",
    path: "/example"
}];

const Docs = () => {
    const params = useParams();
    const [activeNumber, setAN] = useState<Number>(1);
    const [review, setReview] = useState<Record<string, unknown>[]>([]);

    useEffect(() => {
        console.log(review)
    }, [review]);

    const postReview = (data: Record<string, unknown>) => {
        setReview(prev => {
            const temp = [...prev];
            temp.push(data);
            return temp;
        })
    }
    
    const getReview = (limit: number, index: number) => {
        return review.slice(limit * index, limit * (index + 1));
    }

    return (
        <S.Container>
            <S.SideWrapper>
                {
                    data.map((v: SideItemType, i) => (
                        <S.SideItem key={v.path} to={`/docs${v.path}`} onClick={() => setAN(i + 1)} active={params.id === v.path.slice(1)}>{v.name}</S.SideItem>
                    ))
                }
            </S.SideWrapper>
            <S.DocsContainer>
                <S.DocsWrapper>
                    {
                        params.id === "intro" ? <Intro />
                        : params.id === "example" ? <Example postReview={postReview} getReview={getReview} />
                        : <></>
                    }
                </S.DocsWrapper>
            </S.DocsContainer>
        </S.Container>
    )
}

export default Docs;
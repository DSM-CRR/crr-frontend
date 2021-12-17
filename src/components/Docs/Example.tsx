import React, { FormEvent, useRef, useState } from 'react';
import Docs from '.';
import * as S from './styles';

const Example = ({ postReview, getReview }: { postReview: (data: Record<string, unknown>) => void; getReview: (limit: number, index: number) => Record<string, unknown>[] }) => {
    const bodyRef = useRef<HTMLTextAreaElement | null>(null);
    const rateRef = useRef<HTMLInputElement | null>(null);
    const limitRef = useRef<HTMLInputElement | null>(null);
    const pageRef = useRef<HTMLInputElement | null>(null);
    const [review, setReview] = useState<Record<string, unknown>[]>([]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(bodyRef.current && rateRef.current) {
            postReview({
                body: bodyRef.current.value,
                rate: Number(rateRef.current.value)
            });
        }
    }

    const onClick = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(limitRef.current && pageRef.current) {
            setReview(getReview(Number(limitRef.current.value), Number(pageRef.current.value)));
        }
    }

    return (
        <>
            <S.DocsTitle>예제</S.DocsTitle>
            <S.DocsSubTitle>/review @POST</S.DocsSubTitle>
            <S.DocsSubTitle>리뷰 작성하기</S.DocsSubTitle>
            <S.DocsForm onSubmit={onSubmit}>
                <S.DocsLabel>리뷰 내용 <S.DocsText ref={bodyRef} maxLength={200} placeholder="정말 맛있게 먹었습니다."></S.DocsText></S.DocsLabel>
                <S.DocsLabel>리뷰 별점 <S.DocsInput ref={rateRef} type="number" min={1} max={5} placeholder="4" /></S.DocsLabel>
                <S.DocsButton>리뷰 작성하기</S.DocsButton>
            </S.DocsForm>
            <S.DocsTitle>&nbsp;</S.DocsTitle>
            <S.DocsSubTitle>/review @GET</S.DocsSubTitle>
            <S.DocsSubTitle>리뷰 불러오기</S.DocsSubTitle>
            <S.DocsForm onSubmit={onClick}>
                <S.DocsLabel>한번에 불러올 리뷰 갯수 <S.DocsInput width={80} ref={limitRef} type="number" placeholder="10" /></S.DocsLabel>
                <S.DocsLabel>페이지 넘버 <S.DocsInput width={80} ref={pageRef} type="number" placeholder="0" /></S.DocsLabel>
                <S.DocsButton>리뷰 불러오기</S.DocsButton>
            </S.DocsForm>
            <S.DocsForm>
                {
                    review.length > 0 ? review.map((val) => <S.DocsLine><S.DocsLabel>리뷰 내용: <br /> {val.body as string}</S.DocsLabel><S.DocsLabel>리뷰 별점: {val.rate as string}</S.DocsLabel></S.DocsLine>)
                    : <S.DocsLabel>데이터가 없습니다.</S.DocsLabel>
                }
            </S.DocsForm>
        </>
    )
}

export default Example;
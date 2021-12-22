import React from 'react';
import * as S from './styles';

const Intro = () => {
    return (
        <>
            <S.DocsTitle>CRR 소개</S.DocsTitle>
            <S.DocsSubTitle>문제점이 뭔가요 ?</S.DocsSubTitle>
            <S.DocsBody>기존의 리뷰들은 서버와 클라이언트간 뇌물 같은 것을 활용하면 쉽게 조작이 가능했습니다. 사용자들은 보통 리뷰가 많은 것을 신뢰하기 때문에 이러한 조작성 리뷰에 의해 속는 사용자들이 생겨났습니다. 저희는 이러한 사용자들에게 신뢰를 제공하기 위해 만들어졌습니다.</S.DocsBody>
            <S.DocsSubTitle>왜 지금 필요한가요 ?</S.DocsSubTitle>
            <S.DocsBody>코로나 19 사태로 인하여 배달시장의 수요가 지속적으로 늘고 있습니다. 이러한 시장속에서 조작 하나하나를 탐색하거나 구분하기도 어렵습니다. 리뷰서비스의 신뢰도는 높아지고 있지 않습니다. 저희는 지금이 리뷰서비스의 신뢰도를 높이기 좋은 시점이라고 생각합니다.</S.DocsBody>
            <S.DocsSubTitle>어떻게 리뷰서비스의 신뢰도를 올리나요 ?</S.DocsSubTitle>
            <S.DocsBody>저희는 리뷰서비스의 신뢰도를 올리기 위해 블록체인 기술을 채택하였습니다. 블록체인에 한번 올라간 리뷰는 절대 수정이 불가능하며 이를 통해 리뷰의 조작가능성을 낮춥니다. 이러한 블록체인 기술을 이용한 OpenAPI를 제작하여 각 배달서비스에서 사용할 수 있도록 합니다. 또한 블록체인에 한번 올라간 리뷰는 모든 기록이 남아 투명한 공개가 가능합니다.</S.DocsBody>
        </>
    )
}

export default Intro;
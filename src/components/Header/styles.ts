import styled from "styled-components";

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80px;
    background: white;
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
`;

export const Wrapper = styled.div`
    width: 1400px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const Logo = styled.h1`
    font-weight: 900;
    font-size: 60px;
    transform: translateY(-4px);
    cursor: pointer;
`;

export const NavItem = styled.span`
    font-weight: 900;
    font-size: 28px;
    cursor: pointer;
`;
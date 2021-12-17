import styled from "styled-components";
import { Link } from 'react-router-dom';

export const Container = styled.div<{height: number}>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: ${props => props.height}px;
    /* background: white; */
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(4px);
    box-shadow: 0 6px 11px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    z-index: 10000;
    user-select: none;
    transition: all .1s ease-in;
`;

export const Wrapper = styled.div`
    width: 1400px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all .1s ease-in;
`

export const Logo = styled(Link)<{fontSize: number}>`
    font-weight: 900;
    font-size: ${props => props.fontSize}px;
    transform: translateY(-${props => props.fontSize === 60 ? 4 : 2}px);
    cursor: pointer;
    color: black;
    transition: all .1s ease-in;
`;

export const NavItem = styled(Link)`
    font-weight: 900;
    font-size: 28px;
    cursor: pointer;
    color: black;
    transition: all .1s ease-in;
`;
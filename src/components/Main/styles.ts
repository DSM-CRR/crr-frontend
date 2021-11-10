import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 50px 60px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
`;

export const Title = styled.h2`
    font-weight: 900;
    font-size: 64px;
    color: white;
`;

export const Button = styled.button`
    padding: 18px 46px;
    border-radius: 6px;
    background: rgba(30, 24, 187, .7);
    font-weight: 700;
    font-size: 34px;
    color: white;
    transition: background .05s linear, box-shadow .1s ease-in-out;

    &:hover {
        background: rgba(30, 24, 187, 1);
    }

    &:active {
        box-shadow: inset 6px 6px 10px rgba(0, 0, 0, 0.4), inset -4px -4px 9px rgba(255, 255, 255, 0.1);
    }
`;
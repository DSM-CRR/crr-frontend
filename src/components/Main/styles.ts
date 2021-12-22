import styled from "styled-components";

export const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 50px 60px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 20px;
    user-select: none;
    pointer-events: none;
`;

export const Title = styled.h2`
    font-weight: 900;
    font-size: 64px;
    color: white;
    text-align: center;
`;

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    pointer-events: none;
`;

export const Button = styled.button`
    pointer-events: all;
    padding: 18px 46px;
    border-radius: 6px;
    background: rgba(30, 24, 187, .7);
    font-weight: 700;
    font-size: 34px;
    color: white;
    transition: background .05s linear, box-shadow .1s ease-in;

    &:hover {
        background: rgba(30, 24, 187, 1);
    }

    &:active {
        background: rgba(30, 24, 187, 1);
        box-shadow: inset 6px 6px 10px rgba(0, 0, 0, 0.4), inset -4px -4px 9px rgba(255, 255, 255, 0.1);
    }
`;

export const Modal = styled.div`
    width: 250px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 0 9px rgba(0, 0, 0, .45);
    display: flex;
    white-space: pre-line;
    overflow-wrap: break-word;
    background: white;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
`;
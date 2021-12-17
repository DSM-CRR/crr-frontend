import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: calc(100% - 64px);
    margin-top: 64px;
    display: flex;
`;

export const SideWrapper = styled.div`
    width: 300px;
    height: 100%;
    padding: 40px 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;

    &::-webkit-scrollbar {
        width: 8px;
        border-radius: 8px;
        background: rgba(220, 220, 220);
    }
`;

export const SideItem = styled(Link)<{active: boolean}>`
    font-size: 22px;
    font-weight: 700;
    padding: 16px 14px;
    box-shadow: ${({ active }) => active ? 
        "inset 5px 5px 9px rgba(0, 0, 0, 0.2), inset -4px -4px 8px rgba(255, 255, 255, 0.3), 0 0 0px rgba(0, 0, 0, 0.2)" 
        : "inset 0 0 0px rgba(0, 0, 0, 0.2), inset 0 0 0px rgba(255, 255, 255, 0.3), 5px 5px 9px rgba(0, 0, 0, 0.2)"
    };
    transition: all .1s ease-in;
    border-radius: 3px;
    margin-bottom: 12px;
    cursor: pointer;
    color: black;
`;

export const DocsTitle = styled.h2`
    margin-top: 0;
    font-size: 32px;
`;

export const DocsSubTitle = styled.h3`
    margin-top: 0;
    font-size: 24px;
`;

export const DocsBody = styled.p`
    margin-top: 0;
`;

export const DocsWrapper = styled.div`
    max-width: 1000px;
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
        width: 10px;
    }

    &::-webkit-scrollbar-thumb {
        width: 100%;
        background: rgba(140, 140, 140);
    }
`;

export const DocsContainer = styled.div`
    width: calc(100% - 300px);
    height: 100%;
    padding: 40px;
    box-shadow: -6px 0 11px rgba(0, 0, 0, 0.3);
`;

export const DocsForm = styled.form`
    width: 100%;
    border-radius: 4px;
    background: rgb(245, 245, 245);
    padding: 14px;
    margin-bottom: 20px;
`;

export const DocsInput = styled.input<{width?: number}>`
    width: ${({ width }) => width ? width : 90}%;
    outline: none;
    border: 1px solid rgb(50, 50, 50);
    background: rgb(250, 250, 250);
    border-radius: 2px;
    padding: 4px 8px;
`;

export const DocsText = styled.textarea`
    width: 90%;
    outline: none;
    border: 1px solid rgb(50, 50, 50);
    background: rgb(250, 250, 250);
    border-radius: 2px;
    padding: 4px 8px;
    resize: vertical;
`;

export const DocsLabel = styled.label`
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 12px;
`;

export const DocsButton = styled.button`
    width: 100%;
    padding: 6px;
    background: rgb(235, 235, 235);
    text-align: center;
    font-size: 16px;
`;

export const DocsLine = styled.div`
    padding: 4px 0;
    margin-bottom: 12px;

    &:not(:last-child) {
        border-bottom: 2px solid rgb(160, 160, 160);
    }
`;
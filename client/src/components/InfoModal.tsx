import React, { useState } from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 200px;
    font-weight: bold;
    background-color: #fff;
    border-radius: 10px;
    border: 2px solid #609966;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    padding: 40px;
`;

const ModalTitle = styled.h2`
    font-size: 27px;
    margin-bottom: 30px;
    text-align: center;
`;

const ModalMessage = styled.p`
    font-size: 17px;
    margin-bottom: 10px;
    text-align: center;
`;

const ModalButton = styled.button`
    margin-top: 20px;
    padding: 10px;
    background-color: #609966;
    color: #fff;
    border: none;
    border-radius: 15px;
    width: 80%;
    text-align: center;
    text-decoration-line: none;
    cursor: pointer;
    &:hover {
        background-color: #507c55;
    }
    &:active {
        background-color: #335236;
    }
`;
function LoginModal({ onClose } : any) {
    return (
      <div>
        <ModalContainer>
        <ModalContent>
            <ModalTitle>마일리지란?</ModalTitle>
            <ModalMessage>내가 쓴 게시글의 좋아요 1개당 50P,</ModalMessage>
            <ModalMessage>내가 쓴 댓글의 좋아요 1개당 10P를 지급받습니다.</ModalMessage>
            <ModalMessage>마일리지 300P 당 나무를 1그루 심을 수 있습니다.</ModalMessage>
            <ModalMessage>🚨모든 나무는 기부하는데 사용됩니다🚨</ModalMessage>
            <ModalButton onClick={onClose}>닫기</ModalButton>
        </ModalContent>
        </ModalContainer>
      </div>
    );
}

export default LoginModal;
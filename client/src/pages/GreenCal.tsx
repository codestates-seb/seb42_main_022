import styled from "styled-components";
import React,{ useState, useEffect } from "react";
import Calculator from "../components/Calculator";

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 600px;
`;
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 500px;

`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 20px;
  margin: 0px 0px 50px 0px;
  width: 100%;
`;
const CalculatorBtn = styled.button`
  display: flex;
  justify-content: center;
  color: #ffff;
  width: 80%;
  background-color: #609966;
  text-align: center;
  border-radius: 5px;
  border: 0px;
  padding: 30px 10px 30px 10px;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover{  
    background-color: #4F8255;
  }
`;

function GreenCal() {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <MainContainer>
        <SectionContainer>
          <Title>전자제품의 전기요금을 이곳에서 계산 할 수 있어요.</Title>
          <CalculatorBtn onClick={() => setShowModal(!showModal)}>전기 사용량 측정하기</CalculatorBtn>
          {showModal && (<Calculator onClose={handleClose}/>)}
        </SectionContainer>
      </MainContainer>
    </>
  );
}

export default GreenCal;

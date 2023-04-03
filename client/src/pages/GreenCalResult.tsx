import styled from "styled-components";
import React from "react";
import { useRecoilValue } from "recoil";
import { electricChargesState, totalUsageState } from "../recoil/state";
import { Link } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 700px;
`;
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 700px;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 50px;
  margin: 0px 0px 50px 0px;
  width: 100%;
`;
const ResultContents = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 25px;
  font-weight: 600;
  margin: 20px 0px 20px 0px;
`;
const KWH = styled.div`
  /* font-size: 20px; */
  color: blue;
  margin: 0px 10px 0px 10px;
`;
const Money = styled.div`
  /* font-size: 20px; */
  color: red;
  margin: 0px 10px 0px 10px;
`;
const CalculatorBtn = styled(Link)`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 30px;
  color: #ffff;
  background-color: #609966;
  text-align: center;
  border-radius: 10px;
  border: 0px;
  padding: 15px 50px 15px 50px;
  font-size: 20px;
  font-weight: 600;
  text-decoration-line: none;
  transition: background-color 0.3s ease;
  &:hover{  
    background-color: #4F8255;
  }
`;

function GreenCalResult() {
  const electricCharges = useRecoilValue(electricChargesState).toLocaleString();
  const totalUsage = useRecoilValue(totalUsageState).toLocaleString();

  return (
    <>
      <MainContainer>
        <SectionContainer>
          <Title>전력량 측정 결과</Title>
          <ResultContents>
            예상 전력량 <KWH>{totalUsage}</KWH>KWh 입니다.
          </ResultContents>
          <ResultContents>
            예상 전기요금 <Money>{electricCharges}</Money>원 입니다.
          </ResultContents>
          <CalculatorBtn to={"/"}>홈으로 가기</CalculatorBtn>
        </SectionContainer>
      </MainContainer>
    </>
  );
}

export default GreenCalResult;

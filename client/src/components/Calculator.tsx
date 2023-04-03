import styled from "styled-components";
import React,{ useState, useEffect } from "react";
import axios from "axios";
import Cancel from "../icon/cancel.svg"
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { electricChargesState } from "../recoil/state";
import { totalUsageState } from "../recoil/state";

const ModalWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    /* justify-content: center; */
    background-color: white;
    border-radius: 10px;
    border: 2px solid #609966;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
    width: 700px;
    /* height: 400px; */
    padding: 10px;
    text-align: center;
`;

const ModalTitle = styled.h2`
    color: #595959;
    padding: 10px 0px 0px 0px;
    font-size: 20px;
    font-weight: 600;
    margin-top: 20px;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* height: 50px; */
    width: 100%;
`;
const CloseButton = styled.img`
    display: flex;
    justify-content: center;
    position: relative;
    width: 40px;
    height: 40px;
    cursor: pointer;
`;
const CalculatorBtn = styled(Link)`
    display: flex;
    justify-content: center;
    margin: 0 auto;
    margin-top: 50px;
    margin-bottom: 30px;
    color: #ffff;
    /* width: 140px; */
    background-color: #609966;
    text-align: center;
    border-radius: 10px;
    border: 0px;
    padding: 15px 50px 15px 50px;
    font-size: 20px;
    font-weight: 600;
    text-decoration-line: none;
    transition: background-color 0.3s ease;
    cursor: pointer;
    &:hover{  
        background-color: #4F8255;
    }
`;
const InputContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-end;
    margin-top: 50px;
    margin: 0 auto;
`;
const ModalInput = styled.input`
    display: flex;
    margin-top: 50px;
    background-color: #ebebeb;
    border-width: 0px;
    border-radius: 10px;
    padding: 15px;
    width: 300px;
`;
const Unit = styled.div`
    font-size: 25px;
    font-weight: 600;
    margin: 0px 0px 10px 20px;
`;

interface modal{
    onClose: any;
}
function Calculator({ onClose }: modal) {
    const [power, setPower] = useState('');
    const [time, setTime] = useState('');
    const [electricCharges, setElectricCharges] = useRecoilState(electricChargesState);
    const [totalUsage, setTotalUsage] = useRecoilState(totalUsageState);

    const calsubmit = () => { // 환경 계산기
        axios.post('http://3.39.150.26:8080/calculators', {"hour" : `${time}`,"power_consumption" : `${power}`})
        .then((response) => {
        const { data } = response;
        setElectricCharges(data.data.electric_charges);
        setTotalUsage(data.data.total_usage);
        })
        .catch((error) => console.log(error));
    }

    return (
        <>
            <ModalWrapper>
                <ModalContent>
                    <CloseButton src={Cancel} onClick={onClose}/>
                    <TitleContainer>
                        <ModalTitle>계산하고자 하는 전자제품의 소비전력(W)와 사용할 시간(H)을 입력해 주세요.</ModalTitle>
                        <InputContainer>
                            <ModalInput placeholder="소비전력" onChange={(e) => setPower(e.target.value)}/>
                            <Unit>W</Unit>
                        </InputContainer>
                        <InputContainer>
                            <ModalInput placeholder="사용시간" onChange={(e) => setTime(e.target.value)}/>
                            <Unit>H</Unit>
                        </InputContainer>
                        <CalculatorBtn to={'/greencalresult'} onClick={calsubmit} >측정하기</CalculatorBtn>
                        {/* <CalculatorBtn onClick={calsubmit} >측정하기</CalculatorBtn> */}
                    </TitleContainer>
                </ModalContent>
            </ModalWrapper>
        </>
    );
}
export default Calculator;
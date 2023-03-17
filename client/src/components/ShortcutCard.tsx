import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GreenActImg from "../image/GreenAct.jpg";
import ReviewImg from "../image/Review.jpeg";
import GreenCalImg from "../image/GreenCal.jpg";
import NewsImg from "../image/News.jpg";

const Container = styled.div`
  width: 100%;
  height: 630px;
  display: flex;
  justify-content: space-between;
`;

interface SquareProps {
  greenact?: boolean;
  review?: boolean;
  greencal?: boolean;
  news?: boolean;
}
const Square = styled(Link)<SquareProps>`
  display: flex;
  justify-content: center;
  height: 500px;
  width: 23%;
  text-decoration: none;
  background: ${(props) =>
    props.greenact
      ? `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)), url(${GreenActImg})`
      : props.review
      ? `linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.25)), url(${ReviewImg})`
      : props.greencal
      ? `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)), url(${GreenCalImg})`
      : props.news
      ? `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)), url(${NewsImg})`
      : ""};
  background-size: cover;
  background-position: center;
  transition: all 1s ease;

  :hover {
    width: 32%;
    background: ${(props) =>
      props.greenact
        ? `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${GreenActImg})`
        : props.review
        ? `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${ReviewImg})`
        : props.greencal
        ? `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${GreenCalImg})`
        : props.news
        ? `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${NewsImg})`
        : ""};
    background-size: cover;
    background-position: center;
    h2 {
      display: none;
    }
    h3,
    p {
      display: block;
      animation: fadein 0.8s;
      @keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 100%;
  color: #ffffff;
  justify-content: center;
`;
const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 60%;
`;
const Title = styled.h3`
  display: none;
  font-size: 30px;
`;
const Text = styled.p`
  display: none;
  font-size: 20px;
`;
const RotateText = styled.h2`
  display: block;
  font-size: 35px;
  font-weight: 700;
  white-space: nowrap;
  transform: rotate(-90deg);
`;

const ShortcutCard = () => {
  return (
    <>
      <Container>
        <Square greenact to="./greenact">
          <Wrapper>
            <TextBox>
              <RotateText>녹색활동</RotateText>
              <Title>녹색활동</Title>
              <Text>
                탄소배출감소를 위한 다양한 활동을 공유하는 게시판입니다
              </Text>
            </TextBox>
          </Wrapper>
        </Square>
        <Square review to="./review">
          <Wrapper>
            <TextBox>
              <RotateText>친환경물품후기</RotateText>
              <Title>친환경물품후기</Title>
              <Text>
                친환경물품들을 경험해보고 후기를 공유하는 게시판입니다
              </Text>
            </TextBox>
          </Wrapper>
        </Square>
        <Square greencal to="./greencal">
          <Wrapper>
            <TextBox>
              <RotateText>환경계산기</RotateText>
              <Title>환경계산기</Title>
              <Text>전자제품 전력효율을 계산하여 전기요금을 알려드립니다</Text>
            </TextBox>
          </Wrapper>
        </Square>
        <Square news to="./news">
          <Wrapper>
            <TextBox>
              <RotateText>세계환경뉴스</RotateText>
              <Title>세계환경뉴스</Title>
              <Text>세계에서 주목하는 환경관련 이슈를 종합한 페이지입니다</Text>
            </TextBox>
          </Wrapper>
        </Square>
      </Container>
    </>
  );
};

export default ShortcutCard;

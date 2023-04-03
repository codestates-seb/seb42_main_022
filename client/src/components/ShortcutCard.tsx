import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import greenactimg from "../image/GreenAct.jpg";
import reviewimg from "../image/Review.jpeg";
import greencalimg from "../image/GreenCal.jpg";
import newsimg from "../image/News.jpg";
import freeimg from "../image/free.jpg";

const Container = styled.div`
  width: 80%;
  height: 700px;
  display: flex;
  justify-content: space-between;
  margin: 20px 0 200px 0;
`;

interface SquareProps {
  greenact?: string;
  review?: string;
  free?: string;
  greencal?: string;
  news?: string;
}
const StraightText = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  height: 50%;
  width: 100%;
`;

const Square = styled(Link)<SquareProps>`
  display: flex;
  justify-content: center;
  height: 650px;
  width: 17%;
  text-decoration: none;
  background: ${(props) =>
    props.greenact
      ? `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)), url(${greenactimg})`
      : props.review
      ? `linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.25)), url(${reviewimg})`
      : props.greencal
      ? `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)), url(${greencalimg})`
      : props.news
      ? `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)), url(${newsimg})`
      : props.free
      ? `linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.25)), url(${freeimg})`
      : ""};
  background-size: cover;
  background-position: center;
  transition: all 1s ease;

  :hover {
    width: 32%;
    background: ${(props) =>
      props.greenact
        ? `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${greenactimg})`
        : props.review
        ? `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${reviewimg})`
        : props.greencal
        ? `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${greencalimg})`
        : props.news
        ? `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${newsimg})`
        : props.free
        ? `linear-gradient(rgba(0, 0, 0, 0.40), rgba(0, 0, 0, 0.40)), url(${freeimg})`
        : ""};
    background-size: cover;
    background-position: center;
    ${StraightText} {
      display: flex;
      animation: fadein 0.8s;
      @keyframes fadein {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      h3,
      p {
        display: block;
      }
    }
    h2 {
      display: none;
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
  height: 50%;
`;

const Title = styled.h3`
  display: none;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;
const Text = styled.p`
  display: none;
  font-size: 20px;
  line-height: 1.3em;
  text-align: center;
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
    <Container>
      <Square greenact="true" to="./greenact">
        <Wrapper>
          <TextBox>
            <RotateText>녹색활동</RotateText>
            <StraightText>
              <Title>녹색활동</Title>
              <Text>
                탄소배출감소를 위한 다양한 활동을 공유하는 게시판입니다
              </Text>
            </StraightText>
          </TextBox>
        </Wrapper>
      </Square>
      <Square review="true" to="./review">
        <Wrapper>
          <TextBox>
            <RotateText>친환경물품후기</RotateText>
            <StraightText>
              <Title>친환경물품후기</Title>
              <Text>
                친환경물품들을 경험해보고 후기를 공유하는 게시판입니다
              </Text>
            </StraightText>
          </TextBox>
        </Wrapper>
      </Square>
      <Square free="true" to="./community">
        <Wrapper>
          <TextBox>
            <RotateText>자유게시판</RotateText>
            <StraightText>
              <Title>자유게시판</Title>
              <Text>
                자유롭게 다양한 주제에 대해 이야기를 나누는 게시판입니다
              </Text>
            </StraightText>
          </TextBox>
        </Wrapper>
      </Square>
      <Square greencal="true" to="./greencal">
        <Wrapper>
          <TextBox>
            <RotateText>환경계산기</RotateText>
            <StraightText>
              <Title>환경계산기</Title>
              <Text>전자제품 전력효율을 계산하여 전기요금을 알려드립니다</Text>
            </StraightText>
          </TextBox>
        </Wrapper>
      </Square>
      <Square news="true" to="./news">
        <Wrapper>
          <TextBox>
            <RotateText>세계환경뉴스</RotateText>
            <StraightText>
              <Title>세계환경뉴스</Title>
              <Text>세계에서 주목하는 환경관련 이슈를 종합한 페이지입니다</Text>
            </StraightText>
          </TextBox>
        </Wrapper>
      </Square>
    </Container>
  );
};

export default ShortcutCard;

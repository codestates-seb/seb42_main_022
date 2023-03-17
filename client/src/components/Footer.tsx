import React from "react";
import styled from "styled-components";
import { ReactComponent as NotionIcon } from "../icon/notion.svg";

const FooterContainer = styled.div`
  margin-top: 20px;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f6f6f6;
  padding: 8px;
  width: 90%;
  height: 320px;
  background-color: white;
  border: 1px solid black;
`;
const FooterTopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: flex-start;
  width: 80%;
  height: 100px;
  border: 1px solid gray;
`;
const FooterBottomWrapper = styled.div`
  text-align: left;
  margin-top: 20px;
  width: 80%;
  height: 80px;
  border: 1px solid gray;
`;
const TopLeftContentsWrapper = styled.div`
  margin-right: 8px;
  display: flex;
  flex-direction: column;
  border: 1px solid gray;
  width: 111px;
  height: 100%;
`;
const TopCenterContentsWrapper = styled.div`
  margin-right: 20px;
  text-align: left;
  border: 1px solid gray;
  width: 300px;
  height: 99%;
`;
const TopRightContentsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border: 1px solid gray;
  width: 280px;
  height: 99%;
`;
const LeftTopTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  border: 1px solid gray;
  width: 100%;
  height: 50%;
`;
const LeftBottomTextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border: 1px solid gray;
  width: 100%;
  height: 50%;
`;
const RightTextWrapper = styled.div`
  border: 1px solid gray;
  width: 100%;
  height: 32%;
`;
const Text = styled.span`
  font-size: 24px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterTopWrapper>
        <TopLeftContentsWrapper>
          <LeftTopTextWrapper>
            <Text style={{ fontSize: "32px", fontWeight: "bold" }}>
              고객센터
            </Text>
          </LeftTopTextWrapper>
          <LeftBottomTextWrapper>
            <NotionIcon width="32" height="32" />
            <NotionIcon width="32" height="32" />
          </LeftBottomTextWrapper>
        </TopLeftContentsWrapper>
        <TopCenterContentsWrapper>
          <RightTextWrapper
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Text>대표번호: 010-6397-9735</Text>
          </RightTextWrapper>
          <RightTextWrapper
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Text>운영시간: 항시 대기</Text>
          </RightTextWrapper>
          <RightTextWrapper
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
            }}
          >
            <Text>점심시간: 오후 12시 ~ 오후 1시</Text>
          </RightTextWrapper>
        </TopCenterContentsWrapper>
        <TopRightContentsWrapper>깃허브아이콘</TopRightContentsWrapper>
      </FooterTopWrapper>
      <FooterBottomWrapper>
        <Text>
          ©2023 하지만 빨랐조? / 대표 정민상 / 서울 강서구 공항대로 236 (11층,
          12층) / Green Circle 사이트의 모든 콘텐츠, 정보, UI, HTML 소스 등에
          대한 무단 복제, 전송, 배포, 크롤링, 스크래핑 등의 행위를 거부하며,
          이러한 행위는 관련 법령에 의해 엄격히 금지됩니다.
        </Text>
      </FooterBottomWrapper>
    </FooterContainer>
  );
};

export default Footer;

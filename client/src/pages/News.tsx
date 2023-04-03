import React from 'react';
import styled from "styled-components";
import { useNews } from "../react-query/useNews"
import ScrollToTop from '../components/ScrollToTop';
import dayjs from 'dayjs';
import 'dayjs/locale/ko'

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  width: 100%;
  @media screen and (max-width: 920px) {
    width: 100%;
    padding: 0px;
  }
`;
const SectionContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  margin: 50px 0px 0px 0px;
  width: 100%;
`;
const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 0 auto;
  width: 800px;
  height: 100%;
  padding: 0px 50px 20px 50px;
  @media screen and (max-width: 920px) {
    width: 100%;
    padding: 0px;
  }
`;
const NewsBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #F6F6F6;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  height: 120px;
  padding: 20px 50px 20px 50px;
  margin: 0px 0px 30px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  /* text-decoration-line: none; */
  cursor: pointer;
  &:hover{  
    text-decoration-line: underline;
  }
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin: 0px 0px 10px 0px;
  color: black;
`;
const Text = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 0px 0px 30px 0px;
`;
const Contents = styled.div`
  font-size: 15px;
  /* font-weight: bold; */
  text-align: center;
  margin: 0px 0px 10px 0px;
  color: black;
`;
const Time = styled.div`
  width: 100%;
  margin: 0px 0px 10px 0px;
  text-align: end;
  font-size: 13px;
  color: #757575;
`;


function News () {
  const { data: news, isLoading, isError } = useNews();

  return (
    <>
      {isLoading && "Error!"}
      {isError && "Loading..."}
      <MainContainer>
        <SectionContainer>
          <Text>환경 뉴스를 실시간으로 만나보세요!</Text>
          <NewsContainer>
            {news?.items.map((el, index) => {
              return (
                <NewsBox key={index} onClick={() => window.open(`${el.originallink}`, "_blank")}>
                  <Title>{el.title.replace(/<\/?(b|[^>]+|("|'))>|(&apos;)|(&quot;)/g, "")}</Title>
                  <Time>{dayjs(el.pub_date).locale('ko').format('YYYY년 M월 D일 ddd HH:mm')}</Time>
                  <Contents>{el.description.replace(/<\/?(b|[^>]+|("|'))>|(&apos;)|(&quot;)/g, "")}</Contents>
                </NewsBox>
              )
            })}
          </NewsContainer>
        </SectionContainer>
      </MainContainer>
      <ScrollToTop />
    </>
  );
}

export default News;
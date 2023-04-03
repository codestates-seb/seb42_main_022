import React from "react";
import styled from "styled-components";
import treeIcon from "../image/treeIcon.png";
import { useRanking } from "../react-query/useRanking"
import ScrollToTop from '../components/ScrollToTop';

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  /* flex-direction: column; */
  /* padding: 30px 10px 10px 10px; */
  @media screen and (max-width: 920px) {
    width: 100%;
  }
`;
const SectionContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  margin: 50px 0px 0px 0px;
`;
const RankContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 800px;
  height: 100%;
  /* padding: 0px 50px 20px 50px; */
  @media screen and (max-width: 920px) {
    width: 100%;
    padding: 0px;
  }
`;
const Rank = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #F2FFED;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 15px;
  width: 100%;
  height: 50px;
  padding: 20px 0px 20px 0px;
  margin: 0px 0px 30px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;
const RankIndex = styled.div`
  font-size: 30px;
  font-weight: bold;
  /* margin: 0px 40px 0px 40px; */
  @media screen and (max-width: 920px) {
    font-size: 20px;
  }
`;
const RankName = styled.div`
  font-size: 25px;
  width: 180px;
  font-weight: bold;
  /* margin: 0px 80px 0px 50px; */
  @media screen and (max-width: 920px) {
    font-size: 20px;
  }
`;
const RankTreeCount = styled.div`
  font-size: 25px;
  font-weight: bold;
  /* margin: 0px 20px 0px 60px; */
  /* width: 140px; */
  @media screen and (max-width: 920px) {
    font-size: 18px;
  }
`;
const RankIcon = styled.img`
  width: 50px;
  /* margin: 0px 30px 0px 30px; */
  @media screen and (max-width: 920px) {
    width: 30px;
  }
`;
const TreeKingIcon = styled.img`
  width: 70px;
  margin: 0px 30px 0px 30px;
  @media screen and (max-width: 920px) {
    width: 50px;
  }
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 0px 0px 30px 0px;
  @media screen and (max-width: 920px) {
    font-size: 20px;
  }
`;
const SubTitle = styled.div`
  font-size: 60px;
  text-align: center;
  @media screen and (max-width: 920px) {
    font-size: 40px;
  }
`;
function Ranking() {
  const { data: ranking, isLoading, isError } = useRanking();
  return (
    <>
      {isLoading && "Error!"}
      {isError && "Loading..."}
      <MainContainer>
        <SectionContainer>
          <Title>현재 나무킹은 {ranking && (ranking[0].name)}님입니다.</Title>
          <SubTitle><TreeKingIcon src={treeIcon}/>Tree Ranking<TreeKingIcon src={treeIcon}/></SubTitle>
          <RankContainer>
            {ranking?.map((el, index) => {
              return (
                <Rank key={index}>
                  <RankIndex>{index+1}</RankIndex>
                  <RankName>{el.name}</RankName>
                  <RankTreeCount>{el.tree_count}&nbsp;그루</RankTreeCount>
                  <RankIcon src={treeIcon}/>
                </Rank>
              )
            })}
          </RankContainer>
        </SectionContainer>
      </MainContainer>
      <ScrollToTop />
    </>
  );
}

export default Ranking;
import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as LogoImg } from "../icon/main_logo.svg";
import { ReactComponent as ProfileIcon } from "../icon/account_circle.svg";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px;
  width: 90%;
  height: 61px;
  background-color: white;
  border: 1px solid black;
`;
const TapWrapper = styled.div`
  margin: auto;
  flex-grow: 0.5;
`;
const ProfileWrapper = styled.div`
  margin: auto;
  flex-grow: 0.5;
`;
const EmptySpace = styled.div`
  flex-grow: 5;
`;
const LogoLink = styled(Link)`
  margin-right: 20px;
`;
const HeaderTap = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 20px;
`;
const ProfileLink = styled(Link)``;

const Header = () => {
  return (
    <HeaderContainer>
      <LogoLink to="./">
        <LogoImg width="80" />
      </LogoLink>
      <TapWrapper>
        <HeaderTap to="./community">녹색활동</HeaderTap>
      </TapWrapper>
      <TapWrapper>
        <HeaderTap to="./community">친환경 물품후기</HeaderTap>
      </TapWrapper>
      <TapWrapper>
        <HeaderTap to="./community">자유게시판</HeaderTap>
      </TapWrapper>
      <TapWrapper>
        <HeaderTap to="./community">세계환경뉴스</HeaderTap>
      </TapWrapper>
      <TapWrapper>
        <HeaderTap to="./community">환경계산기</HeaderTap>
      </TapWrapper>
      <TapWrapper>
        <HeaderTap to="./community">랭킹</HeaderTap>
      </TapWrapper>
      <EmptySpace />
      <ProfileWrapper>
        <ProfileLink to="./community">
          <ProfileIcon width="32" height="32" />
        </ProfileLink>
      </ProfileWrapper>
    </HeaderContainer>
  );
};

export default Header;

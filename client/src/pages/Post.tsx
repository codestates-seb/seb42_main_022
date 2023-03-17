import React from "react";
import styled from "styled-components";
import accountCircle from "../icon/account_circle.svg";
import { ReactComponent as DelIcon } from "../icon/delete.svg";
import { ReactComponent as LikeIcon } from "../icon/thumbup.svg";
import { ReactComponent as EditIcon } from "../icon/edit.svg";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  margin: 51px auto;
`;
const Left_wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

// 상세게시글
const Post_wrapper = styled.div`
  width: 680px;
  height: auto;
  border-radius: 15px;
  background-color: #f6f6f6;
`;
const User_container = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
`;
const User_wrapper = styled.div`
  display: flex;
  margin: 30px;
`;
const User_img_wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
`;
const User_name_wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 20px;
  font-weight: 700;
`;
const User_level_wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  margin-left: 10px;
`;
const Content_container = styled.div`
  height: 400px;
`;
const Content_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
`;
const Content_title = styled.div`
  font-size: 25px;
`;
const Content_img = styled.div``;
const Content_detail = styled.div`
  font-size: 18px;
`;
const Info_container = styled.div`
  display: flex;
  flex-direction: column;
  height: 70px;
  border-top: 1px solid #cccccc;
  color: #878484;
`;
const Info_wrapper = styled.div`
  margin: 10px;
  font-size: 15px;
`;
const Info_wrapper1 = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 3px;
`;
const Date = styled.div``;
const View = styled.div``;
const Info_wrapper2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
`;
const Like_wrapper = styled.div`
  display: flex;
`;
const LikeButton = styled.div``;
const LikeCount = styled.div`
  margin-left: 5px;
`;
const Button_wrapper = styled.div`
  display: flex;
`;
const FixButton = styled.div``;
const DeleteButton = styled.div``;

// 추천게시글
const Featured_container = styled.div`
  width: 370px;
  height: 500px;
  margin-left: 70px;
  border-radius: 15px;
  background-color: #f6f6f6;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const Featured_wrapper = styled.div`
  position: sticky;
  margin: 50px 10px;
`;
const Featured_title = styled.div`
  margin-bottom: 50px;
`;
const List_wrapper = styled.div``;
const List = styled.ul``;
const List_el = styled.li`
  display: flex;
  align-items: center;
  margin-top: 30px;
`;
const List_like = styled.button`
  display: flex;
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: #609966;
  color: white;
  border: none;
  cursor: pointer;
`;
const List_likeicon = styled.span`
  width: 18px;
  display: flex;
  align-items: center;
  height: 100%;
`;
const List_likecnt = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50px;
  font-size: 18px;
`;
const List_title = styled.span`
  font-size: 24px;
  margin-left: 15px;
`;

// 댓글창 위 댓글수
const CommentCnt = styled.div`
  margin: 20px 10px;
  text-align: left;
  font-size: 23px;
`;

// 댓글창
const Comment_container = styled.div`
  width: 680px;
  border: 1px solid red;
  background-color: #f6f6f6;
  border-radius: 15px 15px 0 0;
`;

const Post = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <Left_wrapper>
            <Post_wrapper>
              <User_container>
                <User_wrapper>
                  <User_img_wrapper>
                    <img src={accountCircle} />
                  </User_img_wrapper>
                  <User_name_wrapper>정민상</User_name_wrapper>
                  <User_level_wrapper>Lv.5</User_level_wrapper>
                </User_wrapper>
              </User_container>
              <Content_container>
                <Content_wrapper>
                  <Content_title>
                    <div>
                      친환경 물품 사용 후기 ( 커피 원두 자루, 풀빨대, 천연 밀랍
                      캔들)
                    </div>
                  </Content_title>
                  <Content_img>
                    <div>이미지</div>
                  </Content_img>
                  <Content_detail>
                    <div>
                      이번에 소개해드릴 물품은 커피 원두 자루, 풀빨대, 천연 밀랍
                      캔들입니다! 소개만 해드립니다 ^^ 이상입니다
                    </div>
                  </Content_detail>
                </Content_wrapper>
              </Content_container>
              <Info_container>
                <Info_wrapper>
                  <Info_wrapper1>
                    <Date>2023년 3월 6일 오후 18:33</Date>
                    <View>조회 5</View>
                  </Info_wrapper1>
                  <Info_wrapper2>
                    <Like_wrapper>
                      <LikeButton>
                        <LikeIcon width="24px" height="24px" fill="#2C9C2A" />
                      </LikeButton>
                      <LikeCount>좋아요 27</LikeCount>
                    </Like_wrapper>
                    <Button_wrapper>
                      <FixButton>
                        <EditIcon fill="#878484" />
                      </FixButton>
                      <DeleteButton>
                        <DelIcon fill="#878484" />
                      </DeleteButton>
                    </Button_wrapper>
                  </Info_wrapper2>
                </Info_wrapper>
              </Info_container>
            </Post_wrapper>
            <CommentCnt>
              <span>댓글 1</span>
            </CommentCnt>
            <Comment_container>
              <div>작성+입력</div>
            </Comment_container>
          </Left_wrapper>
          <Featured_container>
            <Featured_wrapper>
              <Featured_title>추천게시글</Featured_title>
              <List_wrapper>
                <List>
                  <List_el>
                    <List_like>
                      <List_likeicon>
                        <LikeIcon width="18px" height="18px" fill="#ffffff" />
                      </List_likeicon>
                      <List_likecnt>999</List_likecnt>
                    </List_like>
                    <List_title>친환경 물품 사용 후기</List_title>
                  </List_el>
                  <List_el>
                    <List_like>
                      <List_likeicon>
                        <LikeIcon width="18px" height="18px" fill="#ffffff" />
                      </List_likeicon>
                      <List_likecnt>832</List_likecnt>
                    </List_like>
                    <List_title>친환경 물품 사용 후기</List_title>
                  </List_el>
                  <List_el>
                    <List_like>
                      <List_likeicon>
                        <LikeIcon width="18px" height="18px" fill="#ffffff" />
                      </List_likeicon>
                      <List_likecnt>103</List_likecnt>
                    </List_like>
                    <List_title>제가 키우는 식물입니다</List_title>
                  </List_el>
                  <List_el>
                    <List_like>
                      <List_likeicon>
                        <LikeIcon width="18px" height="18px" fill="#ffffff" />
                      </List_likeicon>
                      <List_likecnt>55</List_likecnt>
                    </List_like>
                    <List_title>친환경 물품 사용 후기</List_title>
                  </List_el>
                  <List_el>
                    <List_like>
                      <List_likeicon>
                        <LikeIcon width="18px" height="18px" fill="#ffffff" />
                      </List_likeicon>
                      <List_likecnt>2</List_likecnt>
                    </List_like>
                    <List_title>친환경 물품 사용 후기</List_title>
                  </List_el>
                </List>
              </List_wrapper>
            </Featured_wrapper>
          </Featured_container>
        </Wrapper>
      </Container>
    </>
  );
};

export default Post;

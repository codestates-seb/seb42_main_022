import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useMemberInfo } from "../react-query/useMemberInfo";
import { useMyPost } from "../react-query/useMyPost";
import { useRecoilValue } from "recoil";
import { memberInfoAtom } from "../recoil/state";
import Deleteaccount from "../components/Deleteaccount";
import { ReactComponent as SproutIcon } from "../icon/sprout.svg";
import { ReactComponent as LikeIcon } from "../icon/thumbup.svg";
import { defaultInstance, authInstance } from "../utils/api";
import axios from "axios";

interface LevelProp {
  exp: number;
}

interface memberData {
  email: string;
  name: string;
  phone: string;
  point: string;
  tree_count: string;
  level_dto: {
    user_name: string;
    level: number;
    level_exp: number;
    total_exp: number;
  };
  member_id: number;
  member_status: string;
  profile_url: string;
}

interface MyPost {
  title: string;
  contents: string;
  board_creator: string;
  creator_level: string;
  delegate_image_path: string;
  board_id: number;
  like_count: number;
  view_count: number;
  created_at: string;
  modified_at: string;
}

const Container = styled.div`
  /* width: 100%;
  height: 100%; */
`;

// 흰색부분 컨테이너
const White_Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 450px;
`;
// 유저정보 전체박스
const User_wrapper = styled.div`
  width: 600px;
  height: 250px;
  margin: 40px auto 0 auto;
  @media screen and (max-width: 610px) {
    width: 100%;
  }
`;
// 위쪽 두개항목
const User_Top = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
`;

const User_box1 = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70%;
`;
const User_ImgBox = styled.div`
  width: 84px;
  height: 100%;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const User_ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 84px;
  height: 100%;
`;
const Editlink = styled(Link)`
  text-decoration: none;
`;
const User_Button = styled.div`
  height: 40px;
  width: 60px;
  background: #609966;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border: none;
  cursor: pointer;
  border-radius: 15px;
  span {
    background: transparent;
  }
`;
const User_box2 = styled.div`
  display: flex;
  height: 30%;
  width: 100%;
`;
const User_name = styled.div`
  display: flex;
  height: 100%;
  width: 20%;
  font-size: 1.125rem;
  font-weight: 700;
  /* justify-content: center; */
  align-items: center;
`;
const User_mileage = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  height: 100%;
  width: 20%;
  font-size: 0.938rem;
`;
// 아래 두개항목
const User_Bottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
`;
const User_box3 = styled.div`
  display: flex;
  flex-direction: column;
  height: 50%;

  /* margin-left: px; */
`;
const User_level = styled.div`
  display: flex;
  justify-content: space-between;
  width: 40%;
  height: 35%;
  font-size: 0.938rem;
`;
const User_levelbar = styled.div`
  width: 40%;
  height: 65%;
`;
const TotalExp = styled.div`
  width: 100%;
  height: 11px;
  background: #d9d9d9;
  border-radius: 10px;
`;
const CurExp = styled.div<LevelProp>`
  height: 100%;
  width: ${(props) => props.exp}%;
  background: rgb(96, 153, 102);
  background: linear-gradient(
    90deg,
    rgba(96, 153, 102, 1) 0%,
    rgba(5, 172, 1, 0.34919905462184875) 100%
  );
  border-radius: 10px;
  animation-name: my-animation;
  animation-duration: 1s;
  animation-direction: alternate;
  animation-iteration-count: 1;
  animation-timing-function: ease;
  box-shadow: 0 0 4px rgb(96, 153, 102);
  @keyframes my-animation {
    from {
      background-color: #ffffff;
      width: 0%;
    }
    to {
      background: linear-gradient(
        90deg,
        rgba(96, 153, 102, 1) 0%,
        rgba(5, 172, 1, 0.34919905462184875) 100%
      );
      width: ${(props) => props.exp};
      box-shadow: 0 0 4px rgb(96, 153, 102);
    }
  }
`;
const User_box4 = styled.div`
  display: flex;
  height: 50%;
  align-items: center;
  button {
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
  }
`;
// -------------------------------------------------------------------------------------------------------------- //

// 내 게시글 텍스트부분

const Mypagetxt = styled.div`
  font-weight: 700;
  height: 50px;
`;

// -------------------------------------------------------------------------------------------------------------- //

// 회색부분 컨테이너
const Gray_Container = styled.div`
  flex: 1;
  background: #e3e3e3;
  padding: 30px 0;
`;
const Post_Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: auto;
  margin: 0 auto;
  padding-top: 20px;
  @media screen and (max-width: 610px) {
    width: 100%;
  }
`;
const NoPostBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;

  h1 {
    margin-top: 20px;
    text-align: center;
    font-size: 2rem;
    color: #808080;
  }
`;
const Post_wrapper = styled(Link)`
  display: flex;
  height: 100px;
  width: 100%;
  align-items: center;
  margin-top: 30px;
  border-radius: 15px;
  background: #f6f6f6;
  text-decoration: none;
`;
const Postbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
`;
const Post_Left = styled.div`
  height: 100%;
  width: 70%;
  color: black;
`;
const Post_title = styled.div`
  display: flex;
  width: 100%;
  height: 55%;
  align-items: center;
`;
const Post_info = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45%;
  color: #878484;
`;
//
const Post_Right = styled.div`
  height: 80%;
  width: 20%;
  /* border: 1px solid green; */

  img {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    object-fit: cover;
    border: 0;
  }
`;

function MyPage() {
  const token = localStorage.token;
  const [memberInfo, setMemberInfo] = useState<memberData | null>(null);
  const [memberPost, setMemberPost] = useState<MyPost[] | null>(null);
  // const {
  //   data: member,
  //   isLoading: memberLoading,
  //   isError: memberError,
  // } = useMemberInfo();
  // const {
  //   data: posts,
  //   isLoading: postsLoading,
  //   isError: postsError,
  // } = useMyPost();

  const [ismodalopen, setIsmodalopen] = useState(false);

  function handleModalOpen() {
    setIsmodalopen(!ismodalopen);
  }

  useEffect(() => {
    const id = localStorage.memberid;
    const url = `http://3.39.150.26:8080/members/${id}`;
    const url2 = `http://3.39.150.26:8080/boards/myBoards/${id}`;
    const header = {
      Authorization: token,
    };
    const fetchData = async () => {
      try {
        const [myData, myPost] = await Promise.all([
          axios.get(url, { headers: header }),
          axios.get(url2, { headers: header }),
        ]);

        setMemberInfo(myData.data);
        setMemberPost(myPost.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  if (!token) {
    return <div>로그인 해주세요</div>;
  }

  return (
    <Container>
      {memberInfo ? (
        <>
          {ismodalopen && (
            <Deleteaccount
            // onClose={handleClose}
            // onConfirm={handleConfirm}
            // onSubmit={submit}
            />
          )}
          <White_Container>
            <User_wrapper>
              <User_Top>
                <User_box1>
                  <User_ImgBox>
                    <img
                      src={memberInfo.profile_url}
                      style={{ width: "84px", height: "84px" }}
                    />
                  </User_ImgBox>
                  <User_ButtonBox>
                    <Editlink to="../mypageedit">
                      <User_Button>
                        <span>편집</span>
                      </User_Button>
                    </Editlink>
                  </User_ButtonBox>
                </User_box1>
                <User_box2>
                  <User_name>{memberInfo.name}</User_name>
                  <User_mileage>마일리지 {memberInfo.point}</User_mileage>
                </User_box2>
              </User_Top>
              <User_Bottom>
                <User_box3>
                  <User_level>
                    <span>Lv.{memberInfo.level_dto.level}</span>
                  </User_level>
                  <User_levelbar>
                    <TotalExp>
                      <CurExp exp={memberInfo.level_dto.level_exp}></CurExp>
                    </TotalExp>
                  </User_levelbar>
                </User_box3>
                <User_box4>
                  <button onClick={handleModalOpen}>회원탈퇴</button>
                </User_box4>
              </User_Bottom>
            </User_wrapper>
            <Mypagetxt>내 게시글</Mypagetxt>
          </White_Container>
          <Gray_Container>
            <Post_Container>
              {memberPost && memberPost.length > 0 ? (
                memberPost.map((el, idx: number) => {
                  return (
                    <Post_wrapper key={idx} to={`../community/${el.board_id}`}>
                      <Postbox>
                        <Post_Left>
                          <Post_title>{el.title}</Post_title>
                          <Post_info>
                            <span>
                              <LikeIcon
                                width="20px"
                                height="20px"
                                fill="#878484"
                              />
                            </span>
                            <span style={{ marginLeft: "5px" }}>
                              {el.like_count}
                            </span>
                          </Post_info>
                        </Post_Left>
                        <Post_Right>
                          {el.delegate_image_path ? (
                            <img src={el.delegate_image_path} />
                          ) : null}
                        </Post_Right>
                      </Postbox>
                    </Post_wrapper>
                  );
                })
              ) : (
                <NoPostBox>
                  <SproutIcon></SproutIcon>
                  <h1>게시글을 작성해주세요</h1>
                </NoPostBox>
              )}
            </Post_Container>
          </Gray_Container>
        </>
      ) : (
        "Loading..."
      )}
    </Container>
  );
}

export default MyPage;

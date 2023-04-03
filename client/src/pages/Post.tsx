import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFeatList } from "../react-query/useFeatList";
import styled from "styled-components";
import { useOnePost } from "../react-query/useOnePost";
import { defaultInstance, authInstance } from "../utils/api";
import dayjs from "dayjs";
import "dayjs/locale/ko"; // import the locale for Korean language
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { ReactComponent as DelIcon } from "../icon/delete.svg";
import { ReactComponent as LikeIcon } from "../icon/thumbup.svg";
import { ReactComponent as EditIcon } from "../icon/edit.svg";
import { ReactComponent as ArrowForwardIcon } from "../icon/arrowforward.svg";
import { ReactComponent as ArrowBackIcon } from "../icon/arrowback.svg";
import { ReactComponent as DoneIcon } from "../icon/donesmall.svg";
import { ReactComponent as UserIcon } from "../icon/user.svg";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

interface BoardData {
  title: string;
  contents: string;
  member: {
    email: string;
    name: string;
    phone: string;
    point: string;
    tree_count: string;
    level_dto: null | {
      level_name: string;
      min_point: string;
    };
    member_id: number;
    member_status: string;
    profile_url: string;
  };
  creator_level: number;
  upload_dto: {
    file_id: number;
    file_name: string;
    image_path: string;
  }[];
  comments: any[];
  board_id: number;
  like_count: number;
  view_count: number;
  created_at: string;
  modified_at: string;
}

const Container = styled.div`
  display: flex;
  margin-top: 20px;
`;
const Wrapper = styled.div`
  display: flex;
  margin: 0 auto 100px auto;
`;
const Left_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// * 상세게시글
const Post_wrapper = styled.div`
  width: 630px;
  height: auto;
  border-radius: 15px;
  background-color: #f6f6f6;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 635px) {
    width: 100%;
  }
`;
const User_container = styled.div`
  display: flex;
  align-items: center;
  height: 70px;
`;
const User_wrapper = styled.div`
  display: flex;
`;
const User_img_wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-left: 20px;
`;
const User_img_wrapper2 = styled(User_img_wrapper)`
  width: 10%;
  min-width: 50px;
  max-width: 50px;
  margin-left: 0;
`;
const UserImgBox = styled.div`
  width: 48px;
  height: 48px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const User_name_wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;
  font-size: 1.25rem;
  font-weight: 700;
`;
const User_level_wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  margin: 5px 0 0 5px;
`;
const Content_container = styled.div`
  height: auto;
`;
const Content_wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 20px;
`;
const Content_title = styled.div<{ disabled: boolean }>`
  font-size: 25px;
  textarea {
    width: 99%;
    height: auto;
    resize: none;
    font-size: 25px;
    font-weight: bold;
    border: none;
    border-radius: 15px;
    background-color: transparent;
    margin-bottom: 10px;
    overflow-y: hidden;
    &:focus {
      outline: 1px solid #609966;
    }
    ${(props) => !props.disabled && "outline: 2px solid #609966"};
    :disabled {
      color: black;
    }
  }
`;

const Content_CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 15px auto;
`;
const Content_img = styled.div`
  display: flex;
  width: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Content_imgButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: transparent;
  border: none;
  cursor: pointer;
  :hover {
    svg {
      fill: #609966;
    }
  }
  &:first-child {
    left: 10px;
  }
  &:last-child {
    right: 10px;
  }
`;
const Content_detail = styled.div<{ disabled: boolean }>`
  font-size: 18px;
  textarea {
    width: 99%;
    font-size: 18px;
    resize: none;
    border: none;
    border-radius: 15px;
    background-color: transparent;
    margin-bottom: 10px;
    overflow-y: hidden;
    ${(props) => !props.disabled && "outline: 2px solid #609966"};
    :disabled {
      color: black;
    }
  }
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
const LikeButtonBox = styled.div`
  display: flex;
  align-items: center;
`;
const LikeButton = styled.button<{ clicked: boolean }>`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  svg {
    fill: ${({ clicked }) => (clicked ? "#609966" : "#878484")};
  }
  :hover {
    svg {
      fill: #4f8255;
    }
  }
`;
const LikeCount = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;
const Button_wrapper = styled.div`
  display: flex;
`;
const FixButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  :hover {
    svg {
      fill: #4f8255;
    }
  }
`;
const DeleteButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  :hover {
    svg {
      fill: #4f8255;
    }
  }
`;

// -------------------------------------------------------------------------------------------------------------- //

// * 추천게시글
const RightBox = styled.div`
  height: 100%;
`;
const Featured_container = styled.div`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  /* top: 0; */
  width: 357px;
  height: 400px;
  border-radius: 15px;
  background-color: #f6f6f6;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  margin-left: 60px;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;
const Featured_wrapper = styled.div`
  margin: 0 10px;
  width: 100%;
`;
const Featured_title = styled.div`
  text-align: center;
  margin-bottom: 50px;
  font-size: 1.875rem;
`;
const List_wrapper = styled.div``;
const List = styled.ul``;
const List_el = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const LikeBox = styled.div`
  display: flex;
  justify-content: center;
  width: 10%;
`;
const List_like = styled.button`
  display: flex;
  width: 50px;
  height: 25px;
  border-radius: 15px;
  background-color: #609966;
  color: white;
  border: none;
  /* cursor: pointer; */
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
  font-size: 1.125rem;
`;
const Featlink = styled(Link)`
  text-decoration: none;
  color: black;
  :hover {
    color: #609966;
  }
`;
const TitleBox = styled.div`
  width: 80%;
`;
const List_title = styled.span`
  flex-grow: 2;
  font-size: 1.1rem;
  margin-left: 15px;
`;

// -------------------------------------------------------------------------------------------------------------- //

// * 댓글창 위 댓글수
const CommentCnt = styled.div`
  margin: 20px 10px;
  text-align: left;
  font-size: 23px;
`;

// -------------------------------------------------------------------------------------------------------------- //

// * 댓글창

const Comment_container = styled.div`
  width: 630px;
  background-color: #f6f6f6;
  border-radius: 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 635px) {
    width: 100%;
  }
`;
// 댓글입력창
const Input_container = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  /* padding: 0 15px; */
`;
const Input_wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 10px 0 20px;
`;
const InputBox = styled.div`
  width: 80%;
  margin: 0 5px 0 10px;
`;
const Comment_Input = styled.input`
  font-size: 1.25rem;
  width: 95%;
  border: none;
  background: transparent;
  outline: none;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  width: 10%;
  min-width: 50px;
`;
const Comment_Button = styled.button`
  height: 30px;
  width: 50px;
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
  :hover {
    background: #4f8255;
  }
  ${({ disabled }) =>
    disabled &&
    `
      opacity: 0.5;
      cursor: not-allowed;
      background: #757575;
      :hover {
        background: #757575;
      }
    `}
`;
// 댓글 나타나는 창
const Comments_container = styled.div``;
const Comments_wrapper = styled.div`
  border-top: 1px solid #cccccc;
`;
const Comments_contents_wrapper = styled.div`
  margin: 0 18px 15px 18px;
`;
const Comments_contents = styled.div`
  line-height: 1.3;
`;

//!-------------------------------------------------------------------------------------------------------------- //

function Post() {
  const { id, category } = useParams();
  const {
    data: post,
    isLoading: postLoading,
    isError: postError,
    refetch: refetchPost,
  } = useOnePost();
  const {
    data: feat,
    isLoading: featLoading,
    isError: featError,
  } = useFeatList();

  const [boardData, setBoardData] = useState<BoardData | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [content, setContent] = useState<string | undefined>(undefined);
  const [comment, setComment] = useState("");
  const [isFixed, setisFixed] = useState<boolean>(false);
  const [clicked, setClicked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const totalSlides = boardData ? boardData.upload_dto.length : null;
  const textarea = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setBoardData(post);
      setTitle(post.title);
      setContent(post.contents);
    }
  }, [post, clicked]);

  useEffect(() => {
    // 댓글input 수정시 바로 반영
    console.log("Comment updated:", comment);
  }, [comment]);

  useEffect(() => {
    // Refetch data when id or category changes
    refetchPost();
  }, [id, category]);

  if (postLoading) {
    return <div>Loading...</div>;
  }

  if (postError) {
    return <div>Error fetching data</div>;
  }

  //! 핸들러
  // 제목 입력 내용 관리
  function handleTitleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTitle(e.currentTarget.value);
  }
  // 콘텐츠 입력 내용 관리
  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.currentTarget.value);
  }
  // 댓글 입력 내용 관리
  function handleCommentChange(e: React.ChangeEvent<HTMLInputElement>) {
    setComment(e.currentTarget.value);
  }
  // textarea 크기 자동조절
  function handleResizeHeight() {
    if (textarea.current) {
      textarea.current.style.height = "auto";
      textarea.current.style.height = textarea.current.scrollHeight + "px";
    }
  }
  // function checkAuthorization(boardData: BoardData, message: string) {
  //   if (!localStorage.token) {
  //     alert("로그인을 해주세요");
  //     return false;
  //   } else if (
  //     boardData &&
  //     +localStorage.memberid !== +boardData.member.member_id
  //   ) {
  //     alert(message);
  //     return false;
  //   }
  //   return true;
  // }

  // 좋아요 클릭 관리
  async function handleLikeClick() {
    const url = `/boards/${id}/Like`;
    const body = {
      member_id: localStorage.memberid,
    };

    try {
      if (!localStorage.token) {
        alert("로그인을 해주세요");
      } else if (
        boardData &&
        localStorage.memberid === boardData.member.member_id
      ) {
        alert("본인 게시글은 추천할 수 없습니다!");
      } else {
        setIsSubmitting(true);
        await authInstance.post(url, body);
        console.log("좋아요를 보냈습니다");
        setIsSubmitting(false);
        window.location.reload();
      }
    } catch (error) {
      console.log("좋아요를 실패했습니다:", error);
    }
  }
  // 게시글 삭제 관리
  async function handleDeleteClick() {
    const url = `/boards/${id}`;

    try {
      if (!localStorage.token) {
        alert("로그인을 해주세요");
      } else if (
        boardData &&
        +localStorage.memberid !== +boardData.member.member_id
      ) {
        alert("본인 게시글만 삭제 가능합니다!");
      } else {
        setIsSubmitting(true);
        await defaultInstance.delete(url);
        // console.log("게시글이 삭제되었습니다");
        alert("게시글이 삭제되었습니다!");
        setIsSubmitting(false);
        navigate(`../${category}`);
        window.location.reload();
      }
    } catch (error) {
      console.log("게시글 삭제를 실패했습니다:", error);
    }
  }
  // 게시글 수정 버튼 관리
  function handleFixClick() {
    setisFixed(!isFixed);
  }
  // 게시글 수정 관리
  async function handlePatchPost() {
    const url = `/boards/${id}`;
    const formData = new FormData();
    formData.append("title", `${title}`);
    formData.append("contents", `${content}`);
    formData.append("files", "");

    try {
      if (!localStorage.token) {
        alert("로그인을 해주세요");
      } else if (
        boardData &&
        +localStorage.memberid !== +boardData.member.member_id
      ) {
        alert("본인 게시글만 수정 가능합니다!");
      } else {
        setIsSubmitting(true);
        const response = await defaultInstance.patch(url, formData);
        setIsSubmitting(false);
        window.location.reload();
        console.log(response.data);
        // console.log("게시글을 수정하였습니다");
      }
    } catch (error) {
      console.log("게시글 수정을 실패하였습니다", error);
    }
  }
  // 댓글 등록 관리
  async function handlePostComment() {
    const url = "/comments";
    const body = {
      member_id: localStorage.memberid,
      board_id: id,
      contents: comment,
    };
    try {
      setIsSubmitting(true);
      const response = await defaultInstance.post(url, body);
      setIsSubmitting(false);
      // console.log("Comment posted:", response.data);
      setClicked(!clicked);
      window.location.reload();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  }
  // 댓글 삭제 관리
  async function handleDeleteComment(commentid: number) {
    const url = `/comments/${commentid}`;
    try {
      setIsSubmitting(true);
      const response = await defaultInstance.delete(url);
      // console.log("댓글이 삭제되었습니다:", response.data);
      setIsSubmitting(false);
      window.location.reload();
    } catch (error) {
      console.error("댓글 삭제 실패:", error);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handlePostComment();
  }
  // 이미지 좌우 버튼 관리
  function nextSlide() {
    totalSlides && setCurrentSlide((currentSlide + 1) % totalSlides);
  }
  function prevSlide() {
    totalSlides &&
      setCurrentSlide((currentSlide - 1 + totalSlides) % totalSlides);
  }
  function handleFeatClick() {
    console.log("clicked FeatPost", `postid :${id}`);
  }
  // 시간 변환 관리
  function setConvertTime(time: string) {
    const formattedDate = dayjs(time)
      .add(9, "h")
      .tz("Asia/Seoul")
      .format("YYYY년 MM월 DD일 HH:mm");
    return formattedDate;
  }
  // 게시글 길이 관리
  function setTitleLength(title: string): string {
    if (title.length > 18) return title.slice(0, 18) + "...";
    return title;
  }

  return (
    <Container>
      {boardData ? (
        <Wrapper>
          <Left_wrapper>
            {/* 게시글 상세보기 부분 */}
            <Post_wrapper>
              <User_container>
                <User_wrapper>
                  <User_img_wrapper>
                    <UserImgBox>
                      {boardData.member.profile_url ? (
                        <img src={boardData.member.profile_url} />
                      ) : (
                        <UserIcon />
                      )}
                    </UserImgBox>
                  </User_img_wrapper>
                  <User_name_wrapper>{boardData.member.name}</User_name_wrapper>
                  <User_level_wrapper>
                    Lv.{boardData.creator_level}
                  </User_level_wrapper>
                </User_wrapper>
              </User_container>
              <Content_container>
                <Content_wrapper>
                  <Content_title disabled={!isFixed}>
                    <textarea
                      ref={textarea}
                      value={title}
                      onChange={(e) => {
                        handleTitleChange(e);
                        handleResizeHeight();
                      }}
                      disabled={!isFixed}
                    />
                  </Content_title>
                  <Content_CarouselContainer>
                    <Content_img>
                      {boardData.upload_dto.map((image, idx) => {
                        return (
                          <img
                            key={idx}
                            src={image.image_path}
                            alt="picture"
                            style={{
                              display: idx === currentSlide ? "block" : "none",
                            }}
                          />
                        );
                      })}
                    </Content_img>
                    {boardData.upload_dto.length > 1 &&
                    boardData.upload_dto[0] ? (
                      <>
                        <Content_imgButton onClick={prevSlide}>
                          <ArrowBackIcon />
                        </Content_imgButton>
                        <Content_imgButton onClick={nextSlide}>
                          <ArrowForwardIcon />
                        </Content_imgButton>
                      </>
                    ) : null}
                  </Content_CarouselContainer>
                  <Content_detail disabled={!isFixed}>
                    <div>
                      <textarea
                        ref={textarea}
                        value={content}
                        onChange={(e) => {
                          handleContentChange(e);
                          handleResizeHeight();
                        }}
                        disabled={!isFixed}
                      />
                    </div>
                  </Content_detail>
                </Content_wrapper>
              </Content_container>
              <Info_container>
                <Info_wrapper>
                  <Info_wrapper1>
                    <Date>{setConvertTime(boardData.created_at)}</Date>
                    <View>조회수 {boardData.view_count}</View>
                  </Info_wrapper1>
                  <Info_wrapper2>
                    <Like_wrapper>
                      <LikeButtonBox>
                        <LikeButton clicked={clicked} onClick={handleLikeClick}>
                          <LikeIcon width="20px" height="20px" fill="#2C9C2A" />
                        </LikeButton>
                      </LikeButtonBox>
                      <LikeCount>좋아요 {boardData.like_count}</LikeCount>
                    </Like_wrapper>
                    <Button_wrapper>
                      {isFixed && (
                        <FixButton onClick={handlePatchPost}>
                          <DoneIcon fill="#878484" />
                        </FixButton>
                      )}

                      <FixButton onClick={handleFixClick}>
                        <EditIcon fill="#878484" />
                      </FixButton>
                      <DeleteButton onClick={handleDeleteClick}>
                        <DelIcon fill="#878484" />
                      </DeleteButton>
                    </Button_wrapper>
                  </Info_wrapper2>
                </Info_wrapper>
              </Info_container>
            </Post_wrapper>
            <CommentCnt>
              <span>댓글 {boardData.comments.length}</span>
            </CommentCnt>

            {/* 댓글창 부분 */}
            <Comment_container>
              {/* 댓글입력부분 */}
              <Input_container>
                <Input_wrapper>
                  <User_img_wrapper2>
                    <UserImgBox>
                      {/*//Todo 내 프로필 사진 띄우게 수정해야함 */}
                      {/* {boardData.member.profile_url ? (
                      <img src={boardData.member.profile_url} />
                      ) : ( */}
                      <UserIcon />
                      {/* )} */}
                    </UserImgBox>
                  </User_img_wrapper2>
                  <InputBox>
                    <Comment_Input
                      placeholder={
                        localStorage.token
                          ? "댓글을 남겨주세요"
                          : "로그인이 필요합니다"
                      }
                      type="text"
                      onChange={handleCommentChange}
                      disabled={!localStorage.token}
                    />
                  </InputBox>
                  <ButtonBox>
                    <form onSubmit={handleSubmit}>
                      <Comment_Button disabled={!localStorage.token}>
                        <span>등록</span>
                      </Comment_Button>
                    </form>
                  </ButtonBox>
                </Input_wrapper>
              </Input_container>
              {/* 댓글표시되는 부분 */}
              <Comments_container>
                {boardData.comments.map((el) => {
                  return (
                    <Comments_wrapper key={el.comment_id}>
                      {/* 유저정보표시 */}
                      <User_container>
                        <User_wrapper>
                          <User_img_wrapper>
                            <UserImgBox>
                              {el.member.profile_url ? (
                                <img src={el.member.profile_url} />
                              ) : (
                                <UserIcon />
                              )}
                            </UserImgBox>
                          </User_img_wrapper>
                          <User_name_wrapper style={{ fontSize: "1.125rem" }}>
                            {el.member.name}
                          </User_name_wrapper>
                          <User_level_wrapper>
                            Lv.{el.creator_level}
                          </User_level_wrapper>
                        </User_wrapper>
                        {+localStorage.memberid === +el.member.member_id && (
                          <DeleteButton
                            onClick={() => handleDeleteComment(el.comment_id)}
                          >
                            <DelIcon fill="#878484" />
                          </DeleteButton>
                        )}
                      </User_container>
                      {/* 댓글내용 */}
                      <Comments_contents_wrapper>
                        <Comments_contents>{el.contents}</Comments_contents>
                      </Comments_contents_wrapper>
                    </Comments_wrapper>
                  );
                })}
              </Comments_container>
            </Comment_container>
          </Left_wrapper>

          {/* 추천게시글 부분 */}
          <RightBox>
            <Featured_container>
              <Featured_wrapper>
                <Featured_title>추천게시글</Featured_title>
                <List_wrapper>
                  <List>
                    {feat
                      ? feat.map((el, idx) => {
                          return (
                            <List_el key={idx}>
                              <LikeBox>
                                <List_like>
                                  <List_likeicon>
                                    <LikeIcon
                                      width="18px"
                                      height="18px"
                                      fill="#ffffff"
                                    />
                                  </List_likeicon>
                                  <List_likecnt>{el.like_count}</List_likecnt>
                                </List_like>
                              </LikeBox>

                              <TitleBox>
                                <Featlink
                                  onClick={handleFeatClick}
                                  to={`../${category}/${el.board_id}`}
                                >
                                  <List_title>
                                    {setTitleLength(el.title)}
                                  </List_title>
                                </Featlink>
                              </TitleBox>
                            </List_el>
                          );
                        })
                      : null}
                  </List>
                </List_wrapper>
              </Featured_wrapper>
            </Featured_container>
          </RightBox>
        </Wrapper>
      ) : (
        <p>Loading board data...</p>
      )}
    </Container>
  );
}

export default Post;

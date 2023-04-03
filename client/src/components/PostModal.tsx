import React from "react";
import styled from "styled-components";
import { useRecoilValue, useRecoilState } from "recoil";
import { memberInfoAtom } from "../recoil/state";
import { mydataState } from "../App";
import Add from "../icon/add_circle.svg";
import Cancel from "../icon/cancel.svg";
import user from "../icon/user.svg";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { authInstance, defaultInstance } from "../utils/api";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";

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
  /* align-items: center; */
  /* justify-content: center; */
  background-color: white;
  border-radius: 10px;
  border: 2px solid #609966;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
  width: 600px;
  /* height: 300px; */
  padding: 10px;
  text-align: center;
  max-height: 800px;
  overflow-y: auto;
`;

const CloseButton = styled.img`
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;
const NoButton = styled.div`
  width: 50px;
  height: 50px;
  display: hidden;
`;
const PlusButton = styled.img`
  position: relative;
  margin: 0px 10px 0px 0px;
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const ModalTitle = styled.h2`
  color: #595959;
  padding: 10px 0px 0px 0px;
  font-size: 20px;
  font-weight: 600;
  margin-top: 0;
`;

const ModalInput = styled.input`
  width: 100%;

  margin: 10px 0px 10px 0px;
  border-radius: 5px;
  font-size: 18px;
  /* font-weight: bold; */
  border: 1px;
  /* vertical-align: top; */
  /* text-align: left; */
  resize: none;
  outline: none;
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  margin: 10px 0px 10px 0px;
  border-radius: 5px;
  font-size: 18px;
  /* font-weight: bold; */
  border: 1px;
  /* vertical-align: top; */
  /* text-align: left; */
  resize: none;
  outline: none;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  border-radius: 5px;
  background-color: #609966;
  width: 100%;
  color: white;
  cursor: pointer;
`;
const SubmitContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 50px;
  width: 100%;
  margin: 10px 0px 0px 0px;
`;
const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  width: 100%;
`;
const Postuser = styled.div`
  display: flex;
  padding: 10px 0px 0px 0px;
  /* justify-content: flex-start; */
  flex-direction: row;
  border-top: 1px solid #b5b5b5;
`;
const UserImgBox = styled.div`
  width: 48px;
  height: 48px;
  margin: 0 20px 5px 0;
  img {
    border-radius: 50%;
  }
`;
const Usericon = styled.img`
  margin: 2px 17px 2px 2px;
  width: 50px;
  height: 50px;
`;
const UserInfo = styled.div`
  flex-direction: row;
`;
const UserText = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const Testinput = styled.input`
  display: none;
`;

interface modal {
  onClose: any;
  onConfirm: any;
}
function PostModal({ onClose, onConfirm }: modal) {
  const [mydata, setMyData] = useRecoilState(mydataState);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [imageFile, setImageFile] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [currentTime, setCurrentTime] = useState<string>("");
  const location = useLocation();
  const currentUrl: string = location.pathname;
  const memberinfo = useRecoilValue(memberInfoAtom);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files) {
      const fileList: File[] = Array.from(files);
      console.log(fileList);
      setImageFile(fileList);
      const reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      return new Promise<void>((resolve) => {
        reader.onload = () => {
          setImageSrc(reader.result as string | undefined);
          resolve();
        };
      });
    }
  };
  const token = localStorage.getItem("token") || "";
  const ref = localStorage.getItem("ref") || "";
  const id = localStorage.getItem("memberid") || "";
  const name = localStorage.getItem("name") || "";
  const level = localStorage.getItem("level") || "";

  const formData = new FormData();
  formData.append("memberId", id);
  formData.append("title", title);
  formData.append("contents", contents);
  // formData.append('files', imageFile); 단일 이미지 넣을때
  for (let i = 0; i < imageFile.length; i++) {
    formData.append("files", imageFile[i]);
  }

  const submit = () => {
    // 게시글 등록
    let url: string;

    if (currentUrl === "/community") {
      url = `/boards/free`;
    } else if (currentUrl === "/greenact") {
      url = `/boards/green`;
    } else if (currentUrl === "/review") {
      url = `/boards/eco`;
    } else {
      url = `/boards/eco`;
    }
    authInstance
      .post(url, formData)
      .then((response) => {
        const { data } = response;
        console.log(data);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };
  const handleSubmit = () => {
    onConfirm();
    submit();
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(
        dayjs().locale("ko").format("YYYY년 M월 D일 ddd HH:mm:ss"),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <ModalWrapper>
        <ModalContent>
          <TitleContainer>
            <NoButton />
            <ModalTitle>탄소 배출 줄이는 법 알리기</ModalTitle>
            <CloseButton src={Cancel} onClick={onClose} />
          </TitleContainer>
          <Postuser>
            <UserImgBox>
              {memberinfo &&
                (memberinfo.profile_url ? (
                  <Usericon src={mydata.profile_url} alt="user" />
                ) : (
                  <Usericon src={user} alt="user" />
                ))}
            </UserImgBox>
            <UserInfo>
              {memberinfo && (
                <UserText style={{ padding: "5px 0px 0px 0px" }}>
                  <b>{memberinfo.name}</b>&nbsp;Lv.{mydata.level_dto.level}
                </UserText>
              )}
              <UserText>{currentTime}</UserText>
            </UserInfo>
          </Postuser>
          <ModalInput
            placeholder="제목을 입력하세요"
            onChange={(e) => setTitle(e.target.value)}
          />
          <ModalTextarea
            placeholder="오늘 실천하신 회원님의 노력을 알려주세요!"
            onChange={(e) => setContents(e.target.value)}
          />
          <img width={"100%"} src={imageSrc} />
          <SubmitContainer>
            <label htmlFor="fileUpload">
              <PlusButton src={Add} />
            </label>
            <Testinput
              type="file"
              multiple={true}
              id="fileUpload"
              onChange={(e) => onUpload(e)}
            />
            <ModalButton onClick={handleSubmit}>알려주기</ModalButton>
          </SubmitContainer>
        </ModalContent>
      </ModalWrapper>
    </>
  );
}
export default PostModal;

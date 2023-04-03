import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useEcoPosts } from "../react-query/useEcoPosts";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { areaState, memberInfoAtom } from "../recoil/state";
import { mydataState } from "../App";
import apiFetch from "../utils/useFetch";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PostModal from "../components/PostModal";
import LoginModal from "../components/LoginModal";
import user from "../icon/user.svg";
import search from "../icon/search.svg";
import saving from "../icon/savings.svg";
import nature from "../icon/nature.svg";
import more from "../icon/expand_more.svg";
import less from "../icon/expand_less.svg";
import InfoModal from "../components/InfoModal";
import ScrollToTop from "../components/ScrollToTop";
dayjs.extend(relativeTime);
dayjs.locale("ko");

export interface Item {
  id: number;
  label: string;
  value: string;
}

interface postList {
  board_creator: string;
  creator_level: number;
  delegate_image_path: string;
  title: string;
  contents: string;
  board_id: number;
  created_at: string;
  member: {
    profile_url: string;
  };
}

const MainContainer = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  /* flex-direction: row; */
  padding: 0px 10px 10px 10px;
  @media screen and (max-width: 819px) {
    flex-direction: column-reverse;
    padding: 0;
    width: 100%;
  }
`;
const SectionContainer = styled.div`
  flex-direction: column;
  margin: 0px 60px 0px 0px;
  width: 630px;
  @media screen and (max-width: 819px) {
    width: 80%;
    margin: 0 auto;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    margin: 0 auto;
  }
`;
const AsideContainer = styled.div`
  flex-direction: column;
  margin: 20px 0px 20px 0px;
  width: 387px;
  @media screen and (max-width: 1000px) {
    width: 80%;
    /* margin: 20px 0px 0px 0px; */
    margin: 0 auto;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;
const SidebarContainer = styled.div`
  position: fixed;
  @media screen and (max-width: 1000px) {
    position: sticky;
    width: 100%;
  }
`;
const Aside = styled.div`
  width: 300px;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
`;
const Posting = styled.div`
  display: flex;
  align-items: center;
  background-color: rgb(246, 246, 246);
  border-radius: 15px;
  padding: 15px;
  margin: 20px 0px 20px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;
const Usericon = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;
const PostButton = styled.button`
  background-color: #ebebeb;
  border-radius: 15px;
  font-size: 15px;
  color: #939393;
  border: 0px;
  width: 530px;
  height: 55px;
  padding: 0px 0px 0px 20px;
  text-align: start;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #bdbdbd;
    color: #ebebeb;
  }
`;
const PostSection = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: rgb(246, 246, 246);
  border-radius: 15px;
  padding: 15px;
  /* width: 600px; */
  margin: 0px 0px 20px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  text-decoration-line: none;
  color: black;
`;
const Postuser = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;
const UserImgBox = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  margin-right: 10px;
  img {
    border-radius: 50%;
  }
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const UserName = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 0px 5px 0px;
  font-size: 17px;
  font-weight: 600;
`;
const UserLevel = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 12px;
  font-weight: 300;
`;
const PostTime = styled.div`
  font-size: 12px;
`;
const PostBody = styled.div`
  padding: 10px 0px 10px 0px;
  /* font-weight: bolder; */
  font-size: 20px;
`;
const SearchBar = styled.div`
  display: flex;
  position: relative;
  font-weight: bold;
  font-size: 16px;
  background-color: rgb(246, 246, 246);
  border-radius: 15px;
  padding: 15px;
  /* width: 300px; */
  margin: 0px 0px 20px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  @media screen and (max-width: 1000px) {
    font-size: 10px;
  }
  @media screen and (max-width: 640px) {
    font-size: 18px;
  }
`;
const SearchOption = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebebeb;
  border-radius: 15px;
  padding: 0px 0px 0px 10px;
  width: 120px;
  /* height: 0px; */
  margin: 0px 10px 0px 0px;
  cursor: pointer;
  @media screen and (max-width: 1000px) {
    padding: 0px 0px 0px 10px;
  }
`;
const SearchInput = styled.input`
  background-color: #ebebeb;
  border-width: 0px;
  border-radius: 15px;
  padding: 5px 10px 5px 10px;
  width: 100%;
`;
const SearchButton = styled.img`
  position: relative;
  top: 1px;
  right: 0px;
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const DustBar = styled.div`
  display: flex;
  position: relative;
  /* top: 130px; */
  /* top: 150px; */
  background-color: rgb(246, 246, 246);
  border-radius: 15px;
  padding: 15px;
  /* width: 300px; */
  height: 300px;
  margin: 0px 0px 20px 0px;
  flex-direction: column;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 0;
  @media screen and (max-width: 1000px) {
    display: none;
  }
`;
const MileageBar = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  /* top: 480px; */
  background-color: rgb(246, 246, 246);
  border-radius: 15px;
  padding: 20px 15px 15px 15px;
  /* width: 300px; */
  /* height: 200px; */
  margin: 0px 0px 20px 0px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
`;
const MileageInfo = styled.div`
  display: flex;
  /* flex-direction: row; */
  padding: 0px 0px 15px 0px;
  width: 100%;
  /* height: 50px; */
  /* margin: 0px 0px 20px 0px; */
  justify-content: space-between;
`;
const MileageTitle = styled.div`
  font-size: 20px;
  margin: 0px 0px 0px 0px;
  font-weight: bold;
  @media screen and (max-width: 1000px) {
    display: flex;
    font-size: 10px;
    align-items: center;
    /* margin: 0px 10px 0px 10px; */
  }
  @media screen and (max-width: 640px) {
    display: flex;
    font-size: 20px;
    align-items: center;
    /* margin: 0px 10px 0px 10px; */
  }
`;
const MileageNum = styled.div`
  @media screen and (max-width: 1000px) {
    display: flex;
    font-size: 10px;
    align-items: center;
    margin: 0px 10px 0px 10px;
  }
  @media screen and (max-width: 640px) {
    font-size: 20px;
  }
`;
const MileageIcon = styled.img`
  /* padding: 15px; */
  width: 30px;
  height: 30px;
  align-items: center;
  @media screen and (max-width: 1000px) {
    width: 20px;
    height: 20px;
  }
  @media screen and (max-width: 640px) {
    width: 30px;
    height: 30px;
  }
`;
const MileageButton = styled.button`
  display: flex;
  width: 100%;
  height: 100px;
  border-radius: 15px;
  border-width: 0px;
  padding: 0px 20px 0px 0px;
  background-color: #609966;
  color: #ffffff;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #4f8255;
  }
  &:active {
    border: 5px solid #66a16d;
  }
  @media screen and (max-width: 1000px) {
    font-size: 10px;
  }
  @media screen and (max-width: 640px) {
    font-size: 13px;
  }
`;
const TreeIcon = styled.img`
  width: 30px;
  height: 30px;
`;
const DustTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin: 0px 0px 0px 10px;
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }
  @media screen and (max-width: 640px) {
    font-size: 16px;
  }
`;
const DustGraph = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media screen and (max-width: 1000px) {
    font-size: 12px;
  }
  @media screen and (max-width: 640px) {
    font-size: 16px;
  }
`;
const Line = styled.div`
  padding: 0px 0px 20px 0px;
`;
const Row = styled.div`
  /* padding: 0px 30px 0px 0px; */
`;
const Row4 = styled.div<{
  pm25: number;
  pm10: number;
  o3: number;
  no2: number;
  co: number;
  so2: number;
}>`
  /* padding: 0px 30px 0px 0px; */
  .a {
    color: ${(props) =>
      props.pm25 < 50
        ? "blue"
        : props.pm25 < 100
        ? "green"
        : props.pm25 < 150
        ? "orange"
        : "red"};
  }
  .b {
    color: ${(props) =>
      props.pm10 < 30
        ? "blue"
        : props.pm10 < 80
        ? "green"
        : props.pm10 < 150
        ? "orange"
        : "red"};
  }
  .c {
    color: ${(props) =>
      props.o3 < 50
        ? "blue"
        : props.o3 < 100
        ? "green"
        : props.o3 < 150
        ? "orange"
        : "red"};
  }
  .d {
    color: ${(props) =>
      props.no2 < 50
        ? "blue"
        : props.no2 < 100
        ? "green"
        : props.no2 < 150
        ? "orange"
        : "red"};
  }
  .e {
    color: ${(props) =>
      props.co < 50
        ? "blue"
        : props.co < 100
        ? "green"
        : props.co < 150
        ? "orange"
        : "red"};
  }
  .f {
    color: ${(props) =>
      props.so2 < 50
        ? "blue"
        : props.so2 < 100
        ? "green"
        : props.so2 < 150
        ? "orange"
        : "red"};
  }
`;
const DustDropdown = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  /* position: relative;
  display: inline-block; */
  margin: 0px 0px 20px 0px;
`;
const DropdownHeader = styled.div`
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;
  background-color: #ebebeb;
  border-radius: 15px;
  padding: 0px 0px 0px 10px;
  width: 80px;
  height: 30px;
  /* margin: 0px 10px 0px 0px; */
  cursor: pointer;
  /* padding: 8px 16px; */
`;
const DropdownMenu = styled.ul`
  list-style-type: none;
  font-size: 15px;
  margin: 0;
  padding: 0;
  background-color: #ebebeb;
  border-radius: 0px 0px 15px 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 45px;
  z-index: 1;
  width: 90px;
  max-height: 150px;
  overflow-y: auto;
  li {
    padding: 8px 16px;
    cursor: pointer;
  }
`;
const SearchdownMenu = styled.ul`
  list-style-type: none;
  font-size: 15px;
  margin: 0;
  padding: 0;
  background-color: #ebebeb;
  border-radius: 0px 0px 15px 15px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 45px;
  z-index: 3;
  width: 80px;
  max-height: 150px;
  li {
    position: relative;
    padding: 8px 16px;
    cursor: pointer;
    z-index: 3;
  }
`;
const ExpandButton = styled.img`
  width: 30px;
  height: 30px;
  @media screen and (max-width: 1000px) {
    width: 20px;
    height: 20px;
  }
  @media screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;
const DustExpandButton = styled.img`
  width: 30px;
  height: 30px;
  @media screen and (max-width: 1000px) {
    width: 20px;
    height: 20px;
  }
  @media screen and (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;
const toastmove = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  10% {
    transform: translateY(-20%);
    opacity: 0.8;
  }
  20% {
    transform: translateY(10%);
    opacity: 0.8;
  }
  30% {
    transform: translateY(-10%);
    opacity: 0.8;
  }
  40% {
    transform: translateY(0%);
    opacity: 0.8;
  }
  100% {
    transform: translateY(0%);
    opacity: 0.8;
  }
  /* 100% {
    transform: translateY(200%);
    opacity: 1;
  } */
`;
const Toast = styled.div`
  position: fixed;
  top: 50px;
  width: 400px;
  text-align: center;
  margin: 0 auto;
  background-color: #609966;
  color: #fff;
  border-radius: 5px;
  padding: 20px 10px 20px 10px;
  opacity: 0.8;
  animation: ${toastmove} 1s linear;
`;
const InfoButton = styled.button`
  position: fixed;
  bottom: 88px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #609966;
  color: #fff;
  border: none;
  padding: 0px;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4f8255;
  }
`;

function Review() {
  // const [itemvalue, setItemvalue] = useRecoilState(areaState); // 지역 상태 (서울, 부산 등)
  const [mydata, setMyData] = useRecoilState(mydataState);
  const [memberinfo, setMemberInfo] = useRecoilState(memberInfoAtom); // 멤버 정보(Post 모달에서 활용)
  // const { data, loading, error } = apiFetch(
  //   `https://api.waqi.info/v2/feed/${itemvalue}/?token=a85f9e4ea2f2e1efa4cecb4806a6909e520368df`,
  //   // `https://cors-anywhere.herokuapp.com/https://api.waqi.info/v2/feed/${itemvalue}/?token=apikey`,
  // );
  // const { data: dusts, isLoading: dustLoading, error } = useWeatherInfo();
  const { data: posts, isLoading, isError } = useEcoPosts();

  // const [pm25, setPm25] = useState(0);
  // const [pm10, setPm10] = useState(0);
  // const [o3, setO3] = useState(0);
  // const [no2, setNo2] = useState(0);
  // const [co, setCo] = useState(0);
  // const [so2, setSo2] = useState(0);
  // const [isOpen, setIsOpen] = useState(false); // 지역 드롭다운 open
  // const [selectedItem, setSelectedItem] = useState<Item | null>(null); // 지역 드롭다운 현재값 (label)
  // const [pm25info, setPm25info] = useState("");
  // const [pm10info, setPm10info] = useState("");
  // const [o3info, setO3info] = useState("");
  // const [no2info, setNo2info] = useState("");
  // const [coinfo, setCoinfo] = useState("");
  // const [so2info, setSo2info] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색 드롭다운 open
  const [isSearchbox, setIsSearchbox] = useState<Item | null>(null); // 검색 드롭다운 현재값 (label)
  const [searchValue, setSearchValue] = useState(""); // 검색 input 값
  const [elvalue, setElvalue] = useState("TITLE"); // 검색타입 상태 (제목, 내용)
  const [showModal, setShowModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [searchpost, setSearchPost] = useState<postList[] | undefined>([]);
  const [searchboolean, setSearchBoolean] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [pointlack, setPointlack] = useState(false);
  const [milageState, setMilageState] = useState(localStorage.point);
  const [infoToggle, setInfoToggle] = useState(false);

  // const handleItemClick = (item: Item) => {
  //   setSelectedItem(item);
  //   setIsOpen(false); // 드롭다운 텍스트 클릭하면 드롭다운 닫기
  //   setItemvalue(item.value);
  //   // console.log(selectedItem)
  // };
  const searchbarClick = (el: Item) => {
    setIsSearchbox(el);
    setIsSearchOpen(false); // 드롭다운 텍스트 클릭하면 드롭다운 닫기
    setElvalue(el.value);
    // console.log(isSearchbox)
  };
  // const AQIhandle = () => {
  //   pm25 < 50
  //     ? setPm25info("좋음")
  //     : pm25 < 100
  //     ? setPm25info("보통")
  //     : pm25 < 150
  //     ? setPm25info("나쁨")
  //     : setPm25info("매우나쁨");
  //   pm10 < 30
  //     ? setPm10info("좋음")
  //     : pm10 < 80
  //     ? setPm10info("보통")
  //     : pm10 < 150
  //     ? setPm10info("나쁨")
  //     : setPm10info("매우나쁨");
  //   o3 < 50
  //     ? setO3info("좋음")
  //     : o3 < 100
  //     ? setO3info("보통")
  //     : o3 < 100
  //     ? setO3info("나쁨")
  //     : setO3info("매우나쁨");
  //   no2 < 50
  //     ? setNo2info("좋음")
  //     : no2 < 100
  //     ? setNo2info("보통")
  //     : no2 < 100
  //     ? setNo2info("나쁨")
  //     : setNo2info("매우나쁨");
  //   co < 50
  //     ? setCoinfo("좋음")
  //     : co < 100
  //     ? setCoinfo("보통")
  //     : co < 100
  //     ? setCoinfo("나쁨")
  //     : setCoinfo("매우나쁨");
  //   so2 < 50
  //     ? setSo2info("좋음")
  //     : so2 < 100
  //     ? setSo2info("보통")
  //     : so2 < 100
  //     ? setSo2info("나쁨")
  //     : setSo2info("매우나쁨");
  // };

  // const items: Item[] = [
  //   { id: 1, label: "서울", value: "seoul" },
  //   { id: 2, label: "대구", value: "daegu" },
  //   { id: 3, label: "성남", value: "Seongnam" },
  //   { id: 4, label: "수원", value: "Suwon" },
  //   { id: 5, label: "시흥", value: "siheung" },
  //   { id: 6, label: "고양", value: "Goyang" },
  //   { id: 7, label: "부천", value: "bucheon" },
  //   { id: 8, label: "인천", value: "Incheon" },
  //   { id: 9, label: "부산", value: "busan" },
  // ];
  const searchbox: Item[] = [
    { id: 1, label: "제목", value: "TITLE" },
    { id: 2, label: "내용", value: "CONTENTS" },
  ];

  const token = localStorage.getItem("token") || "";
  const ref = localStorage.getItem("ref") || "";
  const memberid = localStorage.getItem("memberid") || "";
  const point: any = localStorage.getItem("point") || "";

  const postsearch = () => {
    // 게시글 검색
    axios
      .get(
        `http://3.39.150.26:8080/boards/eco?searchType=${elvalue}&searchValue=${searchValue}&page=&size=`,
      )
      .then((response) => {
        const { data } = response;
        setSearchPost(data);
        setSearchBoolean(true);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  const mileagedone = () => {
    // 마일리지로 나무심기
    axios
      .post(`http://3.39.150.26:8080/members/donation/${memberid}`, {
        headers: { Authorization: token, Refresh: ref },
      })
      .catch((error) => console.log(error));
  };
  const membersearch = () => {
    axios
      .get(`http://3.39.150.26:8080/members/${memberid}`, {
        headers: { Authorization: token, Refresh: ref },
      })
      .then((response) => {
        const { data } = response;
        localStorage.setItem("point", data.point);
        setMilageState(localStorage.point);
      })
      .catch(() => console.log("로그인 해라"));
  };

  const formData = new FormData();
  formData.append("memberId", "3");
  formData.append("title", "테스트");
  formData.append("contents", "내용 테스트");
  formData.append("file", "");

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    alert("게시물이 등록되었습니다!");
    handleClose();
  };

  function mileagebuttonhandle() {
    if (token === "") {
      setLoginModal(true);
    } else {
      if (point < 300) {
        setPointlack(!pointlack);
      } else {
        mileagedone();
        membersearch();
        setShowToast(true);
      }
    }
  }

  function activeEnter(e: any) {
    if (e.key === "Enter") {
      postsearch();
    }
  }

  function loginhandle() {
    if (token === "") {
      setLoginModal(true);
    } else {
      setShowModal(true);
    }
  }

  function infoOpenhandle() {
    setInfoToggle(!infoToggle);
  }

  // 시간 변환 관리
  function setConvertTime(time: string) {
    const formattedDate = dayjs(time).add(9, "h").tz("Asia/Seoul").fromNow();
    return formattedDate;
  }
  // useEffect(() => {
  //   setPm25(data?.rxs.obs[0].msg.iaqi.pm25.v);
  //   setPm10(data?.rxs.obs[0].msg.iaqi.pm10.v);
  //   setO3(data?.rxs.obs[0].msg.iaqi.o3.v);
  //   setNo2(data?.rxs.obs[0].msg.iaqi.no2.v);
  //   setCo(data?.rxs.obs[0].msg.iaqi.co.v);
  //   setSo2(data?.rxs.obs[0].msg.iaqi.so2.v);
  // }, []);

  // useEffect(() => {
  //   AQIhandle();
  //   //Optional Chaining
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
      setPointlack(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [showToast, pointlack]);

  useEffect(() => {
    const id = localStorage.memberid;
    const url = `http://3.39.150.26:8080/members/${id}`;

    const fetchData = async () => {
      try {
        const myData = await axios.get(url);
        setMemberInfo(myData.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {isLoading && "Error!"}
      {isError && "Loading..."}
      <MainContainer>
        <SectionContainer>
          <Posting>
            <UserImgBox>
              {token && mydata && mydata.profile_url ? (
                <Usericon src={mydata.profile_url} alt="user" />
              ) : (
                <Usericon src={user} alt="user" />
              )}
            </UserImgBox>
            <PostButton onClick={() => loginhandle()}>
              오늘 사용하신 친환경 물품은 무엇인가요?
            </PostButton>
            {loginModal && <LoginModal />}
            {showModal && (
              <PostModal
                onClose={handleClose}
                onConfirm={handleConfirm}
                // onSubmit={submit}
              />
            )}
          </Posting>
          {searchboolean
            ? searchpost?.map((el, index) => {
                return (
                  <PostSection to={`/review/${el.board_id}`} key={index}>
                    <Postuser>
                      <UserImgBox>
                        {el.member &&
                          (el.member.profile_url ? (
                            <Usericon src={el.member.profile_url} alt="user" />
                          ) : (
                            <Usericon src={user} alt="user" />
                          ))}
                      </UserImgBox>
                      <UserInfo>
                        <UserName>
                          {el.board_creator}&nbsp;
                          <UserLevel>Lv. {el.creator_level}</UserLevel>
                        </UserName>
                        <PostTime>{setConvertTime(el.created_at)}</PostTime>
                      </UserInfo>
                    </Postuser>
                    <PostBody>{el.title}</PostBody>
                    {el.delegate_image_path && (
                      <img src={el.delegate_image_path} alt="picture" />
                    )}
                  </PostSection>
                );
              })
            : posts?.map((el, index) => {
                return (
                  <PostSection to={`/review/${el.board_id}`} key={index}>
                    <Postuser>
                      <UserImgBox>
                        {el.member &&
                          (el.member.profile_url ? (
                            <Usericon src={el.member.profile_url} alt="user" />
                          ) : (
                            <Usericon src={user} alt="user" />
                          ))}
                      </UserImgBox>
                      <UserInfo>
                        <UserName>
                          {el.board_creator}&nbsp;
                          <UserLevel>Lv. {el.creator_level}</UserLevel>
                        </UserName>
                        <PostTime>{setConvertTime(el.created_at)}</PostTime>
                      </UserInfo>
                    </Postuser>
                    <PostBody>{el.title}</PostBody>
                    {el.delegate_image_path && (
                      <img src={el.delegate_image_path} alt="picture" />
                    )}
                  </PostSection>
                );
              })}
        </SectionContainer>
        <AsideContainer>
          <SidebarContainer>
            <SearchBar>
              <SearchOption onClick={() => setIsSearchOpen(!isSearchOpen)}>
                {isSearchbox ? isSearchbox.label : "제목"}
                {isSearchOpen === false ? (
                  <ExpandButton src={more} />
                ) : (
                  <ExpandButton src={less} />
                )}
              </SearchOption>
              {isSearchOpen && (
                <SearchdownMenu>
                  {searchbox.map(({ id, label, value }) => (
                    <li
                      key={id}
                      onClick={() => searchbarClick({ id, label, value })}
                    >
                      {label}
                    </li>
                  ))}
                </SearchdownMenu>
              )}

              <SearchInput
                placeholder="검색"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => activeEnter(e)}
              />
              <SearchButton src={search} onClick={() => postsearch()} />
            </SearchBar>
            {/* {data && (
              <DustBar>
                <DustDropdown>
                  <DropdownHeader onClick={() => setIsOpen(!isOpen)}>
                    {selectedItem ? selectedItem.label : "서울"}
                    {isOpen === false ? (
                      <DustExpandButton src={more} />
                    ) : (
                      <DustExpandButton src={less} />
                    )}
                  </DropdownHeader>
                  {isOpen && (
                    <DropdownMenu>
                      {items.map(({ id, label, value }) => (
                        <li
                          key={id}
                          onClick={() => handleItemClick({ id, label, value })}
                        >
                          {label}
                        </li>
                      ))}
                    </DropdownMenu>
                  )}
                  <DustTitle>의 대기질 정보(AQI)</DustTitle>
                </DustDropdown>
                <DustGraph>
                  <Row style={{ fontWeight: "bold" }}>
                    <Line>초미세먼지</Line>
                    <Line>미세먼지</Line>
                    <Line>오존</Line>
                    <Line>이산화질소</Line>
                    <Line>일산화탄소</Line>
                    <Line>아황산가스</Line>
                  </Row>
                  <Row style={{ color: "gray" }}>
                    <Line>PM-2.5</Line>
                    <Line>PM-10</Line>
                    <Line>O₃</Line>
                    <Line>NO₂</Line>
                    <Line>CO</Line>
                    <Line>SO₂</Line>
                  </Row>
                  <Row>
                    <Line>{pm25}㎍/㎥</Line>
                    <Line>{pm10}㎍/㎥</Line>
                    <Line>{o3}ppm</Line>
                    <Line>{no2}ppm</Line>
                    <Line>{co}ppm</Line>
                    <Line>{so2}ppm</Line>
                  </Row>
                  <Row4
                    pm25={pm25}
                    pm10={pm10}
                    o3={o3}
                    no2={no2}
                    co={co}
                    so2={so2}
                  >
                    <Line className="a">{pm25info}</Line>
                    <Line className="b">{pm10info}</Line>
                    <Line className="c">{o3info}</Line>
                    <Line className="d">{no2info}</Line>
                    <Line className="e">{coinfo}</Line>
                    <Line className="f">{so2info}</Line>
                  </Row4>
                </DustGraph>
              </DustBar>
            )} */}
            <MileageBar>
              <MileageInfo>
                <MileageIcon src={saving} />
                <MileageTitle>나의 마일리지</MileageTitle>
                <MileageNum>{token ? milageState : 0}P</MileageNum>
              </MileageInfo>
              <MileageButton onClick={mileagebuttonhandle}>
                <TreeIcon src={nature} />내 마일리지로 나무 심기!
              </MileageButton>
            </MileageBar>
          </SidebarContainer>
          <Aside />
        </AsideContainer>
        {showToast && (
          <Toast>회원님의 마일리지로 나무를 1그루 심었습니다.</Toast>
        )}
        {pointlack && <Toast>마일리지가 부족합니다.</Toast>}
      </MainContainer>
      <InfoButton onClick={infoOpenhandle}>P</InfoButton>
      {infoToggle && <InfoModal onClose={infoOpenhandle} />}
      <ScrollToTop />
    </>
  );
}

export default Review;

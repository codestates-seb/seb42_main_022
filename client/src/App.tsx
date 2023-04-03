import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Community from "./pages/Community";
import Review from "./pages/Review";
import GreenAct from "./pages/GreenAct";
import News from "./pages/News";
import GreenCal from "./pages/GreenCal";
import Ranking from "./pages/Ranking";
import { RecoilRoot, useRecoilValue, useRecoilState, atom } from "recoil";
import Post from "./pages/Post";
import MyPage from "./pages/MyPage";
import Edit from "./pages/Edit";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { Reset } from "styled-reset";
import Header from "./components/Header";
import axios from "axios";
import GreenCalResult from "./pages/GreenCalResult";
import Protected from "./components/privateRoute";
import { sessionState } from "./recoil/state";
import useCheckAuth from "./utils/useCheckAuth";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const mydataState = atom({
  key: "memberdata",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

function App() {
  // const { authenticated } = useRecoilValue(sessionState);
  const [data, setData] = useRecoilState(mydataState);
  const token = localStorage.token;
  useCheckAuth();
  return (
    <Fragment>
      <Reset />
      <RecoilRoot>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/community" element={<Community />} />
          <Route path="/review" element={<Review />} />
          <Route path="/greenact" element={<GreenAct />} />
          <Route path="/news" element={<News />} />
          <Route path="/greencal" element={<GreenCal />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/:category/:id" element={<Post />} />
          <Route
            path="/mypage"
            element={<Protected auth={token}>{<MyPage />}</Protected>}
          />
          <Route
            path="/mypageedit"
            element={<Protected auth={token}>{<Edit />}</Protected>}
          />
          <Route
            path="/signup"
            element={<Protected auth={!token}>{<SignUp />}</Protected>}
          />
          <Route
            path="/signin"
            element={<Protected auth={!token}>{<SignIn />}</Protected>}
          />
          <Route path="/greencalresult" element={<GreenCalResult />} />
        </Routes>
      </RecoilRoot>
    </Fragment>
  );
}

export default App;

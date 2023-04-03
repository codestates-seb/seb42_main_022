import axios from "axios";
import { useEffect, useRef } from "react";
import { useBeforeUnload, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sessionState } from "../recoil/state";

function useCheckAuth() {
  /**
   * react-router-dom에서 제공하는 Link엘리먼트는 a태그와는 다르게
   * 페이지 새로고침을 트리거하지 않기때문에 useLocation을 통해 url변경을 감지
   */
  const location = useLocation();
  const refresh = localStorage.refresh;
  /**
   * refreshToken만 localStorage에 저장하고 accessToken토큰은 전역변수에 저장하려고 구현하였으나
   * useRecoilState의 setter를 이용하여 값 변경시에 변경된 값이 바로 반영이 안되는 경우가 있음
   * 유저 로그인 여부만 전역 상태관리를 이용하고 accessToken은 localStorage에 저장하여 관리
   */
  const [session, setSession] = useRecoilState(sessionState);
  const offset = new Date().getTimezoneOffset() * 60000;
  const today = new Date(Date.now() - offset);
  const expire = new Date(Date.now() - offset + 60000 * 30);

  const localtime = localStorage.expiretime;

  const getAccessToken = () => {
    axios
      .get("http://3.39.150.26:8080/auth/reissue", {
        headers: { Refresh: refresh },
      })
      .then((res) => {
        const token = res.headers.authorization;
        setSession({ authenticated: true, token });
        axios.defaults.headers.common["Authorization"] = token;

        //! 서버에서 리프레쉬 토큰으로 액세스토큰 재 요청시 새로운 리프레쉬 토큰을 발급해줘서 같이 저장한다.
        const refresh = res.headers.refresh;
        localStorage.setItem("token", token);
        localStorage.setItem("expiretime", expire.toISOString());
        localStorage.setItem("refresh", refresh);
        // console.log("세션있음", session);
      })
      .catch((error) => {
        console.log(error);
        // setSession({ ...session, authenticated: true });
      });
  };

  const sessionExpire = () => {
    axios
      .post("http://3.39.150.26:8080/members/logout")
      .then((res) => console.log(res));
    setSession({ authenticated: false, token: null });
    delete axios.defaults.headers.common["Authorization"];
    localStorage.clear();
    navigate("/");
  };

  const renew = useBeforeUnload((e) => e.preventDefault);
  const navigate = useNavigate();
  const timerRef = useRef<any>(null);
  const clearSession = () => {
    console.log("10분뒤 세션이 만료됩니다.");
    timerRef.current = setTimeout(() => {
      sessionExpire();
      alert("세션이 만료되었습니다");
    }, 60000 * 10);
  };
  if (today.toISOString() > localtime) {
    sessionExpire();
  }

  useEffect(() => {
    refresh && getAccessToken();
    refresh && clearSession();
    return () => clearTimeout(timerRef.current);
  }, [location, renew]);
}

export default useCheckAuth;

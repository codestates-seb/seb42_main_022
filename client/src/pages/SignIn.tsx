import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoImg } from "../icon/main_logo.svg";
import { Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { useSetRecoilState } from "recoil";
import { sessionState } from "../recoil/state";

const InputContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100vh;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100vh;
  background: linear-gradient(#52797a, #365b68);
`;
const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  /* border: 1px solid black; */
`;
const FormContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid black; */
`;
const FormWrapper = styled.div`
  margin-top: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 40%;
`;
const RadiusInput = styled.input`
  border-radius: 15px;
  margin-top: 5px;
  padding: 6px;
  border: 1.5px solid black;
`;
const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
  padding: 2px;
  margin-top: 2px;
`;
const SignUpBtn = styled.button`
  margin-top: 3vh;
  color: white;
  font-size: 16px;
  background: #609966;
  border-radius: 15px;
  padding: 8px;
  border: none;
  cursor: pointer;
`;
const LogoLink = styled(Link)`
  display: flex;
`;
const SignUpLink = styled(Link)``;

interface LoginModel {
  email: string;
  password: string;
}

const signInSchema = object({
  email: string().required("이메일을 입력해주세요"),
  password: string().required("비밀번호를 입력해주세요"),
});

const offset = new Date().getTimezoneOffset() * 60000;
const today = new Date(Date.now() - offset + 60000 * 30);
const SignIn = () => {
  const navigate = useNavigate();
  const setSession = useSetRecoilState(sessionState);
  return (
    <InputContainer>
      <LeftContainer>
        <LogoContainer>
          <LogoLink to="../">
            <LogoImg width="60px" height="60px" />
          </LogoLink>
        </LogoContainer>
        <FormContainer>
          <FormWrapper>
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "700",
                marginBottom: "20px",
              }}
            >
              로그인
            </h1>
            <Formik<LoginModel>
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={signInSchema}
              onSubmit={(values) => {
                axios
                  .post("http://3.39.150.26:8080/members/login", values)
                  .then((res) => {
                    const token = res.headers.authorization;
                    const ref = res.headers.refresh;
                    console.log(token);
                    localStorage.setItem("token", token);
                    localStorage.setItem("expiretime", today.toISOString());
                    setSession({ authenticated: true, token: token });
                    axios.defaults.headers.common["Authorization"] = token;
                    localStorage.setItem("refresh", ref);
                    localStorage.setItem("memberid", res.data.memberId);
                    localStorage.setItem("name", res.data.name);
                    localStorage.setItem("level", res.data.level);
                    localStorage.setItem("point", res.data.point);
                    window.location.reload();
                    navigate("../");
                  })
                  .catch((error) => {
                    alert("로그인 실패");
                    console.log("로그인", error);
                  });
              }}
            >
              {({ handleSubmit, values, handleChange, errors, touched }) => (
                <form
                  style={{
                    width: "50%",
                    height: "70%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: "12px",
                  }}
                  onSubmit={handleSubmit}
                >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px" }} htmlFor="email">
                      이메일
                    </label>
                    <RadiusInput
                      type="email"
                      id="email"
                      placeholder="이메일을 입력해주세요."
                      value={values.email}
                      onChange={handleChange}
                    />
                    {touched.email && errors.email ? (
                      <ErrorMsg
                        style={{
                          color: "red",
                          fontSize: "12px",
                          padding: "2px",
                        }}
                      >
                        {errors.email}
                      </ErrorMsg>
                    ) : null}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: "15px" }} htmlFor="password">
                      비밀번호
                    </label>
                    <RadiusInput
                      type="password"
                      id="password"
                      placeholder="비밀번호를 입력해주세요."
                      value={values.password}
                      onChange={handleChange}
                    />
                    {touched.password && errors.password ? (
                      <ErrorMsg
                        style={{
                          color: "red",
                          fontSize: "12px",
                          padding: "2px",
                        }}
                      >
                        {errors.password}
                      </ErrorMsg>
                    ) : null}
                  </div>
                  <SignUpBtn type="submit">로그인</SignUpBtn>
                </form>
              )}
            </Formik>
            <span style={{ textAlign: "center", marginTop: "20px" }}>
              계정이없으신가요?&nbsp;&nbsp;&nbsp;
              <SignUpLink to="../signup">회원가입</SignUpLink>
            </span>
          </FormWrapper>
        </FormContainer>
      </LeftContainer>
      <RightContainer>
        <span style={{ fontSize: "60px", color: "white" }}>Go green,</span>
        <span style={{ fontSize: "60px", color: "white" }}>
          make a difference
        </span>
        <LogoImg width="380px" height="380px" />
      </RightContainer>
    </InputContainer>
  );
};

export default SignIn;

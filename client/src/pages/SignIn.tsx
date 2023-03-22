import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoImg } from "../icon/main_logo.svg";
import { ErrorMessage, Formik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { object, string, ref } from "yup";

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
  height: 100%;
`;
const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 821px;
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
  height: 680px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* border: 1px solid black; */
`;
const RadiusInput = styled.input`
  border-radius: 12px;
  padding: 6px;
`;
const ErrorMsg = styled.div`
  color: red;
  font-size: 12px;
  padding: 2px;
  margin-top: 2px;
`;
const SignUpBtn = styled.button`
  margin-top: 20px;
  color: white;
  font-size: 16px;
  background: #609966;
  border-radius: 12px;
  padding: 8px;
  border: none;
`;
const LogoLink = styled(Link)`
  display: flex;
`;

interface FormModel {
  // 이름은 공백이 아니여야 합니다.
  name: string;
  email: string;
  /**
   * 휴대폰 번호는 010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다.
   */
  phone: string;
  /**
   * 영문자와 숫자, !@#$%^&*()_+-=만 사용 가능합니다.
   */
  password: string;
  passwordConfirm: string;
}

const signUpSchema = object({
  name: string().required("이름을 입력해주세요"),
  email: string()
    .email("이메일 주소를 다시 확인해주세요.")
    .required("이메일을 입력해주세요"),
  phone: string()
    .test(
      "phone",
      "010으로 시작하는 11자리 숫자와 '-'로 구성되어야 합니다",
      (val: any) => /^010-\d{3,4}-\d{4}$/.test(val),
    )
    .required("전화번호를 입력해주세요"),
  password: string()
    .test("pw", "숫자 + 영문자 8자 이상 12자 이하입니다", (val: any) =>
      /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,12}$/.test(val),
    )
    .required("비밀번호를 입력해주세요"),
  passwordConfirm: string()
    .oneOf([ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호를 입력해주세요"),
});

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <InputContainer>
      <LeftContainer>
        <LogoContainer>
          <LogoLink to="../">
            <LogoImg width="60px" height="60px" />
          </LogoLink>
        </LogoContainer>
        <FormContainer>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
              marginBottom: "30px",
            }}
          >
            로그인
          </h1>
          <Formik<FormModel>
            initialValues={{
              name: "",
              email: "",
              phone: "",
              password: "",
              passwordConfirm: "",
            }}
            validationSchema={signUpSchema}
            onSubmit={(values) => {
              axios
                .post("http://3.39.150.26:8080/members", values)
                .then((res) => {
                  alert("회원가입이 완료되었습니다.");
                  navigate("../signin");
                })
                .catch((e) => {
                  console.log("회원가입 실패", e.response);
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
                      style={{ color: "red", fontSize: "12px", padding: "2px" }}
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
                      style={{ color: "red", fontSize: "12px", padding: "2px" }}
                    >
                      {errors.password}
                    </ErrorMsg>
                  ) : null}
                </div>
                <SignUpBtn type="submit">회원가입</SignUpBtn>
              </form>
            )}
          </Formik>
          <span style={{ textAlign: "center", marginTop: "20px" }}>
            이미회원이신가요?&nbsp;&nbsp;&nbsp;
            <a href="../signin">로그인</a>
          </span>
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

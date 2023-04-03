// import React from "react";
// import styled from "styled-components";
// import Add from "../icon/add_circle.svg"
// import Cancel from "../icon/cancel.svg"
// import user from "../icon/user.svg";
// import { useState } from "react";
// import { tokenState } from "../recoil/state";
// import { myIdState } from "../recoil/state";
// import { useRecoilValue } from 'recoil';
// import axios from "axios";

// const ModalWrapper = styled.div`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background-color: rgba(0, 0, 0, 0.6);
//     z-index: 9;
// `;

// const ModalContent = styled.div`
//     display: flex;
//     flex-direction: column;
//     /* align-items: center; */
//     /* justify-content: center; */
//     background-color: white;
//     border-radius: 10px;
//     border: 2px solid #609966;
//     box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.2);
//     width: 600px;
//     /* height: 300px; */
//     padding: 10px;
//     text-align: center;
// `;

// const CloseButton = styled.img`
//     position: relative;
//     width: 40px;
//     height: 40px;
//     cursor: pointer;
// `;
// const NoButton = styled.div`
//     width: 50px;
//     height: 50px;
//     display: hidden;
// `;
// const PlusButton = styled.img`
//     position: relative;
//     margin: 0px 10px 0px 0px;
//     width: 50px;
//     height: 50px;
//     cursor: pointer;
// `;

// const ModalTitle = styled.h2`
//     color: #595959;
//     margin-top: 0;
// `;

// const ModalInput = styled.input`
//     width: 100%;

//     margin: 10px 0px 10px 0px;
//     border-radius: 5px;
//     font-size: 18px;
//     /* font-weight: bold; */
//     border: 1px;
//     /* vertical-align: top; */
//     /* text-align: left; */
//     resize: none;
// `;

// const ModalTextarea = styled.textarea`
//     width: 100%;
//     height: 100px;
//     margin: 10px 0px 10px 0px;
//     border-radius: 5px;
//     font-size: 18px;
//     /* font-weight: bold; */
//     border: 1px;
//     /* vertical-align: top; */
//     /* text-align: left; */
//     resize: none;
// `;

// const ModalButton = styled.button`
//     padding: 10px 20px;
//     border: none;
//     font-size: 20px;
//     font-weight: bold;
//     border-radius: 5px;
//     background-color: #609966;
//     width: 100%;
//     color: white;
//     cursor: pointer;
// `;
// const SubmitContainer = styled.div`
//     display: flex;
//     flex-direction: row;
//     height: 50px;
//     width: 100%;
//     margin: 10px 0px 0px 0px;
// `;
// const TitleContainer = styled.div`
//     display: flex;
//     flex-direction: row;
//     justify-content: space-between;
//     height: 50px;
//     width: 100%;
// `;
// const Postuser = styled.div`
//     display: flex;
//     padding: 10px 0px 0px 0px;
//     /* justify-content: flex-start; */
//     flex-direction: row;
//     border-top: 1px solid #b5b5b5;
// `;
// const Usericon = styled.img`
//     padding: 2px 17px 2px 2px;
//     width: 50px;
//     height: 50px;
// `;
// const UserInfo = styled.div`
//     flex-direction: row;
// `;
// const UserText = styled.div`
//     display: flex;
//     justify-content: flex-start;
// `;
// const Testinput = styled.input`
//     display: none;
// `;

// function PostModal() {
    
//     return (
//         <>
//             <ModalWrapper>
//                 <ModalContent>
//                     <TitleContainer>
//                         <ModalTitle>탄소 배출 줄이는 법 알리기</ModalTitle>
//                         <CloseButton/>
//                     </TitleContainer>
//                     <Postuser>
//                         <Usericon src={user} alt='user'/>
//                         <UserInfo>
//                             <UserText style={{padding:"5px 0px 0px 0px"}}><b>정민상</b>&nbsp;Lv.5</UserText>
//                             <UserText>2023년 3월 6일</UserText>
//                         </UserInfo>
//                     </Postuser>
//                     <SubmitContainer>
//                     <label htmlFor="fileUpload">
//                         <PlusButton src={Add}/>
//                     </label>
//                     <Testinput type="file" multiple={true} id="fileUpload"/>
//                         <ModalButton>알려주기</ModalButton>
//                     </SubmitContainer>
//                 </ModalContent>
//             </ModalWrapper>
//         </>
//     );
// }
// export default PostModal;

import React, { useState } from 'react';
import styled from 'styled-components';
import SignIn from '../pages/SignIn';
import { Link } from 'react-router-dom';

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 400px;
    height: 200px;
    font-weight: bold;
    background-color: #fff;
    border-radius: 10px;
    border: 2px solid #609966;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    padding: 40px;
`;

const ModalTitle = styled.h2`
    font-size: 24px;
    margin-bottom: 10px;
    text-align: center;
`;

const ModalMessage = styled.p`
    font-size: 18px;
    text-align: center;
`;

const ModalButton = styled(Link)`
    margin-top: 20px;
    padding: 10px;
    background-color: #609966;
    color: #fff;
    border: none;
    border-radius: 15px;
    width: 80%;
    text-align: center;
    text-decoration-line: none;
    cursor: pointer;

    &:hover {
        background-color: #507c55;
    }
    &:active {
        background-color: #335236;
    }
`;

function LoginModal() {
    const [showModal, setShowModal] = useState(true);

    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    return (
      <div>
        {/* <button onClick={handleShowModal}>모달창 열기</button> */}
        {showModal && (
          <ModalContainer>
            <ModalContent>
              <ModalTitle>로그인/회원가입을 하고 Green Circle를 만나보세요.</ModalTitle>
              <ModalMessage>Green Circle에 가입하시면 다양한 게시글 열람과 직접 게시글 게시가 가능합니다</ModalMessage>
              <ModalButton to="/SignIn" onClick={handleCloseModal}>로그인</ModalButton>
              {/* <button onClick={handleCloseModal}>닫기(이건 나중에 없앨거)</button> */}
            </ModalContent>
          </ModalContainer>
        )}
      </div>
    );
}

export default LoginModal;
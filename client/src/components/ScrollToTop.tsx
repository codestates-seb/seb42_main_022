import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import up from "../icon/expand_up_white.svg";

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #609966;
  color: #fff;
  border: none;
  padding: 0px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4F8255;
  }
`;

const ScrollToTop = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl: string = location.pathname;
  const handleClick = () => {
    navigate(`${currentUrl}`, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ScrollToTopButton onClick={handleClick}>
      <img src={up} alt='TopButton'/>
    </ScrollToTopButton>
  );
};

export default ScrollToTop;
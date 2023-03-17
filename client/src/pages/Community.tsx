import React from 'react';
import Trees from '../image/trees.png';
import Cow from '../image/cow.jpg';
import Earth from '../image/earth.png';
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import arrowfront from '../icon/arrowforward.svg'
import arrowback from '../icon/arrowback.svg'

const Container = styled.div`
  width: 100%;
  overflow: hidden;
`;
const SliderContainer = styled.div`
  width: 100%;
  height: 480px;
  display: flex;
`;
const Img = styled.img`
  width: 100%;
  height: 480px;
  object-fit: contain;
`;
const CarouselBack = styled.img`
  position: absolute;
  top: 200px;
  left: 20px;
  z-index: 1;
  cursor: pointer;
`;
const CarouselFront = styled.img`
  position: absolute;
  top: 200px;
  right: 10px;
  z-index: 1;
  cursor: pointer;
`;
const InputContainer = styled.div`
  position: absolute;
  top: 450px;
  left: 45%;
  z-index: 1;
`;
const Input = styled.input`
  cursor: pointer;
  appearance: none;
  background-color: ${(props) => (props.checked === true ? 'rgba(88, 84, 84, 0.55)' : 'rgba(177, 166, 166, 0.55)')};
  border-radius: 50%;
  width: 20px;
  height: 20px;
`;

const Carousel: React.FC = () => {
  const TOTAL_SLIDES = 2;
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
  };
  const handle = (e: number) => {
    setCurrentSlide(e)
  }
  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = ("all 0.5s ease-in-out");
      slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }
  }, [currentSlide]);
  useEffect(() => {
    const timer = setInterval(() => {
      console.log(currentSlide)
      nextSlide()
    }, 3000);

    return () => {
        clearInterval(timer);
    };
  });

  return (
    <>
      <Container>
        <SliderContainer ref={slideRef}>
          <Img src={Earth} />
          <Img src={Trees} />
          <Img src={Cow} />
        </SliderContainer>
      </Container>
      <CarouselBack src={arrowback} onClick={prevSlide}/>
      <CarouselFront src={arrowfront} onClick={nextSlide}/>
      <InputContainer>
        <Input onClick={(e) => handle(0)} type="radio" checked={currentSlide === 0 ? true : false} name="slider" id="slider1" />
        <Input onClick={(e) => handle(1)} type="radio" checked={currentSlide === 1 ? true : false} name="slider" id="slider2" />
        <Input onClick={(e) => handle(2)} type="radio" checked={currentSlide === 2 ? true : false} name="slider" id="slider3" />
      </InputContainer>
    </>
  );
};

export default Carousel;

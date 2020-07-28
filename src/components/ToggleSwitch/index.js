import React from "react";
import styled from "styled-components";

const Container = styled.label`
  position: relative;
  display: inline-block;
  width: 82px;
  height: 32px;
  border: 1px solid #0365b2;
  border-radius: 5px;
  background-color: #0365b2;

  > input {
    display: none;
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0365b2;
  transition: 0.4s;
  border-radius: 8px;

  &:before {
    position: absolute;
    content: "";
    height: 30px;
    width: 40px;
    background-color: white;
    transition: 0.2s;
    border-radius: 8%;
  }
`;

const SliderInput = styled.input`
    &:checked + ${Slider} {
        background-color: #0365b2;
        &:before {
            transform: translateX(40px);
            background-color: white;
        }
    }
`;

export default class ToggleSwitch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Container>
        <SliderInput type="checkbox" />
        <Slider />
      </Container>
    );
  }
}

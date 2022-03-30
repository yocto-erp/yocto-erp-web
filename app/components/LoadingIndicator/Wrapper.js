import styled from "styled-components";

export const WrapperParent = styled.div`
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 100;
  background-color: black;
  opacity: 0.3;
`;

const Wrapper = styled.div`
  top: 50%;
  left: 50%;
  width: 40px;
  height: 40px;
  position: relative;
`;

export default Wrapper;

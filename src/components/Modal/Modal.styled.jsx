import styled from '@emotion/styled';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 24px;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(3px);
`;

export const ModalWindow = styled.div`
  max-height: calc(100vh - 24px);

  @media (min-width: 768px) {
    width: 750px;
    height: 500px;
  }

  @media (min-width: 1200px) {
    width: 900px;
    height: 600px;
  }

  @media (min-width: 1440px) {
    width: 975px;
    height: 650px;
  }
`;

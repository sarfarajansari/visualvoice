import React from "react";
import styled from "styled-components";

const Container = styled.div`
  /* Container for the captions */
  .caption-container {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.7); /* Semi-transparent background */
    border-radius: 10px;
    padding: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 1000;
  }

  /* Styling for the caption text */
  .caption-text {
    font-size: 1.5rem; /* Adjust font size as needed */
    line-height: 1.6;
    font-family: "Arial", sans-serif;
    background: linear-gradient(
      90deg,
      #ff6b6b,
      #f5e56b,
      #6bff95,
      #6bcaff
    ); /* Gradient colors */
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent; /* To apply the gradient color to the text */
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8); /* Subtle shadow for readability */
    animation: rainbow-text 3s ease-in-out infinite; /* Color animation */
  }

  /* Text color animation */
  @keyframes rainbow-text {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }

  .caption-container.fade-in {
    animation: fadeIn 0.5s ease-in-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
export const CaptionContext = React.createContext({
  currentCaption: "",
  setCurrentCaption: () => {},
});


const Caption = () => {
  const { currentCaption } = React.useContext(CaptionContext);
  return (
    <Container>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div class="caption-container fade-in">
        <p class="caption-text"> {currentCaption}</p>
      </div>
    </Container>
  );
};

export default Caption;

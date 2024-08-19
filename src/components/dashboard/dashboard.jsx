import React from "react";
import styled from "styled-components";
import { sidebarContext } from "../sidebar/Sidebar";
import { Button } from "antd";
import { Link } from "react-router-dom";

const Container = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 40px 20px;
  border-radius: 5px;
  background-color: #faedce;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: sans-serif;
`;

const ButtonContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  font-family: sans-serif;

  display: flex;
  justify-content: flex-end;
`;

const Dashboard = () => {
  const { setHeader } = React.useContext(sidebarContext);
  React.useEffect(() => {
    setHeader("Visual Voice");
  }, []);
  return (
    <div>
      <Container>
        <h2>Welcome to your Visual Voice! 🌟</h2>
        <br />
        Visual Voice’s no-sound-required approach ensures that learning is
        accessible to everyone, regardless of hearing ability. By emphasizing
        visual content, we create an environment where understanding and
        engagement are not limited by the absence of audio. This makes education
        more inclusive and effective for all users.
        <br />
        <br />
        We're thrilled to have you here. Our platform is designed with you in
        mind, ensuring that you have the best experience as you explore and
        learn from videos with captions that are not only clear but also
        visually engaging. We know how important it is for you to have easy
        access to content, so we've made sure to keep everything simple and
        straightforward.
        <br />
        <br />
        To get started, just click on the "Get Started" button. From there,
        you'll have the option to either upload your own video or choose from
        one of the videos that have already been uploaded. It's as easy as that!
        <br />
        <br />
        Once you've selected a video, you'll be able to watch it with captions
        that are designed to enhance your viewing experience. The captions will
        display in a colorful, animated style that makes them easy to follow and
        enjoyable to read. As you watch, our system will automatically capture
        notes for you, so you can focus on learning without having to worry
        about missing anything important.
        <br />
        <br />
        Whether you're here to learn something new or revisit something
        familiar, we hope you'll find our platform to be a valuable resource. So
        go ahead, get started, and dive into a world of learning where every
        detail is made just for you.
        <br />
        <br />
        We're so glad you're here, and we can't wait for you to explore
        everything we have to offer!
        <br />
        <br />
        <br />
        Happy learning! 🎓
      </Container>

      <ButtonContainer>
        <Link to="/Caption Stream">
          <Button
            type="primary"
            size="large"
            style={{ marginTop: "20px auto", position: "relative" }}
          >
            Get Started
          </Button>
        </Link>
      </ButtonContainer>
    </div>
  );
};

export default Dashboard;

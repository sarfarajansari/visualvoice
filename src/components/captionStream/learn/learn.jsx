import React, { useEffect, useMemo } from "react";
import { apiClient } from "../../../apiClient/apiClient";

import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { AppLodingContainer, sidebarContext } from "../../sidebar/Sidebar";
import { Image, message, Spin } from "antd";
import styled from "styled-components";
import Caption, { CaptionContext } from "./caption";
import Notes from "./notes";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 20px;
  padding: 20px;
  background-color: #e0e5b680;
  .concept-box {
    padding: 10px 20px;
    background-color: #fefae0;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    .concept-time {
      color: blue;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .concept-map {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    & > div {
      cursor: pointer;
    }
  }

  .video-container {
    background-color: #fefae0;
    padding: 30px;
    display: grid;
    place-items: center;
    border: 5px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }
  min-height: calc(100vh - 48px);
`;

const LoadButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
const AddButton = styled.div`
  width: 400px;
  height: 200px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  background-color: #ede5af;
  cursor: pointer;
  border-radius: 8px;
  display: grid;
  place-content: center;
  font-size: 30px;
  font-family: sans-serif;
  user-select: none;
`;

async function convertVideoUrlToBlobUrl(videoUrl) {
  try {
    // Fetch the video data
    const response = await fetch(videoUrl);

    // Ensure the response is okay
    if (!response.ok) {
      throw new Error("Failed to fetch video");
    }

    // Convert the response to a Blob
    const videoBlob = await response.blob();

    // Create a blob URL from the Blob
    const blobUrl = URL.createObjectURL(videoBlob);

    return blobUrl;
  } catch (error) {
    console.error("Error converting video URL to blob URL:", error);
  }
}

const Learn = () => {
  const { videoId } = useParams();
  const { setCurrentCaption, setCurrentTime } =
    React.useContext(CaptionContext);
  const [video, setVideo] = useState(null);
  const { setHeader } = React.useContext(sidebarContext);
  const playerRef = React.useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    try {
      apiClient.get(`/visual-voice/video/${videoId}`, {}).then(async (res) => {
        setHeader(res.data.title);

        const url = await convertVideoUrlToBlobUrl(res.data.url);

        if (url) {
          setVideo({
            ...res.data,
            url,
          });
        }
      });
    } catch (err) {}
  }, [videoId]);

  if (!video?.title)
    return (
      <AppLodingContainer
        style={{ height: "calc(100vh - 48px)", width: "100%" }}
      >
        <Spin />
      </AppLodingContainer>
    );

  const onSeek = (time) => {
    playerRef.current.seekTo(time);

    setPlaying(true);
  };

  const updateCaption = (currentTime) => {
    if (!video) return;

    const caption = video.transcription.find(
      ({ startTime, endTime }) =>
        currentTime >= startTime && currentTime <= endTime
    );
    setCurrentCaption(caption ? caption.text : "");
    setCurrentTime(currentTime);
  };

  return (
    <Container>
      <div>
        <div className="video-container">
          <Stack direction={{ xs: "column", md: "row" }}>
            <Box flex={1}>
              <Box sx={{ width: "100%", position: "sticky", top: "86px" }}>
                {video && (
                  <ReactPlayer
                    url={video.url}
                    className="react-player"
                    controls
                    ref={playerRef}
                    onPlay={() => setPlaying(true)}
                    onProgress={(s) => updateCaption(s.playedSeconds)}
                    playing={playing}
                    volume={0}
                  />
                )}
                <Caption />
                <Typography
                  color="#060303"
                  fontWeight="bold"
                  variant="h5"
                  p={2}
                >
                  {video.title}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </div>
      </div>
      <div>
        <div className="concept-box">
          <Typography variant="h5">Notes</Typography>
        </div>
        {/* <div className="concept-map">
          {concepts.map((concept) => (
            <div className="concept-box">
              <Typography variant="h6">
                {concept["concept description"] || concept.topic}
                <span className="concept-time">
                  <div onClick={(e) => onSeek(e, concept.start)}>
                    <span style={{ fontSize: 16 }}>
                      {formatTime(concept.start)}
                    </span>
                    <span> - </span>
                    <span style={{ fontSize: 16 }}>
                      {formatTime(concept.end)}
                    </span>
                  </div>
                </span>
              </Typography>
              <br />

              <div onClick={() => openPopupWindow(concept.html_content)}>
                <Image
                  src={visualizerThumbnail}
                  width={"100%"}
                  preview={false}
                />
              </div>
            </div>
          ))}
        </div> */}
        <Notes items={video?.notes} onSeek={onSeek} />
      </div>
    </Container>
  );
};

export default Learn;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../../../apiClient/apiClient";
import { AppLodingContainer, sidebarContext } from "../../sidebar/Sidebar";
import { Button, message, Spin } from "antd";
import VideoCard from "./videoCard";
import styled from "styled-components";
import { useCustomDropzone } from "./dropzone";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 40px;
  padding: 20px;

  a {
    text-decoration: none;
    color: #206a3f;
  }
  background-color: #e0e5b680;
  min-height: calc(100vh - 48px);
`;

const AddButton = styled.div`
  width: 320px;
  height: 276px;
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
const CaptionStream = () => {
  const [videos, setVideos] = React.useState([]);

  const { setHeader } = React.useContext(sidebarContext);
  const dropzone = useCustomDropzone(async (files) => {
    const file = files[0];
    if (file.type !== "video/mp4") {
      return message.error("Not a video");
    }

    await uploadVideo(file);
  });

  const [loading, setLoading] = React.useState(false);
  const [uploadingVideo, setUploadingVideo] = React.useState(false);

  const uploadVideo = async (file) => {
    setUploadingVideo(true);

    let formData = new FormData();

    // Append the file to the FormData object
    formData.append("file", file);

    const response = await apiClient.post(
      "/visual-voice/video",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data);

    setUploadingVideo(false);
    // try {
    //   if (generatingVideo) {
    //     return;
    //   }
    //   setGeneratingVideo(true);
    //   apiClient
    //     .post(`generatevideo`, {
    //       subject: topic,
    //     })
    //     .then((res) => {
    //       const videos = res.data?.videos || [];
    //       setVideos((prev) => [...prev, ...videos]);
    //       setGeneratingVideo(false);
    //     });
    // } catch (err) {
    //   setGeneratingVideo(false);
    //   console.log(err);
    //   await new Promise((resolve) => setTimeout(resolve, 2000));
    //   if (c < 3) {
    //     return generateVideos(c + 1);
    //   }
    // }
  };
  useEffect(() => {
    
    apiClient.get("/visual-voice/videos").then((res) => {
      setVideos(res.data);
    });
    setHeader();
  }, []);
  if (loading) {
    return (
      <AppLodingContainer
        style={{ height: "calc(100vh - 48px)", width: "100%" }}
      >
        <Spin />
      </AppLodingContainer>
    );
  }
  return (
    <Container>
      {videos.map((video) => {
        return (
          <VideoCard
            videoId={video.videoId}
            thumbnail={'https://www.keytechinc.com/wp-content/uploads/2022/01/video-thumbnail.jpg'}
            title={video.title}
            key={video.videoId}
          />
        );
      })}
      <AddButton {...dropzone.getRootProps()}>
        <input {...dropzone.getInputProps()} accept="video/mp4" />
        {uploadingVideo && (
          <>
            Uploading... <Spin size="small" />
          </>
        )}

        {!uploadingVideo && !dropzone.isDragActive && (
          <>
            <p>Drop a video</p>
            <br></br>
            <p style={{ textAlign: "center" }}>OR</p>
            <br></br>
            <Button type="primary">Upload One</Button>
          </>
        )}
        {!uploadingVideo && dropzone.isDragActive && (
          <>
            <p>Drop Here!!</p>
          </>
        )}
        {/* <Dropzone /> */}
      </AddButton>
    </Container>
  );
};

export default CaptionStream;

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const useCustomDropzone = (handlefiles) => {
  const onDrop = useCallback((acceptedFiles) => {
    handlefiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "video/mp4",
    multiple: false,
  });

  return {
    getRootProps,
    getInputProps,
    isDragActive,
  };
};

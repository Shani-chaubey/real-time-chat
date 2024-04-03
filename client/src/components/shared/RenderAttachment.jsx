import React from "react";
import { transformImage } from "../../lib/features";
import { FileOpen } from "@mui/icons-material";

const RenderAttachment = (file, url) => {
  switch (file) {
    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt="Attachment"
          width={"200px"}
          height={"150px"}
          style={{ objectFit: "contain" }}
        />
      );

    case "video":
      return <video url={url} preload="none" width={"200px"} controls />;

    case "audio":
      return <audio url={url} preload="none" controls />;

    default:
      return <FileOpen />;
  }
};

export default RenderAttachment;

import React from "react";
import ReactPlayer from "react-player";

function VideoPlayer({ width = "100%", height = "100%", url }) {
  return (
    <div>
      <ReactPlayer controls={true} width={"100%"} height={"100%"} url={url} />
    </div>
  );
}

export default VideoPlayer;

import React from "react";

const Video = props => {
  return (
    <div className="embed-responsive embed-responsive-16by9">
      <iframe
        className="embed-responsive-item"
        src={`https://www.youtube.com/embed/${props.video.key}`}
        allowFullScreen
        title={props.video.id}
      />
    </div>
  );
};

export default Video;

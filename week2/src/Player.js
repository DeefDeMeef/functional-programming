import React from "react";
import "./Player.css";

import PauseIcon from "./assets/pause.svg";
import PlayIcon from "./assets/play.svg";

const Player = (props) => {
  // const backgroundStyles = {
  //   backgroundImage:`url(${
  //     props.item.album.images[0].url
  //   })`,
  // };
  const progressBarStyles = {
    width: (props.progress_ms * 100) / props.item.duration_ms + "%",
  };

  return (
    <div>
      <div className="player-wrapper">
        <div className="now-playing-img">
          <img alt="album cover" src={props.item.album.images[0].url} />
        </div>
        <div className="now-playing-info">
          <h1 className="now-playing-track-name">{props.item.name}</h1>
          <h3 className="now-playing-artist-name">{props.item.artists[0].name}</h3>
        </div>
        <div className="now-playing-icon">
          {props.device != null && <p>{props.device.name}</p>}
          {props.is_playing ? <img src={PauseIcon} alt="pause" /> : <img src={PlayIcon} alt="play" />}
        </div>
      </div>
      <div className="progress-wrapper">
        <div className="progress-bar" style={progressBarStyles} />
      </div>
    </div>
  );
};

export default Player;

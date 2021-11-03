import React from "react";

import PauseIcon from "./assets/pause.svg";
import PlayIcon from "./assets/play.svg";

import "./styles/player.css";

const Player = (props) => {
  // console.log(props);

  if (props) {
    const progressBarStyles = {
      width: (props.data.progress_ms * 100) / props.data.item.duration_ms + "%",
    };
    return (
      <section>
        <div className="player-wrapper">
          <div className="now-playing-img">
            <img alt="album cover" src={props.data.item.album.images[0].url} />
          </div>
          <div className="now-playing-info">
            <p>Currently playing: </p>
            <h1 className="now-playing-track-name">{props.data.item.name}</h1>
            <h3 className="now-playing-artist-name">{props.data.item.artists[0].name}</h3>
          </div>
          <div className="now-playing-icon" style={{ flex: "end" }}>
            {props.data.device != null && <p>{props.data.device.name}</p>}
            {props.data.is_playing ? <img src={PauseIcon} alt="pause" /> : <img src={PlayIcon} alt="play" />}
          </div>
        </div>
        <div className="progress-wrapper">
          <div className="progress-bar" style={progressBarStyles} />
        </div>
      </section>
    );
  } else return <h1>Er is iets misgegaan met het laden van de player...</h1>;
};
export default Player;

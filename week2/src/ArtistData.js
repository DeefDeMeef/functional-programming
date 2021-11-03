import { data } from "jquery";
import React from "react";

import "./styles/artistData.css";

const ArtistData = (props) => {
  // console.log("This is props: ", props);

  return (
    <article className="artist-wrapper">
      {props.data !== null && (
        <div className="artist-data">
          <img className="artist-avatar" src={props.data.images[1].url} alt="artist profile pic" />
          <div className="credentials-wrapper">
            <p>
              <strong>Artist: </strong>
              {props.data.name}
            </p>
            <p>
              <strong>Followers: </strong>
              {props.data.followers.total}
            </p>
            <p>
              <strong>Popularity: </strong>
              {props.data.popularity}
            </p>
            <p>{props.data.emotion}</p>
          </div>
        </div>
      )}
      <div>
        <p>
          <strong>Genres: </strong>
        </p>
        {props.data.genres[0] ? (
          props.data.genres.map((item, index) => {
            return (
              <p key={index} style={{ textTransform: "capitalize" }}>
                {item}
              </p>
            );
          })
        ) : (
          <p>Wat maakt deze gast joh?</p>
        )}
      </div>
      <div className="popularity-bar">
        <div style={{ width: props.data.percentage + "%", backgroundColor: "blue" }}></div>
      </div>
    </article>
  );
};

export default ArtistData;

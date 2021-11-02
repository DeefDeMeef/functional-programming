import React from "react";

const ArtistData = (props) => {
  console.log("This is props: ", props);

  return (
    <div className="App">
      <div className="main-wrapper">
        {props.followers !== null && (
          <p>
            <strong>Followers: </strong>
            {props.followers}
          </p>
        )}
      </div>
      <div className="main-wrapper">
        {props.artistName !== null && (
          <p>
            <strong>Artist: </strong>
            {props.artistName}
          </p>
        )}
      </div>
      <div className="main-wrapper">
        {props.popularity !== null && (
          <p>
            <strong>Popularity: </strong>
            {props.popularity}
          </p>
        )}
      </div>
    </div>
  );
};

export default ArtistData;

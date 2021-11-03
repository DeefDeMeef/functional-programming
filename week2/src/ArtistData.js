import React from "react";

const ArtistData = (props) => {
  // console.log("This is props: ", props);

  return (
    <div className="App">
      <h1>Artist data</h1>
      <div className="main-wrapper">
        <img src={props.data.images[1].url} alt="artist profile pic" />
        {props.data.followers !== null && (
          <p>
            <strong>Followers: </strong>
            {props.data.followers.total}
          </p>
        )}
      </div>
      <div className="main-wrapper">
        {props.data.name !== null && (
          <p>
            <strong>Artist: </strong>
            {props.data.name}
          </p>
        )}
      </div>
      <div className="main-wrapper">
        {props.data.popularity !== null && (
          <p>
            <strong>Popularity: </strong>
            {props.data.popularity}
          </p>
        )}
      </div>
      <div>
        <p>
          <strong>Genres: </strong>
        </p>
        {props.data.genres.map((item) => {
          return <p>{item}</p>;
        })}
      </div>
    </div>
  );
};

export default ArtistData;

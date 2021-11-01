import React from "react";

const ArtistData = (props) => {
  // const backgroundStyles = {
  //   backgroundImage:`url(${
  //     props.item.album.images[0].url
  //   })`,
  // };

  console.log("This is props: ", props);

  return (
    <div className="App">
      <div className="main-wrapper">{props.followers !== null && <p>{props.followers}</p>}</div>
    </div>
  );
};

export default ArtistData;

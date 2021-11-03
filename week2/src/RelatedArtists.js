import React from "react";

const RelatedArtists = (props) => {
  console.log(props);
  return (
    <section className="artist-wrapper">
      {props.data &&
        props.data.artists
          .map((item, index) => {
            return (
              <article key={index}>
                <img className="artist-avatar" src={item.images[1].url} />
                <h4>{item.name}</h4>
                <p>{item.followers.total}</p>

                <a href={item.external_urls.spotify} target="_blank">
                  <button>Bekijk profiel</button>
                </a>
              </article>
            );
          })
          .slice(0, 5)}
    </section>
  );
};

export default RelatedArtists;

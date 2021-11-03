import React from "react";

import FollowersIcon from "./assets/followers.svg";

const RelatedArtists = (props) => {
  console.log(props);
  return (
    <>
      <h1 style={{ padding: "0em 1em" }}>Relatieve artiesten</h1>

      <section className="related-artist-wrapper">
        {props.data &&
          props.data.artists
            .map((item, index) => {
              return (
                <article key={index}>
                  <img className="artist-avatar" src={item.images[1].url} />
                  <h4>{item.name}</h4>
                  <p>
                    {/* <img src={FollowersIcon} style={{ width: "1.5em", paddingRight: "0.25em" }} /> */}
                    {item.followers.total}
                  </p>

                  <a href={item.external_urls.spotify} target="_blank">
                    <button className="btn-small">Bekijk profiel</button>
                  </a>
                </article>
              );
            })
            .slice(0, 5)}
      </section>
    </>
  );
};

export default RelatedArtists;

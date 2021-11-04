import React, { useEffect, useState } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import ArtistData from "./ArtistData";
import RelatedArtists from "./RelatedArtists";
import "./styles/App.css";

import spotifyProvider from "./utility/spotifyProvider";
import cleanDataFunctions from "./cleanDataFunctions";

const App = () => {
  const [count, setCount] = useState(0);
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hash.access_token) {
      if (count === 0) getData();
      const refreshData = tickerInterval();
      return () => clearInterval(refreshData);
    }
  }, []);

  const tickerInterval = () => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
      getData();
    }, 3000);
    return interval;
  };

  const getData = async () => {
    if (count === 0) setLoading(true);
    try {
      await spotifyProvider
        .getCurrentPlayingTrack(hash.access_token)
        .then((player) => {
          state.player = player;
          console.log(player);
          return player;
        })
        .then((res) => {
          const artist = spotifyProvider.getArtistData(hash.access_token, res.item.artists[0].id);
          return artist;
        })
        .then((data) => {
          let clean = cleanDataFunctions.integerSeperator(data);
          return clean;
        })
        .then((res) => {
          let percentage = cleanDataFunctions.getPopularityPercentage(res);
          return percentage;
        })
        .then((percentage) => {
          let popularity = cleanDataFunctions.getPopularityEmotion(percentage);
          state.artist = popularity;
          return popularity;
        });

      if (state.artist) {
        const relatedArtists = await spotifyProvider.getRelatedArtists(
          hash.access_token,
          state.player.item.artists[0].id
        );
        state.relatedArtists = relatedArtists;
      }

      setState(state);
      if (!loading) setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <header>{state.player && <Player data={state.player} />}</header>
      <section>
        {!hash.access_token && (
          <div className="login-btn-container">
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}>
              Login met Spotify
            </a>
          </div>
        )}
        {state.artist && <ArtistData data={state.artist} />}
        {state.relatedArtists && <RelatedArtists data={state.relatedArtists} />}
        {hash.access_token && !state.player && (
          <div className="login-btn-container">
            <h1>Je moet een nummer afspelen om data te kunnen zien</h1>
          </div>
        )}
      </section>
    </>
  );
};

export default App;

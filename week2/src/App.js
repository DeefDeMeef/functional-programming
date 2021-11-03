import React, { useEffect, useState } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import ArtistData from "./ArtistData";
import "./App.css";

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
      const player = await spotifyProvider.getCurrentPlayingTrack(hash.access_token);
      state.player = player;

      if (state.player) {
        const artist = await spotifyProvider.getArtistData(
          hash.access_token,
          state.player.item.artists[0].id
        );

        const clean = cleanDataFunctions.integerSeperator(artist);
        const percentage = cleanDataFunctions.getPopularityPercentage(clean);

        state.artist = percentage;
      }

      setState(state);
      if (!loading) setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  console.log(state);

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
        {hash.access_token && !state.player && <h1>Je moet een nummer afspelen om data te kunnen zien</h1>}
      </section>
    </>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import ArtistData from "./ArtistData";
import "./App.css";

const App = () => {
  const [state, setState] = useState({});

  const [token, setToken] = useState("");

  // constructor() {
  //   super();
  //   state = {
  //     token: null,
  //     item: {
  //       album: {
  //         images: [{ url: "" }],
  //       },
  //       name: "",
  //       artists: [{ name: "" }],
  //       duration_ms: 0,
  //     },
  //     is_playing: "Paused",
  //     progress_ms: 0,
  //     no_data: false,
  //     device: null,
  //   };

  //   this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  //   this.tick = this.tick.bind(this);
  // }

  // componentDidMount() {
  //   // Set token
  //   let _token = hash.access_token;

  //   if (_token) {
  //     // Set token
  //     this.setState({
  //       token: _token,
  //     });
  //     this.getCurrentlyPlaying(_token);
  //   }

  //   // set interval for checking every 5 seconds
  //   this.interval = setInterval(() => this.tick(), 5000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  // tick() {
  //   if (this.state.token) {
  //     this.getCurrentlyPlaying(this.state.token);
  //   }
  // }

  const checkUser = () => {
    let _token = hash.access_token;
    if (_token) {
      setToken(_token);
    }
  };

  if (token) {
    setInterval(() => {
      console.log("komt hij weer");
      getCurrentlyPlaying(token);
    }, 5000);
  }

  console.log("Dit is de token state: ", token);

  const getCurrentlyPlaying = async (bearenToken) => {
    // Make a call using the token from login
    await fetch("https://api.spotify.com/v1/me/player", {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearenToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("This is data: ", data);
      });
    // .then(async (res) => {
    //   await fetch("https://api.spotify.com/v1/artists/" + state.id, {
    //     method: "get",
    //     headers: {
    //       Accept: "application/json, text/plain, */*",
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + token,
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("This is artist data: ", data);
    //       // setState({
    //       //   followers: data.followers.total,
    //       //   artistName: data.name,
    //       //   popularity: data.popularity,
    //       // });
    //     });
    // });
  };

  useEffect(() => {
    checkUser();
  }, []);

  // async getArtistData(token, id) {
  //   await fetch("https://api.spotify.com/v1/artists/" + id, {
  //     method: "get",
  //     headers: {
  //       Accept: "application/json, text/plain, */*",
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("This is artist data: ", data);
  //       this.setState({
  //         followers: data.followers.total,
  //         artistName: data.name,
  //         popularity: data.popularity,
  //       });
  //     });
  // }

  return (
    <div className="App">
      <header className="App-header">
        {token && (
          <>
            {/* <Player
              item={state.item}
              is_playing={state.is_playing}
              progress_ms={state.progress_ms}
              device={state.device}
            /> */}
            <p>Ingelogd</p>
          </>
        )}
        {state.no_data && <p>Je moet een nummer afspelen op je Spotify om iets te kunnen zien.</p>}
      </header>

      {token && (
        <main>
          <ArtistData
            followers={state.followers}
            artistName={state.artistName}
            popularity={state.popularity}
          />
        </main>
      )}
      <div className="login-btn-container">
        {!state.token && (
          <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
              "%20"
            )}&response_type=token&show_dialog=true`}>
            Login met Spotify
          </a>
        )}
      </div>
    </div>
  );
};

export default App;

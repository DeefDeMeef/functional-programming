import React, { Component } from "react";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Player";
import ArtistData from "./ArtistData";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }],
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0,
      },
      is_playing: "Paused",
      progress_ms: 0,
      no_data: false,
      device: null,
    };

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
      this.getCurrentlyPlaying(_token);
    }

    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    // clear the interval to save resources
    clearInterval(this.interval);
  }

  tick() {
    if (this.state.token) {
      this.getCurrentlyPlaying(this.state.token);
      this.getArtistData(this.state.token, this.state.id);
    }
  }

  async getCurrentlyPlaying(token) {
    // Make a call using the token
    await fetch("https://api.spotify.com/v1/me/player", {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("This is data: ", data);
        if (!data) {
          this.setState({
            no_data: true,
          });
          return;
        }

        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
          no_data: false,
          device: data.device,
          id: data.item.artists[0].id,
        });
      });
  }

  async getArtistData(token, id) {
    await fetch("https://api.spotify.com/v1/artists/" + id, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("This is artist data: ", data);
        this.setState({
          followers: data.followers.total,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}>
              Login met Spotify
            </a>
          )}
          {this.state.token && !this.state.no_data && (
            <>
              <Player
                item={this.state.item}
                is_playing={this.state.is_playing}
                progress_ms={this.state.progress_ms}
                device={this.state.device}
              />
              <ArtistData followers={this.state.followers} />
            </>
          )}
          {this.state.no_data && <p>Je moet een nummer afspelen op je Spotify om iets te kunnen zien.</p>}
        </header>
      </div>
    );
  }
}

export default App;
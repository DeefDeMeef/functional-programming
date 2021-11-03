class SpotifyProvider {
  async getCurrentPlayingTrack(token) {
    let response = await fetch("https://api.spotify.com/v1/me/player", {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) return response.json();
    else return null;
  }

  async getArtistData(token, id) {
    let response = await fetch("https://api.spotify.com/v1/artists/" + id, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.ok) return response.json();
    else return null;
  }
}

export default new SpotifyProvider();

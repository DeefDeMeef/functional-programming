class CleanDataFunctions {
  integerSeperator(data) {
    data.followers.total = data.followers.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return data;
  }

  getPopularityPercentage(data) {
    const percentage = (data.popularity * 100) / 100;
    data.percentage = percentage;
    return data;
  }

  getPopularityEmotion(data) {
    const x = data.popularity;
    switch (true) {
      case x < 20:
        data.emotion = "Niet bekend 🥺";
        break;
      case x > 20 && x < 40:
        data.emotion = "Semi bekend 🙂";
        break;
      case x > 40 && x < 60:
        data.emotion = "Middel bekend 😁";
        break;
      case x > 60 && x < 80:
        data.emotion = "Vrij bekend 😱";
        break;
      case x > 80 && x < 100:
        data.emotion = "Mega bekend 🤯";
        break;
    }
    return data;
  }
}

// popularity -> percentage
// parse -> followers with .
// popularity color + emotion based on how high it is

export default new CleanDataFunctions();

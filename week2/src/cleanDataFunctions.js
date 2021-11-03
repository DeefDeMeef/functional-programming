class CleanDataFunctions {
  integerSeperator(data) {
    data.followers.total = data.followers.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    return data;
  }

  getPopularityPercentage(data) {
    const percentage = (data.popularity * 100) / 10;
    data.popularity = percentage;
    return data;
  }
}

// popularity -> percentage
// parse -> followers with .

export default new CleanDataFunctions();

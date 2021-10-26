console.log("mogge");

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // Work with JSON data here
    console.log(data);
  })
  .catch((err) => {
    // Do something for an error here
  });

renderData();

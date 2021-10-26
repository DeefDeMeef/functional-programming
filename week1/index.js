const url =
  "https://raw.githubusercontent.com/DeefDeMeef/functional-programming/main/week1/dataset.json?token=AHKPTBV4EZMO2RNHYRYCURDBQEGZM";

const collectData = () => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Er is iets misgegaan...");
      }
    })
    .then((res) => {
      getAnswersMethod(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getAnswersMethod = (obj) => {
  obj.map((item) => {
    console.log(item["Wat is je favoriete soort huisdier?"]);
  });
};

collectData();

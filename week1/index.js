const url = "https://raw.githubusercontent.com/cmda-tt/course-21-22/main/tech-track-dataset.json";
let ul = document.createElement("ul");

let hexArr = [
  {
    kleur: "blauw",
    hex: "#17c0eb",
  },
  {
    kleur: "groen",
    hex: "#32ff7e",
  },
  {
    kleur: "bruin",
    hex: "#ffaf40",
  },
  {
    kleur: "grijs",
    hex: "#4b4b4b",
  },
  {
    kleur: "donkerbruin",
    hex: "#000",
  },
];

console.log(hexArr.blauw);

function parseData() {
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      if (response.ok) resolve(response.json());
      else throw new Error("Er is iets misgegaan...");
    });
  })
    .then((res) => {
      // filter answers from question
      let answers = getAnswersMethod(res);
      return answers;
    })
    .then((colors) => {
      // match color with hexcodes
      let hexCodes = connectColorToHex(colors);
      console.log(hexCodes);
    })
    .catch((error) => {
      console.log(error);
    });
}

const getAnswersMethod = (obj) => {
  const answerObject = obj.map((item) => {
    let str = item["Wat is je oogkleur?"].toLowerCase().split("-")[0];
    let newStr = str.split(" ")[0];
    let li = document.createElement("li");
    li.innerHTML = newStr;
    document.body.appendChild(li);
    return newStr;
  });
  return answerObject;
};

const connectColorToHex = (obj) => {
  let colorValues = [];

  for (let i = 0; obj.length > i; i++) {
    let myObj = hexArr.find((col) => col.kleur === obj[i]);
    colorValues.push(myObj);
  }

  return colorValues;
};

parseData();

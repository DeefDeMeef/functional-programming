const url = "https://raw.githubusercontent.com/cmda-tt/course-21-22/main/tech-track-dataset.json";
let ul = document.createElement("ul");
const body = document.getElementsByTagName("body");

// lookUpTable
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
    hex: "#865439",
  },
  {
    kleur: "grijs",
    hex: "#716F81",
  },
  {
    kleur: "donkerbruin",
    hex: "#483434",
  },
];

const parseData = async () => {
  return new Promise((resolve, reject) => {
    fetch(url).then((response) => {
      if (response.ok) resolve(response.json());
      else {
        reject(new Error("Er is iets misgegaan in de api"));
        window.alert("Helaas is er iets misgegaan...");
      }
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
      console.table(hexCodes);
      return hexCodes;
    })
    .then((table) => {
      let colorTable = createColorTable(table);
    });
};

const getAnswersMethod = (obj) => {
  const answerObject = obj.map((item) => {
    let str = item["Wat is je oogkleur?"].toLowerCase().split("-")[0];
    let newStr = str.split(" ")[0];
    let li = document.createElement("li");
    li.innerHTML = newStr;
    // document.body.appendChild(li);
    return newStr;
  });
  return answerObject;
};

const connectColorToHex = (obj) => {
  let colorValues = [];
  // zet de values in alfabetische volgorde
  obj.sort();

  for (let i = 0; obj.length > i; i++) {
    let myObj = hexArr.find((col) => col.kleur === obj[i]);
    colorValues.push(myObj);
  }

  return colorValues;
};

const createColorTable = (obj) => {
  let table = document.createElement("table");
  obj.forEach((element) => {
    const tr = table.insertRow();
    const td = tr.insertCell();
    td.appendChild(document.createTextNode(element.hex));
    td.style.border = "2px solid" + element.hex;
    td.classList.add(element.kleur);
  });

  // let strArray = ["q", "w", "w", "w", "e", "i", "u", "r"];
  // let findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) != index);

  // console.log(findDuplicates(obj)); // All duplicates
  // console.log([...new Set(findDuplicates(obj))]); // Unique duplicates

  document.body.appendChild(table);
};

parseData();

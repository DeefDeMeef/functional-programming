# functional-programming

const url =
"https://raw.githubusercontent.com/DeefDeMeef/functional-programming/main/week1/dataset.json?token=AHKPTBV4EZMO2RNHYRYCURDBQEGZM";
let obj;

console.log("This is data: ", data);

async function fetchData() {
try {
const response = await fetch(url);

    if (response.ok) {
      const data = response.json();
      console.log("Data: ", data);
    }
    // getKeys(test);
    // getMethods(test);

} catch (error) {
console.log(error);
}
}

fetch(url)
.then((response) => {
if (response.ok) {
return response.json();
} else {
throw new Error("Something went wrong");
}
})
.then((responseJson) => {
// Do something with the response
})
.catch((error) => {
console.log(error);
});

// fetch(
// "https://raw.githubusercontent.com/DeefDeMeef/functional-programming/main/week1/dataset.json?token=AHKPTBV4EZMO2RNHYRYCURDBQEGZM"
// )
// .then((res) => res.json())
// .then((data) => (obj = data))
// .then(() => {
// console.log("obj: ", obj);
// getKeys(obj);
// getMethods(obj);
// getUniqueMethods(obj);
// });

function getKeys(data) {
console.table(data);
let keys = Object.keys(data[0]);
console.log("Keys: ", keys);
return keys;
}

function getMethods(data) {
let methods = data.map((course) => course.methods);
//What variables (keys) exist on a given object in the data array?
console.log("methods per course:", methods);
return methods;
}

function getUniqueMethods(methods) {
let methodsList = methods.reduce((acc, current) => acc.concat(current), []);
console.log("MethodsList: ", methodsList); //Still not unique but now it's flat
//let uniqueMethods = []
// methodsList.forEach(method => {
// if (uniqueMethods.indexOf(method) == -1){
// uniqueMethods.push(method)
// }
// })
//Shorthand method
let uniqueMethods = [...new Set(methodsList)];
console.log("uniqueMethods: ", uniqueMethods);
return uniqueMethods;
}

fetchData();

//***************************************************************DATABASE INFO****************************************************************************************************** */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"; // importing database firebase
// prettier-ignore
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"; // import ref (reference) and push which will push to database

const appSettings = {
	databaseURL:
		"https://playground-1bf26-default-rtdb.asia-southeast1.firebasedatabase.app/",
}; // this is my database link, adding as a object

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingInDB = ref(database, "Shopping");

//**************************************************************APP INFO************************************************************************************************** */

const textInput = document.getElementById("input-field");
const addButton = document.getElementById("add-button");
const shoppingList = document.getElementById("shopping-list");

//calling onValue to get data from the BD, also using snapshot function
onValue(shoppingInDB, function (snapshot) {
	clearShoppingList();
	//console.log(snapshot.val()); // use snapshot which gets the current data . val
	const shoppingArray = Object.values(snapshot.val()); // converting the snapshot object into an array
	for (let i = 0; i < shoppingArray.length; i++) {
		appendItemToList(shoppingArray[i]);
	}
});

addButton.addEventListener("click", function () {
	let inputValue = textInput.value;
	push(shoppingInDB, inputValue); // pushes the user input to DB into ref "Shopping"
	//appendItemToList(inputValue); // apends user input into HTML list REMOVING THIS AS IT WAS DUPLICATING VALUES keeping for later notes
	clearInputTextField();
});

function clearInputTextField() {
	// Clears the text field after item has been added to list
	textInput.value = "";
}

function appendItemToList(inputValue) {
	// apends user input into HTML list
	shoppingList.innerHTML += `<li>${inputValue}</li>`; // Adds input to list
}

//IMPORTANT need to clear list if changes are made in DB directly so it will re populate, this will not duplicate data now
function clearShoppingList() {
	shoppingList.innerHTML = "";
}

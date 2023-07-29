import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL: "https://realtime-database-47f04-default-rtdb.firebaseio.com/"
};

alert("Hi user!");
alert(
  "The firebase database trial has now expired so, even if you try to add anything to the cart, it won't be shown on the screen since the database no longer gives permission to the web app. Any suggestions/improvements are most welcomed."
);
if(window.confirm("Wanna contribute in the project?")){
  window.open("https://github.com/epsit03/add-to-cart");
  
const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let shoppingListArray = Object.entries(snapshot.val());
    clearShoppingListEl();
    for (let i = 0; i < shoppingListArray.length; i++) {
      let currentItem = shoppingListArray[i];
      // let currentItemID = currentItem[0];
      // let currentItemValue = currentItem[1];
      appendItemToShoppingListEl(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here...";
  }
});

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;
  if (inputValue === " ") {
    alert("Enter a valid string.");
  } else if (inputValue === "") {
    alert("Enter a valid string.");
  } else {
    push(shoppingListInDB, inputValue);
  }

  clearInputFieldEl();
  console.log(`${inputValue} added to database`);
});

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function appendItemToShoppingListEl(item) {
  // shoppingListEl.innerHTML += `<li>${itemValue}</li>`;
  let itemID = item[0];
  let itemValue = item[1];
  let newEl = document.createElement("li");

  newEl.textContent = itemValue;

  newEl.addEventListener("dblclick", function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);

    remove(exactLocationOfItemInDB);
  });

  shoppingListEl.append(newEl);
}

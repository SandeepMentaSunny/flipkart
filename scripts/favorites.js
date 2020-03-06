import { RenderEmailList } from './modules/renderEmailList.js';

//Global variables
let favoriteEmails = [];
let emailList = document.querySelector(".email-list");
const apiUrl = "https://flipkart-email-mock.now.sh/";

document.addEventListener("DOMContentLoaded", () => {
  if (window.sessionStorage.length > 0) {
    favoriteEmails = JSON.parse(window.localStorage.getItem("favorites"));
    RenderEmailList(favoriteEmails, emailList);
  }
});

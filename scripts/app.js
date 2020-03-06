import { FetchEmails } from "./modules/fetchEmails.js";
import { RenderEmailList } from './modules/renderEmailList.js';
import { fetchEmailBody } from './modules/fetchEmailBody.js';
import { toggleClassesForEmailList } from './modules/toggleCssClasses.js';
import { generateEmailBody } from './modules/renderEmailBody.js';
import { renderPagination } from './modules/renaderPagination.js';

let apiParamsOnLoad = {
  pageNumber: 1
};
const apiUrl = "https://flipkart-email-mock.now.sh/";
let emailList = document.querySelector(".email-list");
let totalEmails = [];
let emailsContent = [];
let favoriteEmails = new Set();
let emailListContent = '';

//Call fetchEmails function on document loaded
document.addEventListener("DOMContentLoaded", e => {
  let data = FetchEmails(apiParamsOnLoad, apiUrl);
  data.then(res => {
      const { list, total } = res;
      totalEmails = list;
      const data = RenderEmailList(totalEmails, emailList);
      emailListContent = data[`emailListContent`];
      emailsContent = data[`emailsContent`];
      addClickEventToEmail(emailsContent);
      renderPagination(total, list.length, apiParamsOnLoad, apiUrl);
  }).catch(err => console.log(err));
});

function addClickEventToEmail(emails) {
  if (emails.length > 0) {
    for (let email of emails) {
      email.addEventListener(
        "click",
        event => {
          event.currentTarget.classList.add("active");
          const id = event.currentTarget.getAttribute("data-id");
          toggleClassesForEmailList(emails, id);
          let emailBody = fetchEmailBody(id, apiUrl);
          emailBody.then((res) => generateEmailBody(res, totalEmails, emailListContent, emailsContent)).catch(err => console.error(err));
        },
        true
      );
    }
  }
}

function addClickEventToFavourite() {
  const favoriteButtons = document.querySelectorAll(".favorite-btn");
  for (let favorite of favoriteButtons) {
    favorite.addEventListener(
      "click",
      event => {
        event.stopPropagation();
        favoriteEmails.add(event.target.getAttribute("data-id"));
      },
      false
    );
  }
}

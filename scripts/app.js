import { FetchEmails } from "./modules/fetchEmails.js";
import { RenderEmailList } from './modules/renderEmailList.js';
import { fetchEmailBody } from './modules/fetchEmailBody.js';
import { toggleClassesForEmailList } from './modules/toggleCssClasses.js';
import { generateEmailBody } from './modules/renderEmailBody.js';
import { RenderShimmerEmail, toggleClassOnShimmer } from './modules/RenderShimmerEmail.js';
import { addEventListenersToBtn, previousButtonHandlerFunction, nextButtonHandlerFunction } from './modules/AddEventListeners.js';
let apiParamsOnLoad = {
  pageNumber: 1
};
const apiUrl = "https://flipkart-email-mock.now.sh/";
let emailList = document.querySelector(".email-list");
let totalEmails = [];
let emailsContent = [];
let favoriteEmails = new Set();
let emailListContent = '';
const shimmerGroup = document.querySelector('.shimmer-group');
let prevBtn, nextBtn, paginationText;

//Call fetchEmails function on document loaded
document.addEventListener("DOMContentLoaded", e => {
  const shimmer = RenderShimmerEmail(10, shimmerGroup);
  toggleClassOnShimmer('add', shimmer);
  let data = FetchEmails(apiParamsOnLoad, apiUrl);
  data.then(res => {
      let { list, total } = res;
      totalEmails = list;
      const data = RenderEmailList(totalEmails, emailList);
      emailListContent = data[`emailListContent`];
      emailsContent = data[`emailsContent`];
      total = total > 10 ? Math.round(total/10) : total; 
      addClickEventToEmail(emailsContent);
      toggleClassOnShimmer('remove', shimmer);
      prevBtn = document.querySelector('.prev-btn');
      nextBtn = document.querySelector('.next-btn');
      paginationText = document.querySelector('.pagination-text');
      prevBtn.addEventListener('click', (e) => {
        previousButtonHandlerFunction(e, nextBtn, apiParamsOnLoad, apiUrl, paginationText, total);
      });
      nextBtn.addEventListener('click', (e) => {
        nextButtonHandlerFunction(e, prevBtn, apiParamsOnLoad, apiUrl, total, paginationText);
      });
      prevBtn.setAttribute('disabled', true);
  }).catch(err => console.log(err));
});

function addClickEventToEmail(emails) {
  if (emails.length > 0) {
    for (let email of emails) {
      email.addEventListener(
        "click",
        event => {
          if (event.target.type !== 'submit') {
            event.currentTarget.classList.add("active");
            const id = event.currentTarget.getAttribute("data-id");
            toggleClassesForEmailList(emails, id);
            const emailBodyContent = document.querySelector('.email-body');
            let emailBody = fetchEmailBody(id, apiUrl);
            emailBody.then((res) => generateEmailBody(res, totalEmails, emailListContent, emailsContent, emailBodyContent.innerHTML.length === 0 ? 'firstEmail' : 'differentEmail')).catch(err => console.error(err));
          }else{
            addClickEventToFavourite(event.target);
          }
        },
        true
      );
    }
  }
}

function addClickEventToFavourite(favoriteButton) {
  // const favoriteEmail = totalEmails.filter(email => {
  //   if(email.id === favoriteButton.getAttribute('data-id')){
  //     return email;
  //   }
  // });
  // favoriteEmails.add(favoriteEmail);
  addEventListenersToBtn(favoriteButton, totalEmails);
  console.log(favoriteEmails);
}

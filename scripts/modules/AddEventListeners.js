
import { FetchEmails } from "./fetchEmails.js";
import { RenderEmailList } from "./renderEmailList.js";
import { RenderShimmerEmail, toggleClassOnShimmer } from './RenderShimmerEmail.js';
import { toggleClassesForEmailList } from './toggleCssClasses.js';
import { fetchEmailBody } from './fetchEmailBody.js';
import { generateEmailBody } from './renderEmailBody.js';

let favoriteEmails = new Set();
let shimmerGroup = document.querySelector('.shimmer-group');
let emailList = document.querySelector(".email-list");

export function addEventListenersToBtn(emailBodyFavoriteBtn, totalEmails) {
  if (emailBodyFavoriteBtn) {
    emailBodyFavoriteBtn.addEventListener("click", e => {
      const id = e.target.getAttribute("data-id") || -1;
      e.target.innerText =
        e.target.innerText === "Mark as favorite"
          ? "Added"
          : "Mark as favorite";
      totalEmails.forEach(email => {
        if (email.id === id) {
          favoriteEmails.add(email);
          email.favorite = true;
          if (window.localStorage.length > 0) {
            let localStorage = JSON.parse(
              window.localStorage.getItem("favorites")
            );
            const data = [...favoriteEmails];
            localStorage.push(data);
            window.localStorage.setItem("favorites", JSON.stringify(data));
          } else {
            const localStorageData = [...favoriteEmails];
            window.localStorage.setItem(
              "favorites",
              JSON.stringify(localStorageData)
            );
          }
        }
      });
    });
  }
}

export function nextButtonHandlerFunction(nextBtn, prevBtn, apiParams, apiUrl, totalPages, paginationNode) {
  let emailListContent, emailsContent, totalEmails;
  apiParams.pageNumber += 1;
  if (totalPages === apiParams.pageNumber) {
    nextBtn.target.setAttribute("disabled", true);
    prevBtn.disabled = false;
  } else {
    nextBtn.target.setAttribute("disabled", false);
  }
  const shimmer = RenderShimmerEmail(5, shimmerGroup);
  toggleClassOnShimmer('add', shimmer);
  emailList.innerHTML = '';
  FetchEmails(apiParams, apiUrl).then(res => {
    const { list, total } = res;
    totalEmails = list;
    toggleClassOnShimmer('remove', shimmer);
    const data = RenderEmailList(totalEmails, emailList);
    emailListContent = data[`emailListContent`];
    emailsContent = data[`emailsContent`];
    addClickEventToEmail(emailsContent, apiUrl, totalEmails, emailListContent);
    paginationNode.innerText = `${apiParams.pageNumber} of ${totalPages}`;
  }).catch(err => console.log(err));
}

export function previousButtonHandlerFunction(prevBtn, nextBtn, apiParams, apiUrl, paginationNode, totalPages) {
  let totalEmails;
  if (apiParams.pageNumber === 1) {
    prevBtn.target.disabled = true;
  } else {
    apiParams.pageNumber = apiParams.pageNumber - 1;
    prevBtn.target.setAttribute('disabled', true);
    nextBtn.disabled = false;
  }
  const shimmer = RenderShimmerEmail(10, shimmerGroup);
  toggleClassOnShimmer('add', shimmer);
  emailList.innerHTML = '';
  FetchEmails(apiParams, apiUrl).then(res => {
    const { list, total } = res;
    totalEmails = list;
    toggleClassOnShimmer('remove', shimmer);
    const data = RenderEmailList(totalEmails, emailList);
    emailListContent = data[`emailListContent`];
    emailsContent = data[`emailsContent`];
    addClickEventToEmail(emailsContent, apiUrl, totalEmails, emailListContent);
  }).catch(err => console.log(err));
  paginationNode.innerText = `${apiParams.pageNumber} of ${totalPages}`;
}

function addClickEventToEmail(emails, apiUrl, totalEmails, emailListContent) {
  if (emails.length > 0) {
    for (let email of emails) {
      email.addEventListener(
        "click",
        event => {
          event.currentTarget.classList.add("active");
          const id = event.currentTarget.getAttribute("data-id");
          toggleClassesForEmailList(emails, id);
          let emailBody = fetchEmailBody(id, apiUrl);
          emailBody.then((res) => generateEmailBody(res, totalEmails, emailListContent, emails, 'firstEmail')).catch(err => console.error(err));
        },
        true
      );
    }
  }
}

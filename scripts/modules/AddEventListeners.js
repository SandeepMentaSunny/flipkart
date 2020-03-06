import { FetchEmails } from "./fetchEmails.js";
import { RenderEmailList } from "./renderEmailList.js";

let favoriteEmails = new Set();
let prevBtnHandler = '';
let nextBtnHandler = '';

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
            localStorage = data;
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

export function nextButtonHandlerFunction(nextBtn, apiParams, apiUrl, totalPages) {
  nextBtnHandler = nextBtn;
  nextBtn.addEventListener("click", e => {
    apiParams.pageNumber += 1;
    if (totalPages === apiParams.pageNumber) {
      e.target.setAttribute("disabled", true);
      previousButtonHandlerFunction(prevBtnHandler, apiParams, apiUrl);
    } else {
      e.target.setAttribute("disabled", false);
    }
    FetchEmails(apiParams, apiUrl);
  });
}

export function previousButtonHandlerFunction(prevBtn, apiParams, apiUrl) {
  prevBtnHandler = prevBtn;
  prevBtn.addEventListener("click", e => {
    if (apiParams.pageNumber === 1) {
      e.target.disabled = true;
    } else {
      e.target.disabled = false;
    }
    FetchEmails(apiParams, apiUrl);
  });
}

import { nextButtonHandlerFunction, previousButtonHandlerFunction } from './AddEventListeners.js';

//GLOBAL VARIABLES
let prevButtonHandler = "";
let nextButtonHandler = "";

//Render Pagination
export function renderPagination(totalPages, currentLength, apiParamsOnLoad, apiUrl) {
    const pagination = document.querySelector(".pagination");
    const unOrderedList = document.createElement("ul");
    let total = Math.round(totalPages / currentLength);
    for (let i = 0; i <= total; i++) {
      const list = document.createElement("li");
      unOrderedList.appendChild(list);
    }
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    prevButton.classList.add("prev-btn");
    nextButton.classList.add("next-btn");
    const span = document.createElement("span");
    span.innerText = `${apiParamsOnLoad.pageNumber} of ${total}`;
    unOrderedList.children[0].appendChild(prevButton);
    unOrderedList.children[1].appendChild(span);
    unOrderedList.children[2].appendChild(nextButton);
    prevButton.innerHTML = "&#8249;";
    nextButton.innerHTML = "&#8250;";
    pagination.appendChild(unOrderedList);
    prevButtonHandler = document.querySelector(".prev-btn");
    nextButtonHandler = document.querySelector(".next-btn");
    if(apiParamsOnLoad.pageNumber === 1){
        prevButtonHandler.setAttribute('disabled', true);
    }
    nextButtonHandlerFunction(nextButtonHandler, apiParamsOnLoad, apiUrl, total);
    previousButtonHandlerFunction(prevButtonHandler, apiParamsOnLoad, apiUrl, total);
  }
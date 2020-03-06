import {
  createFromTag,
  createSubjectTag,
  convertTimeStampToTime
} from "./tags.js";
import { addEventListenersToBtn } from './AddEventListeners.js';
import { toggleClassOnShimmer } from './RenderShimmerEmail.js';

let emailBodyFavoriteBtn;
export function generateEmailBody(data, totalEmails, emailList, emailsContent, type) {
  if (data !== null) {
    let { id, body } = data;
    //   const fragment = document.createDocumentFragment();
    let emailBody = document.createElement("div");
    let emailBodyTag = document.querySelector(".email-body");
    if (emailBodyTag.innerHTML.length > 0) {
      emailBodyTag.innerHTML = "";
    }
    emailBody.classList.add("email-body-content");
    const emailHeaderTag = document.createElement("div");
    emailHeaderTag.classList.add("email-header");
    const senderIconTag = document.createElement("p");
    senderIconTag.classList.add("sender-icon", "small", "email-body-sender");
    const nameTag = document.createElement("span");
    nameTag.classList.add("name-tag");
    const timeTag = document.createElement("p");
    const favoriteTag = document.createElement("button");
    favoriteTag.classList.add("email-body-favorite-btn");
    const emailContain = totalEmails.filter(email => email.id === data.id);
    favoriteTag.innerText = emailContain[0].favorite
      ? "Added"
      : "Mark as favorite";
    favoriteTag.setAttribute("data-id", id);
    const email = totalEmails.filter(data => data.id === id);
    const { name } = email[0].from;
    nameTag.innerText = email[0].subject;
    senderIconTag.innerText = name[0].toUpperCase();
    timeTag.classList.add("email-body-timestamp");
    timeTag.innerText = convertTimeStampToTime(email[0].date);
    const emailContentTag = document.createElement("div");
    if (emailBodyTag.classList.contains("hide") && type === 'firstEmail') {
      emailBodyTag.classList.remove("hide");
      emailBodyTag.classList.add("show");
    } else if(type === 'firstEmail'){
      emailBodyTag.classList.add("hide");
      emailBodyTag.classList.remove("show");
    }
    emailContentTag.innerHTML = body;
    emailHeaderTag.appendChild(senderIconTag);
    emailHeaderTag.appendChild(nameTag);
    emailHeaderTag.appendChild(favoriteTag);
    emailHeaderTag.appendChild(timeTag);
    emailBody.appendChild(emailHeaderTag);
    emailBody.appendChild(emailContentTag);
    emailBodyTag.append(emailBody);
    emailBodyFavoriteBtn = document.querySelector(".email-body-favorite-btn");
    if (emailList.classList.contains("email-list")) {
      emailList.classList.remove("email-list");
      emailList.classList.add("minimize-email-list");
    }
    for (let emailContent of emailsContent) {
      emailContent.classList.remove("email");
      emailContent.classList.add("minimize-email");
    }
    addEventListenersToBtn(emailBodyFavoriteBtn, totalEmails);
  }
}

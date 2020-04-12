import {
  createFromTag,
  createSubjectTag,
  convertTimeStampToTime
} from "./tags.js";

let favoriteEmails = "";

export function RenderEmailList(emails, emailList) {
  if (window.localStorage.length > 0) {
    favoriteEmails = JSON.parse(localStorage.getItem("favorites"));
    favoriteEmails.forEach(favEmail => {
      let index = emails.findIndex(email => favEmail.id === email.id);
      emails[index] = favEmail;
    });
  }
  let fragment = document.createDocumentFragment();
  for (let emailData of emails) {
    const { from, id, date, subject, short_description } = emailData;
    const { email, name } = from;
    const favoriteBtnClass = emailData.favorite ? 'show' : 'hide';
    const emailElem = document.createElement("div");
    const leftPartEmail = document.createElement("div");
    leftPartEmail.setAttribute("class", "left-part-email");
    const rightPartEmail = document.createElement("div");
    rightPartEmail.setAttribute("class", "right-part-email");
    const senderIconTag = document.createElement("p");
    leftPartEmail.appendChild(senderIconTag);
    senderIconTag.setAttribute("class", "sender-icon");
    senderIconTag.innerText = name[0].toUpperCase();
    emailElem.setAttribute("class", "email");
    const favoriteTag = document.createElement("button");
    favoriteTag.innerText = emailData.favorite ? 'Added' : 'Mark as Favorite';
    // favoriteTag.setAttribute('class', emailData.favorite ? 'show' : 'hide');
    // favoriteTag.setAttribute('class', 'favorite-btn');
    favoriteTag.classList.add('favorite-btn', favoriteBtnClass);
    favoriteTag.setAttribute("data-id", id);
    favoriteTag.addEventListener('click', (e) => {
      if(e.innerText === 'Mark as Favorite'){
        dataLocalStorage(e);
      }else{
        dataLocalStorage(e);
      }
    });
    const fromTag = createFromTag(name, email, id);
    const subjectTag = createSubjectTag(subject, id);
    const descriptionTag = document.createElement("p");
    descriptionTag.classList.add("ellipsis", "description");
    descriptionTag.innerText = short_description;
    const dateTag = document.createElement("p");
    dateTag.innerText = convertTimeStampToTime(date);
    const listOfLastElements = document.createElement("ul");
    listOfLastElements.classList.add("bottom-content");
    const firstListElem = document.createElement("li");
    const secondListElem = document.createElement("li");
    firstListElem.appendChild(dateTag);
    secondListElem.appendChild(favoriteTag);
    listOfLastElements.appendChild(firstListElem);
    listOfLastElements.appendChild(secondListElem);
    emailElem.appendChild(leftPartEmail);
    emailElem.appendChild(rightPartEmail);
    emailElem.setAttribute("data-id", id);
    rightPartEmail.appendChild(fromTag);
    rightPartEmail.appendChild(subjectTag);
    rightPartEmail.appendChild(descriptionTag);
    rightPartEmail.appendChild(listOfLastElements);
    fragment.appendChild(emailElem);
  }
  emailList.appendChild(fragment);
  const emailsContent = document.querySelectorAll(".email");
  //   addClickEventToEmail(emailsContent);
  //   addClickEventToFavourite();
  return { emailListContent: emailList, emailsContent };
}

function dataLocalStorage(data){
  console.log(data);
}
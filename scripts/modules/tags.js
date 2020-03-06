export function createFromTag(name, email, index) {
  const paraTag = document.createElement("p");
  const spanTag = document.createElement("span");
  spanTag.setAttribute("class", "from-tag");
  spanTag.classList.add("from-tag", "ellipsis");
  paraTag.innerText = `From:`;
  spanTag.innerText = `${capitalize(name)} <${email}>`;
  paraTag.appendChild(spanTag);
  return paraTag;
}

export function createSubjectTag(subject, id) {
  const paraTag = document.createElement("p");
  const spanTag = document.createElement("span");
  spanTag.classList.add("subject", "ellipsis");
  paraTag.innerText = "Subject: ";
  spanTag.innerText = `${subject}`;
  paraTag.appendChild(spanTag);
  return paraTag;
}

export function convertTimeStampToTime(timestamp) {
  return new Date(timestamp).toLocaleString();
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

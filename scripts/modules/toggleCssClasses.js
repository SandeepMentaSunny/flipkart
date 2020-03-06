export function toggleClassesForEmailList(emails, id) {
  const leftPartEmails = document.querySelectorAll(".left-part-email");
  const rightPartEmails = document.querySelectorAll(".right-part-email");
  for (let i = 0; i < leftPartEmails.length; i++) {
    leftPartEmails[i].classList.add("minimize-left-part-email");
    leftPartEmails[i].classList.remove("left-part-email");
    rightPartEmails[i].classList.add("minimize-right-part-email");
    rightPartEmails[i].classList.remove("right-part-email");
  }
  if (id !== null) {
    for (let email of emails) {
      if (id === email.getAttribute("data-id")) {
        email.classList.add("active");
      } else {
        email.classList.remove("active");
      }
    }
  }
}

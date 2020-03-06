export async function fetchEmailBody(index, url) {
  if (index !== null) {
    let response = await fetch(`${url}?id=${index}`);
    if (response.ok) {
      let json = await response.json();
      return json;
    } else {
      throw new Error(response.status);
    }
  }
}

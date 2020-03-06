export async function FetchEmails(params, url) {
  let response = await fetch(`${url}?page=${params.pageNumber}`);
  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    throw new Error(response.status);
  }
}
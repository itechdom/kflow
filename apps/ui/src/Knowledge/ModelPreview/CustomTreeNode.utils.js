export const MIN_TEXT_LENGTH = 20;
export const MAX_TEXT_LENGTH = 70;

export function truncateText(text, maxLength) {
  //make copy of text to avoid mutation
  let mutatedText = text.slice();
  if (text.length > maxLength) {
    //create a non mutating version of the below line
    mutatedText = mutatedText.substring(0, maxLength) + "...";
  }
  return mutatedText;
}

export function isLargeText(text) {
  return text && text.length > MAX_TEXT_LENGTH;
}

export function isHttpLink(text) {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name and extension
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&amp;a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!urlPattern.test(text);
}

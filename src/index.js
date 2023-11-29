export function removeElements(xmlString, xmlElementsToRemove) {
  const regex = new RegExp(
    `(\\s*(${xmlElementsToRemove.map((e) => `<${e}>.*?</${e}>`).join("|")}))`,
    "gs",
  );
  return xmlString.replace(regex, "");
}

export function removeElementsMatching(xmlString, element, expression) {
  const elementRegex = new RegExp(`\\s*<${element}>.*?</${element}>`, "gs");
  const matchRegex = new RegExp(expression);
  return xmlString.replace(elementRegex, (match) => (matchRegex.test(match) ? "" : match));
}

export function replaceTagValue(xmlString, tag, oldValue, newValue) {
  return xmlString.replaceAll(`<${tag}>${oldValue}</${tag}>`, `<${tag}>${newValue}</${tag}>`);
}

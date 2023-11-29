export function removeElements(xmlString, xmlElementsToRemove) {
  const regex = new RegExp(
    `(\\s*(${xmlElementsToRemove.map((e) => `<${e}>.*?</${e}>`)}))`,
    "gs"
  );
  return xmlString.replace(regex, "");
}

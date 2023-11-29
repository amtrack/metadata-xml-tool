export function removeElements(xmlString, xmlElementsToRemove) {
  const regex = new RegExp(
    `(\\s*(${xmlElementsToRemove.map((e) => `<${e}>.*?</${e}>`).join("|")}))`,
    "gs"
  );
  return xmlString.replace(regex, "");
}

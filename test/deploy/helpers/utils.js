export async function getElement(page, selector) {
  return await page.$(selector);
}
export async function getAllElements(page, selector) {
  return await page.$$(selector);
}
export async function getNumberOfElements(page, selector) {
  const result = await page.$$(selector);
  return result.length;
}
export async function getElementAttribute(page, selector, attribute) {
  return await page.$eval(selector, el => el[attribute]);
}
export async function wait(ms) {
  return await new Promise(resolve => setTimeout(() => resolve(), ms));
}

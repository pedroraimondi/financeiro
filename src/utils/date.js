export function dateNowInString() {
  const dateNow = new Date();
  return `${dateNow.getUTCFullYear()}-${dateNow.getMonth() < 10 ? '0' + dateNow.getMonth() : dateNow.getMonth()}-${dateNow.getDate()}`
}
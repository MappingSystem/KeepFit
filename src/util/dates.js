// return a new date object from a non-standard
// date string. (dd/mm/yyyy) -> (mm/dd/yyyy)
export function parseDate (date) {
  const d = date.split('/')
  return new Date(d[1] + '/' + d[0] + '/' + d[2])
}

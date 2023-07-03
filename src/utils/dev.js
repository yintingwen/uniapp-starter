export function log (type, data) {
  if (import.meta.env.DEV) {
    console.log(`log:${type} -----------------------------------------------------------------------`)
    console.log(data)
  }
}
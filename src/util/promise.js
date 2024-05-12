export function createPromise () {
  let cResolve = null
  let cReject = null
  const promise = new Promise((resolve, reject) => {
    cResolve = resolve
    cReject = reject
  })
  promise.resolve = cResolve
  promise.reject = cReject
  return promise
}

export function wait(time) {
  const p = createPromise()
  setTimeout(p.resolve, time)
  return p
}

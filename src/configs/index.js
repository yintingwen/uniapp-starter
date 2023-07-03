export default (app) => {
  import.meta.glob('./*.js', { eager: true })
}
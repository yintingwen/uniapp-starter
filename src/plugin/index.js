const plugins = import.meta.glob('./*.js', { eager: true })

export const setupPlugin = {
  install(app) {
    Object.values(plugins).forEach((plugin) => plugin.default && plugin.default(app))
  }
}

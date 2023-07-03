const plugins = import.meta.glob('./*.js', { eager: true })

export default (app) => {
  Object.values(plugins).forEach(plugin => plugin.default && plugin.default(app))
}


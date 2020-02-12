const Storyblok = require('./Storyblok')

module.exports = function storyblokNuxtRoutes (moduleOptions) {
  const options = Object.assign({}, this.options.storyblok, moduleOptions)
  const storyblokClient = new Storyblok(options)

  this.nuxt.hook('generate:extendRoutes', async (routes) => {
    const dynamicRoutes = await storyblokClient.getRoutes()
    routes.push(...dynamicRoutes)
  })
}

module.exports.meta = require('../package.json')

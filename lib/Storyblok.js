const StoryblokClient = require('storyblok-js-client')

const removeTrailingSlash = str => str.replace(/\/$/, '')

class Storyblok {
  constructor (options) {
    this.client = new StoryblokClient({
      accessToken: options.accessToken
    })
    this.defaultLanguage = options.defaultLanguage
    this.contentTypes = options.contentTypes
    this.resolveLinks = options.resolveLinks
    this.resolveRelations = options.resolveRelations
    this.exclude = options.exclude
    this.routeRealPath = options.routeRealPath
    this.excludingFields = options.excludingFields
    this.params = {}
  }

  async getLanguages () {
    const { data } = await this.client.get('cdn/spaces/me/')
    const { space } = data

    return space.language_codes
  }

  getAllStoriesByLang (lang) {
    const params = Object.assign({}, this.params)

    if (this.contentTypes) {
      params['filter_query[component][in]'] = this.contentTypes
    }

    if (lang) {
      params.language = lang
    }

    if (this.resolveLinks) {
      params.resolve_links = this.resolveLinks
    }

    if (this.resolveRelations) {
      params.resolve_relations = this.resolveRelations
    }

    if (this.excludingFields) {
      params.excluding_fields = this.excludingFields
    }

    return this.client.getAll('cdn/stories', params)
  }

  getAllStoriesByDefaultLang () {
    return this.getAllStoriesByLang()
  }

  async getAllStories () {
    let stories = await this.getAllStoriesByDefaultLang()
    let all = stories

    const languages = await this.getLanguages()
    for (const lang of languages) {
      stories = await this.getAllStoriesByLang(lang)
      all = [
        ...all,
        ...stories
      ]
    }

    return all
  }

  async getRoutes () {
    const stories = await this.getAllStories()

    let routes = stories.map((story) => {
      const lang = (story.lang === 'default' && this.defaultLanguage) ? `/${this.defaultLanguage}` : ''
      const slug = removeTrailingSlash((this.routeRealPath && story.path) ? story.path : story.full_slug)

      return {
        route: `${lang}/${slug}`,
        payload: story
      }
    })

    if (this.exclude) {
      routes = routes.filter(({ route }) => {
        if (Array.isArray(this.exclude)) {
          return this.exclude.every(pattern => !new RegExp(pattern).test(route))
        } else {
          return !new RegExp(this.exclude).test(route)
        }
      })
    }

    return routes
  }
}

module.exports = Storyblok

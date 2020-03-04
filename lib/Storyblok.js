const StoryblokClient = require('storyblok-js-client')

class Storyblok {
  constructor (options) {
    this.client = new StoryblokClient({
      accessToken: options.accessToken
    })
    this.defaultLanguage = options.defaultLanguage
    this.contentTypes = options.contentTypes
    this.resolveLinks = options.resolveLinks
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
      params.starts_with = `${lang}/*`
    }

    if (this.resolveLinks) {
      params.resolve_links = this.resolveLinks
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

    const routes = stories.map((story) => {
      const lang = (story.lang === 'default' && this.defaultLanguage) ? `/${this.defaultLanguage}` : ''

      return {
        route: `${lang}/${story.full_slug}`,
        payload: story
      }
    })

    return routes
  }
}

module.exports = Storyblok

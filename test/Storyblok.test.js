jest.setTimeout(60000)

const StoryblokClient = require('../lib/Storyblok')

const moduleOptions = {
  accessToken: 'XHWCNQHaH0jB9o0nQaHmlwtt',
  defaultLanguage: 'en',
  contentTypes: 'page'
}

const Storyblok = new StoryblokClient(moduleOptions)

describe('getLanguages function', () => {
  test('getLanguages should return all language codes', async () => {
    const languages = await Storyblok.getLanguages()
    expect(languages.length).toBe(1)
    expect(languages[0]).toBe('de')
  })
})

describe('getAllStoriesByLang function', () => {
  test('getAllStoriesByLang() should return all stories in default language', async () => {
    const result = await Storyblok.getAllStoriesByLang()
    expect(result.length).toBe(1)
    expect(result[0].lang).toBe('default')
  })

  test('getAllStoriesByLang(\'de\') should return german translation of all stories', async () => {
    const result = await Storyblok.getAllStoriesByLang('de')
    expect(result.length).toBe(1)
    expect(result[0].lang).toBe('de')
  })
})

describe('getAllStories function', () => {
  test('getAllStories() should return all stories and all translations', async () => {
    const result = await Storyblok.getAllStories()
    expect(result.length).toBe(2)
  })
})

describe('getRoutes function', () => {
  test('getRoutes() should return a nuxt route configuration for all stories', async () => {
    const result = await Storyblok.getRoutes()
    expect(result.length).toBe(2)

    result.forEach((item) => {
      expect(item.route).toBeDefined()
      expect(item.payload).toBeDefined()

      const story = item.payload
      if (story.lang === 'default') {
        expect(item.route).toBe(`/${moduleOptions.defaultLanguage}/${story.full_slug}`)
      } else {
        expect(item.route).toBe(`/${story.full_slug}`)
      }
    })
  })
})

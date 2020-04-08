# storyblok-nuxt-routes
> Uses the [Storyblok JS Client](https://github.com/storyblok/storyblok-js-client) to get all stories and add them as routes for `nuxt generate`.

[![NPM Version](https://img.shields.io/npm/v/storyblok-nuxt-routes.svg)](https://www.npmjs.com/package/storyblok-nuxt-routes) [![NPM Downloads](https://img.shields.io/npm/dt/storyblok-nuxt-routes.svg)](https://www.npmjs.com/package/storyblok-nuxt-routes) [![GitHub license](https://img.shields.io/github/license/hpfahl/storyblok-nuxt-routes.svg)](https://github.com/hpfahl/storyblok-nuxt-routes/blob/master/LICENSE)

## Setup

- Add `storyblok-nuxt-routes` dev dependency using yarn or npm to your project
- Add `storyblok-nuxt-routes` to `buildModules` section of `nuxt.config.js`

```js
{
  buildModules: [
    ['storyblok-nuxt-routes', {
      accessToken: 'YOUR_ACCESS_TOKEN',
      defaultLanguage: 'YOUR_DEFAULT_LANGUAGE', // optional
      contentTypes: 'YOUR_CONTENT_TYPES_NUXT_SHOULD_GENERATE_ROUTES_FOR', // optional
      resolveLinks: 'url', // optional
      resolveRelations: 'page.author' // optional
    }],
  ]
}
```

### Options

#### `accessToken`

Your access token.

#### `defaultLanguage`

Your default language code.

Optional. If you have multiple languages, set defaultLanguage to the key of your Storyblok default language.

#### `contentTypes`

Your content types nuxt should generate routes for.

#### `resolveLinks`

The parameter resolveLinks will automatically resolve internal links of the multilink field type.
If the value is `story` the whole story object will be included.
If the value is `url` only uuid, id, name, path, slug, full_slug and url will be included.

#### `resolveRelations`

The parameter resolveRelations will automatically resolve relationships to other Stories of a multi-option or single-option field-type.
Provide the component name and the field key as comma separated string. The limit of resolved relationships is 100 Stories. Example: resolveRelations: 'page.author,page.categories'

## Usage

### nuxt.config.js

```javascript
export default {
  buildModules: [
    ['storyblok-nuxt-routes', {
      accessToken: '<YOUR_ACCESS_TOKEN>',
      defaultLanguage: 'en',
      contentTypes: 'page,news',
      resolveLinks: 'url',
      resolveRelations: 'page.author'  
    }]
  ],
  generate: {
    fallback: true,
    interval: 100
  }
}
```

### Now we can access the payload inside pages/_.vue like so:

```javascript
async asyncData ({ route, payload, app }) {
  if (payload) {
    return { story: payload }
  } else {
    const res = await app.$storyapi.get(`cdn/stories${route.path}`)
    return res.data
  }
}
```

## License

[MIT License](./LICENSE)

Copyright (c) Heiko Pfahl <hpfahl@gmail.com>

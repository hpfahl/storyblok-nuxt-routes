# storyblok-nuxt-routes
 Uses the [Storyblok Links API](https://www.storyblok.com/docs/Delivery-Api/Links) to get all links and add them as routes for `nuxt generate`.

[![NPM Version](https://img.shields.io/npm/v/storyblok-nuxt-routes.svg)](https://www.npmjs.com/package/storyblok-nuxt-routes) [![NPM Downloads](https://img.shields.io/npm/dt/storyblok-nuxt-routes.svg)](https://www.npmjs.com/package/storyblok-nuxt-routes) [![GitHub license](https://img.shields.io/github/license/hpfahl/storyblok-nuxt-routes.svg)](https://github.com/hpfahl/storyblok-nuxt-routes/blob/master/LICENSE)

## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the [npm registry](https://www.npmjs.com/).
Installation is done using the [`npm install`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally) command:

```sh
$ npm install storyblok-nuxt-routes
```

## API

```javascript
const getStoryblokRoutes = require('storyblok-nuxt-routes')
```

### getStoryblokRoutes(options)

Get Storyblok routes with the given `options`.

#### Options

`storyblok-nuxt-routes` accepts these properties in the options object.

##### accessToken

Your access token. This token allows you to access your content and can be generated in the Storyblok dashboard at app.storyblok.com.

## Usage

`nuxt.config.js`

```javascript
const getStoryblokRoutes = require('storyblok-nuxt-routes')

export default {
  generate: {
    subFolders: false,
    routes: getStoryblokRoutes({
      accessToken: '<YOUR_ACCESS_TOKEN>'
    })
  }
}
```

## Todo

- [ ] Testing
- [ ] more more more?

## License

[MIT](LICENSE)

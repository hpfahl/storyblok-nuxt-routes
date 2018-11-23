const axios = require('axios');

let accessToken

async function fetchStoryblokLinks ({ page = 1, limit = 100 }) {
  const requestOptions = {
    params: {
      token: accessToken,
      page,
      per_page: limit
    }
  }
  return axios.get('https://api.storyblok.com/v1/cdn/links', requestOptions)
}

async function fetchAllStoryblokLinks () {
  const limit = 100
  const { headers, data } = await fetchStoryblokLinks({ page: 1, limit })
  const totalNumOfPages = Math.ceil(headers.total / limit)
  const links = Object.values(data.links)

  if (totalNumOfPages > 1) {

    // Since we know the total number of pages we now can pregenerate all requests we need to get all Links
    const linkRequests = []
    for (let page = 2; page <= totalNumOfPages; page++) {
      linkRequests.push(fetchStoryblokLinks({ page, limit }))
    }

    // Perform multiple concurrent link requests
    const results = await Promise.all(linkRequests)
    results.forEach(({ data }) => {
      links.push(...Object.values(data.links))
    })
  }

  return links
}

function getStoryblokRoutes (options) {
  return async function() {
    accessToken = options.accessToken

    const routes = []

    const links = await fetchAllStoryblokLinks()
    links.forEach(link => {
      if (!link.is_folder) {
        routes.push({
          route: `/${link.slug}`,
          payload: null
        })
      }
    })

    return routes
  }
}

module.exports = getStoryblokRoutes;

const lib = require('../lib');

test('get routes', async function() {
  const getStoryblokRoutes = lib({
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
    languages: ['de', 'en']
  });
  const routes = await getStoryblokRoutes();
  expect(routes && routes.length > 0).toBeTruthy();
});
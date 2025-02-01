export default () => ({
  port: parseInt(process.env.PORT!, 10) || 4000,
  searchApiUrl: process.env.SEARCH_API_URL,
});

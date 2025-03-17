const path = require("path");

module.exports = (request, options) => {
  return options.defaultResolver(request, {
    ...options,
    paths: [path.resolve(__dirname, "src")],
  });
};

// config-overrides.js
module.exports = function override(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      console: false,
    };
    return config;
  };
  
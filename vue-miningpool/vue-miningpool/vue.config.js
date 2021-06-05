module.exports = {
  pluginOptions: {
    devServer: {
      overlay: {
        warnings: true,
        errors: true
      }
    },
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};

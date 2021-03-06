// Inside vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/pwa" : "",
  // ...other vue-cli plugin options...
  pwa: {
    name: "My App",
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",

    // configure the workbox plugin
    workboxPluginMode: "InjectManifest",
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      // production 要注入的service-worker.js , dev 不會管這個設定
      swSrc: "public/sw.js",
      // ...other Workbox options...
    },
  },
};

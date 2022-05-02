let mix = require("laravel-mix");
const path = require("path");
const tailwindCss = require("tailwindcss");

mix.setPublicPath(path.normalize("dist/"));
mix.setResourceRoot("dist/");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("assets/js/app.js", "dist/js");

mix.sass("assets/sass/app.scss", "dist/css");
mix.sass("assets/sass/tailwind.scss", "dist/css");

mix.options({
  processCssUrls: true,
  postCss: [tailwindCss("tailwind.config.js")],
});

mix.extract();

if (mix.inProduction()) {
  mix.options({
    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  });

  mix.version();
} else {
  mix.webpackConfig({ devtool: "inline-source-map" }).sourceMaps();
}

mix.disableNotifications();

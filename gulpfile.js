process.env.DISABLE_NOTIFIER = true

var elixir = require('laravel-elixir')

    elixir.config.sourcemaps = false;

elixir(function (mix) {
  mix.less('index.less')
  .browserify('index.js')
  .copy('config.json', 'public/config.json')
  .copy('cheats', 'public/cheats')
  .copy('resources/assets/views/index.html', 'public/index.html')
  .copy('resources/assets/img', 'public/img')
  .copy('resources/assets/fonts', 'public/fonts/roboto')
  .copy('node_modules/semantic-ui/src/themes/default/assets/fonts', 'public/fonts/semantic')
})

/*
| Laravel Spark Cheat Sheet - A quick reference cheat sheet for Laravel Spark.
|
|
|
|               /|             Laravel Spark
|             /  |             __  __ __    ___   ____  ______
|           /    |            /  ]|  |  |  /  _] /    ||      |
|         /      |           /  / |  |  | /  [_ |  o  ||      |
|       /        |          /  /  |  _  ||    _]|     ||_|  |_|
|     /        __|_______  /   \_ |  |  ||   [_ |  _  |  |  |
|   /                  /   \     ||  |  ||     ||  |  |  |  |
| /___________       /      \____||__|__||_____||__|__|__|__|
|       |          /        / ___/|  |  |  /  _]  /  _]      |
|      _|        /         (   \_ |  |  | /  [_  /  [_|      |
|    /  |      /            \__  ||  _  ||    _]|    _]_|  |_|
|    \ _| _  / _ _          /  \ ||  |  ||   [_ |   [_  |  |
|       |  /      _\/       \    ||  |  ||     ||     | |  |
|       |/                   \___||__|__||_____||_____| |__|
|
|
|
| This project was released under MIT license.
|
| @link      http://websemantics.ca
| @author    Web Semantics, Inc. Dev Team <team@websemantics.ca>
| @author    Adnan M.Sagar, PhD. <adnan@websemantics.ca>
└ */

window.Isotope = require('isotope-layout');
window.jQuery = window.$ = require('jquery');
window.Handlebars = require('handlebars');
window.Bragit = require('bragit');

require('google-code-prettify/bin/prettify.min');
require('jquery-highlight');
require('semantic-ui/dist/components/checkbox');
require('semantic-ui/dist/components/sidebar');
require('semantic-ui/dist/components/sticky');
require('semantic-ui/dist/components/tab');
require('semantic-ui/dist/components/visibility');

Bragit.defaults({ css: {ignore: true}});

$(function () {
  var isotope;
  var lights = true;
  var comments = true;
  var url = 'cheats/';
  var config = 'config.json';
  var colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey'];
  var templates = ['<div class="column {{id}}"><div class="ui clearing segment">\
                      <div class="header"><i class="right floated {{icon}} icon"></i>\
                      {{title}}</div>\
                      <div class="ui divider"></div>\
                      <pre class="prettyprint lang-{{lang}}">{{content}}</pre>\
                    </div></div>', '<div data-filter=".{{id}}" class="ui {{color}} inverted tiny basic button">{{title}}</div>',
                    '<a class="ui labeled mini button github-{{repository}}-stars">\
                        <div class="ui  mini button"> <i class="star icon"></i> Stars </div>\
                        <div class="ui basic  left pointing label"> <i class="spinner loading icon"></i> </div>\
                    </a>\
                    <a class="ui  mini button github-{{repository}}-github"> <i class="github icon"></i> Github </a>'];


  var template = Handlebars.compile(templates[0]);
  var button = Handlebars.compile(templates[1]);
  var bragit = Handlebars.compile(templates[2]);

  /**
   * Called when the config file is loaded.
   *
   * @param {cheats} json object contains list of cheats files and other configs
   * @return {void}
   */
  function onConfigLoad(cheats) {

    lights = cheats.lights;
    comments = cheats.comments;

    /* Make repository compatible with Bragit, */
    cheats.repository = cheats.repository.replace('/', '-');

    $('.cheats-title').text(cheats.title);

    /* load all cheats.files */
    $.when.apply(this, cheats.files.map(function (cheat) {
      return $.get(url + cheat.name);
    })).then(function () {
      var args = cheats.files.length > 1 ? arguments : [arguments];
      for (var i in cheats.files) {
        var cheat = cheats.files[i];
        cheat.content = args[i][0];
        cheat.id = cheat.name.slice(0, -4);
        cheat.color = colors[i % 13];
        $('#contentor').append(template(cheat));
        $('.filtros').append(button(cheat));
      }
      /* $('.item.bragit').append(bragit(cheats)); TODO */
      onCheatsLoad();
    });
  }

  /**
   * Called when all cheat files are fully loaded
   *
   * @return {void}
   */
  function onCheatsLoad() {
    $('.toc .ui.sticky').sticky({ context: $('.pusher > .full.height') });
    $('#toc').sidebar('attach events', '.launch.button, .view-ui, .launch.item');

    isotope = new Isotope('#contentor', {
      itemSelector: '.ui.grid .column'
    });

    prettyPrint();
    setupEvents();
    toggleComments();
    toggleLights();
    /* Bragit.init();  TODO */
  }

  /**
   * Setup events
   *
   * @return {void}
   */

  function setupEvents() {
    /* Dismiss search highlights */
    $(document).click(function (e) {
      $('body').unhighlight();
    });

    /* Highlight search terms when search button is clicked */
    $('.search-btn').click(function (event) {
      event.stopPropagation();
      $('body').highlight($('#sidebar-search').val());
    });

    /* Toggle buttons for light, comments and shuffles */
    $('.lights-toggle').checkbox().click(toggleLights);
    $('.comments-toggle').checkbox().click(toggleComments);
    $('.shuffle-toggle').checkbox().click(function () {
      isotope.shuffle();
    });

    /* Search when 'enter' key is pressed */
    $('.search-input').keypress(function (event) {
      event.stopPropagation();
      if (event.which == 13) {
        $('body .article').highlight($(this).val());
        return false;
      }
    });

    /* Filter on button clicks */
    $('.filtros .button').on('click', function () {
      var filterValue = $(this).attr('data-filter');
      $('#contentor')[filterValue === '*' ? 'removeClass' : 'addClass']('force-one');
      isotope.arrange({ filter: filterValue });
      prettyPrint();
    });
  }

  /**
   * Turn lights on / off
   *
   * @return {void}
   */

  function toggleLights() {
    $('#header-search')[lights ? 'removeClass' : 'addClass']('inverted');
    $('.main.menu')[lights ? 'removeClass' : 'addClass']('inverted');
    $('.article .ui.segment')[lights ? 'removeClass' : 'addClass']('inverted');
    $('.article')[lights ? 'removeClass' : 'addClass']('inverted');
    $('.ui.container')[lights ? 'removeClass' : 'addClass']('inverted');
    $('.lights-toggle label').html(lights ? '<i class="ui icon moon"></i>' : '<i class="ui icon sun"></i>');
    $('.logo')[lights ? 'show' : 'hide']();
    $('.logo-inverted')[lights ? 'hide' : 'show']();
    lights = !lights;
  }

  /**[comments ? 'show' : 'hide']
   * Turn comments on / off
   *
   * @return {void}
   */

  function toggleComments() {
    $('.comments-toggle label').html(comments ? '<i class="ui icon hide"></i>' : '<i class="ui icon unhide"></i>');
    $('span.com')[comments ? 'show' : 'hide']();
    isotope.arrange();
    comments = !comments;
  }

  /* Load config file*/
  $.ajax({
    url: config,
    dataType: 'json',
    success: onConfigLoad
  });
});

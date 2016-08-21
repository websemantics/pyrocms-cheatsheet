/*
| cheatsheet : Generic project template
|
| @link      http://websemantics.ca
| @author    Web Semantics, Inc. Dev Team <team@websemantics.ca>
| @author    Adnan M.Sagar, PhD. <adnan@websemantics.ca>
└ */

window.jQuery = window.$ = require('jquery')
window.Masonry = require('masonry-plus')
window.Handlebars = require('handlebars')
window.Prism = require('prismjs')
window.Gitters = require('gitters')
window.parse = require('markdown-html-ast').parse
window._ = require("underscore.string")

require('jquery-highlight')
require('prismjs/components/prism-php')
require('prismjs/components/prism-bash')
require('semantic-ui/dist/components/sidebar')
require('semantic-ui/dist/components/sticky')
require('semantic-ui/dist/components/checkbox')
require('semantic-ui/dist/components/tab')
require('semantic-ui/dist/components/visibility')

Gitters.defaults({
    clearOnStart: false,
})

$(function() {
    var masonry
    var lights = true
    var comments = true
    var icon = "file text outline"
    var title = "PyroCMS 3 Cheatsheets"
    var repo = 'websemantics/pyrocms-cheatsheet'
    var colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey']
    var segment = Handlebars.compile($("#segment-template").html())
    var button = Handlebars.compile($("#button-template").html())
    var bragit = Handlebars.compile($("#bragit-template").html())

    /**
     * Called when all cheat files are fully loaded
     *
     * @return {void}
     */
    function onCheatsheetsLoaded() {

        $('.toc .ui.sticky').sticky({
            ontext: $('.pusher > .full.height')
        })

        $('#slider').sidebar('attach events', '.launch.button, .view-ui, .launch.item')
            .sidebar('setting', {
                dimPage: false
            })

        masonry = new Masonry('.masonry', {
            'itemSelector': '.brick',
            columnWidth: '.brick'
        })

        /* SETUP EVENTS */

        /* Dismiss search highlights */
        $(document).click(function(e) {
            $('body').unhighlight()
        })

        /* Highlight search terms when search button is clicked */
        $('.search-btn').click(function(event) {
            event.stopPropagation()
            $('body').highlight($('#sidebar-search').val())
        })

        /* Toggle buttons for light, comments and shuffles */
        $('.lights-toggle').checkbox().click(toggleLights)
        $('.comments-toggle').checkbox().click(toggleComments)
        $('.shuffle-toggle').checkbox().click(function() {
            masonry.layout({
                shuffle: true
            })
        })

        /* Search when 'enter' key is pressed */
        $('.search-input').keypress(function(event) {
            event.stopPropagation()
            if (event.which == 13) {
                $('body .full.height').highlight($(this).val())
                return false
            }
        })

        /* Filter on button clicks */
        $('.filter .button').on('click', function() {
            var filterValue = $(this).data('filter')
            $('#content')[filterValue === '*' ? 'removeClass' : 'addClass']('force-one')
            masonry.layout({
                filter: filterValue
            })
        })

        toggleComments()
        toggleLights()
    }

    /**
     * Turn lights on / off
     *
     * @return {void}
     */

    function toggleLights() {
        $('#header-search')[lights ? 'removeClass' : 'addClass']('inverted')
        $('.main.menu')[lights ? 'removeClass' : 'addClass']('inverted')
        $('.full.height .ui.segment')[lights ? 'removeClass' : 'addClass']('inverted')
        $('.full.height')[lights ? 'removeClass' : 'addClass']('inverted')
        $('.ui.container')[lights ? 'removeClass' : 'addClass']('inverted')
        $('.lights-toggle label').html(lights ? '<i class="ui icon moon"></i>' : '<i class="ui icon sun"></i>')
        $('.ui.inverted.menu .svg.logo')[lights ? 'removeClass' : 'addClass']('inverted')
        lights = !lights
    }

    /**[comments ? 'show' : 'hide']
     * Turn comments on / off
     *
     * @return {void}
     */

    function toggleComments() {
        $('.comments-toggle label').html(comments ? '<i class="ui icon hide"></i>' : '<i class="ui icon unhide"></i>')
        $('span.token.comment')[comments ? 'show' : 'hide']()
        // Prism.highlightAll()
        masonry.layout()
        comments = !comments
    }

    /* change the title and read the cheatsheets from the project README.md */

    $('.cheats-title').text(title)

    Gitters.fetch(repo, 'README.md', function(file) {

        var elements = parse(file.content).children,
            cheatsheets

        elements.forEach(function(item, index, elements) {

            /* mark the chaetsheets section, and parse all the relevent headings / code elements */
            if (cheatsheets = cheatsheets ? item.element != 'h2' : item.element === 'h2' &&
                item.value === 'Cheatsheets') {
                  if(item.element === 'h3'){

                    var code = elements[index + 1]

                    var data = {
                      id: _.underscored(item.value),
                      title: item.value,
                      icon : icon,
                      lang: code.language,
                      color: colors[index % 13],
                      content: Prism.highlight(code.value, Prism.languages[code.language])
                    }

                    $('#content').append(segment(data))
                    $('.filter').append(button(data))
                  }
            }
        })

        /* $('.item.bragit').append(bragit(cheats)); TODO */
        setTimeout(onCheatsheetsLoaded,300);
    })
})

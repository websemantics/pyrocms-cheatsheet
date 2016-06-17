/*
| Factory - build site with `node ./lib/build.js` or `npm start`
|
|  _____   ____    __ ______   ___   ____   __ __
| |     | /    |  /  ]      | /   \ |    \ |  |  |
| |   __||  o  | /  /|      ||     ||  D  )|  |  |
| |  |_  |     |/  / |_|  |_||  O  ||    / |  ~  |
| |   _] |  _  /   \_  |  |  |     ||    \ |___, |
| |  |   |  |  \     | |  |  |     ||  .  \|     |
| |__|   |__|__|\____| |__|   \___/ |__|\_||____/
|
| This project was released under MIT license.
|
| @link      http://websemantics.ca
| @author    Web Semantics, Inc. Dev Team <team@websemantics.ca>
| @author    Adnan M.Sagar, PhD. <adnan@websemantics.ca>
└ */

'use strict'

var pkg = require('../../package.json')
var metalsmith = require('metalsmith')
var markdown = require('metalsmith-markdown')
var layouts = require('metalsmith-layouts')
var htmlmin = require('metalsmith-html-minifier')

metalsmith(__dirname + '/../..')
    .clean(false)
    .source(pkg.config.dir.html)
    .destination(pkg.config.dir.dist)
    .metadata(pkg)
    .use(layouts({
        'engine': 'handlebars',
        'default': 'layout.html',
        'directory': pkg.config.dir.templates,
        'partials': pkg.config.dir.partials
    }))
    .use(markdown())
    .use(htmlmin())
    .build(function(err) {
        if (err) throw err
    })

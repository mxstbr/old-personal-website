# `Eternalpad`

One-off, device specific notes. Perfect for quickly jotting down shopping lists, phone numbers, license numbers, etc.

## How does it work

It saves the notes in localStorage and shows the saved notes when users open the webpage again. See `js/main.js`.

## Setup

1. Run `npm install` to install the dependencies.

2. Run `grunt` to start the local web server.

3. Go to `http://localhost:8000` and you should see the app running!

## CSS Structure

The CSS modules found in the `css` subfolders all get imported into the `main.css` file, which get inlined and minified into the `compiled.css` file. To add/change the styling, either write the CSS into the appropriate module or make a new one and `@import` it in the `main.css` file at the appropriate place.

### PostCSS

The boilerplate uses PostCSS, and includes a few plugins by default:

* `postcss-import`: Inlines `@import`ed stylesheets to create one big stylesheet.

* `postcss-simple-vars`: Makes it possible to use $variables in your CSS.

* `postcss-focus`: Adds a `:focus` selector to every `:hover`.

* `autoprefixer-core`: Prefixes your CSS automatically, supporting the last two versions of all major browsers and IE 8 and up.

* `cssnano`: Optimizes your CSS file. For a full list of optimizations check [the offical website](http://cssnano.co/optimisations/).

* `postcss-reporter`: Makes warnings by the above plugins visible in the console.

For a full, searchable catalog of plugins you can include go to [postcss.parts](http://postcss.parts).

### Folder Structure

The boilerplate comes with a basic folder structure to keep the CSS files organised. This is what the folders are for:

* `base`: Global styling, e.g. setting the box–model for all elements

* `components`: Component specific styling, e.g. buttons, modals,...

* `vendor`: External files, e.g. a CSS reset

## License

This project is licensed under the MIT license. For more information see `LICENSE.md`.
# Guinguette.js
The accordion plugin that smells good the french baguette

## Introduction

**Guinguette.js** is a lightweight accordion plugin written in ES6

- No dependencies required
- No extra files to download
- Simple API
- Keyboard navigation ready

## Documentation

### Install

Method      | Procedure
----------- | ---------
NPM         | `npm i guinguette`
Download    | [Download zip](https://github.com/agence-webup/guinguette/archive/master.zip)

Then guinguette have some css you will have to add (feel free to custom it for a better integration in your UI):

```html
<link rel="stylesheet" href="dist/guinguette.css">
```

Finally just link the guinguette's code at the end of your document:

```html
<script src="dist/guinguette.js"></script>
```

### Use

#### Instanciate new accordion
```js
var guinguette = new Guinguette(document.querySelector('[data-guinguette="container"]'))
```
First parameter is for your content's container.
Then you'll have to add `data-guinguette-title` and `data-guinguette-content` attributes to each section you want to become an accordion.
Like that for example:

```html
<div data-guinguette="container">
    <h2 data-guinguette-title>Wow Guinguette.JS is so usefull</h2>
    <div data-guinguette-content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    </div>
    <h2 data-guinguette-title>Why Guinguette.JS is so easy to setup</h2>
    <div data-guinguette-content>
        Sed ut elit facilisis, egestas quam a, ultrices lectus. Ut dictum sit amet lectus vel eleifend.
    </div>
</div>
```

####  Options

Option         | Default value | Description
-------------- | --------------| -------------
`autoCollapse` | `false`       | Open only one accordion at a time
`anchorOpen`   | `true`        | If a title's id match with a the URL's anchor, it'll be open by default

You can use it like that:
```js
var guinguette = new Guinguette(document.querySelector('[data-guinguette="container"]'), {
    autoCollapse: true
})
```

####  API

Name            | Description
--------------- | ---------------------
`expand(int)`   | Open an accordion
`collapse(int)` | Close an accordion
`expandAll()`   | Open all accordions
`collapseAll()` | Close all accordions

### Hack guinguette.js

1. Install dependencies with npm: `npm install`
2. Generate assets with `gulp`
2. Launch a local server that monitor changes with `gulp watch`
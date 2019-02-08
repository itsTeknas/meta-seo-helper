# Firebase Hosting META SEO helper
Very Lightweight, Meta Tags helper for SEO of SPA's. 
Adds meta tags for social media previews to the html page.
To be used in conjunction with Firebase hosting and Firebase functions, example below.

## Ideology
Google by itself is capable of executing javascript on the page for Content-Based SEO purposes, but a static SPA will still fail to render in social media link previews.

Solutions like Angular universal are utopian but still have a lot of caveats and "GOTCHAS". 
Some external libraries you like may heavily depend on DOM and the usage of `window`.

So the middle way out is: 
Just render the meta tags on the serverside, leave the rest to the browser.

## Installation

`npm install --save meta-seo-helper`

## Basic Usage

```javascript
const Template = require('meta-seo-helper').Template;

console.log(
  Template.fromFile(__dirname + '/index.html')
  .render()
  .withNameMetaTag({
    key: 'name1',
    content: 'value1'
  })
  .withNameMetaTags([{
    key: 'name2',
    content: 'value2'
  }])
  .withPropertyMetaTag({
    key: 'name3',
    content: 'value3'
  })
  .withPropertyMetaTags([{
    key: 'name4"',
    content: 'value4"'
  }])
  .withViewPortTag()
  .withDescriptionTag("Yolo")
  .withKeywordsTag(["star", "wars"])
  .withCustomTag("<isAwesome/>")
  .toHtml()
)
```

This will add the following tags to your html: 

```html
<meta name="name1" content="value1">
<meta name="name2" content="value2">
<meta property="name3" content="value3">
<meta property="name4" content="value4">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="Description" content="Yolo">
<meta name="keywords" content="star,wars">
<isAwesome/>
```



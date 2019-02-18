# Firebase Hosting meta tag SEO helper
Very Lightweight, Meta Tags helper for SEO of SPA's. 
Adds meta tags for social media previews to the html page.
To be used in conjunction with Firebase hosting and Firebase functions, example below.

## Previews
Facebook:
![Facebook][images/facebook.png]

Twitter:
![Twitter][images/twitter.png]

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

## Usage with firebase hosting

In `firebase.json`, add the following redirect to function when a route is called
```json
{
  "hosting": {
    ...
    "rewrites": [
      {
        "source": "/event/**",
        "function": "render"
      },
      ...
    ],
  },
  "functions": {
    "predeploy": [
      "ng build --prod",
      "cp dist/index.html functions/index.html"
    ]
  }
}
```

In firebase function `index.js`,

```javascript
const functions = require('firebase-functions');
var express = require('express');
const app = express();
const Template = require('meta-seo-helper').Template;
const indexTemplate = Template.fromFile(path.join(__dirname, 'index.html'));

app.get('/event/:eventid', (req, res, next) => {

  return new Promise((resolve, reject) => {
    // Get item specific information 

    return indexTemplate
      .render()
      .withDescriptionTag("Description")
      .withPropertyMetaTags([{
          key: 'og:title',
          content: event.name.substring(0, Math.min(35, event.name.length))
        },
        {
          key: 'og:type',
          content: "website"
        },
        ....
      ])
      .withNameMetaTags([{
          key: 'twitter:card',
          content: 'summary_large_image'
        },
        {
          key: 'twitter:site',
          content: '@blackcurrantapp',
        },
        {
          key: 'twitter:creator',
          content: '@it_teknas'
        }
      ])
      .withCustomTag(`<meta name="robots" content="index,nofollow">\n`)
      .toHtml();

  }).then(html => {
    res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
    res.send(html);
    return;
  }).catch(err => {
    res.send(err);
  })
});

exports.render = functions.https.onRequest(app);
```




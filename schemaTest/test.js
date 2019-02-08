let Template = require('../lib/index').Template;

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
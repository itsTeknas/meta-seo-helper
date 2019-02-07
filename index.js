'use strict'

const fs = require('fs')

var self = module.exports = {

  htmlString: undefined,

  fromHtml: (file) => {
    self.htmlString = fs.readFileSync(file).toString()
    return self
  },

  addHeader: (headers) => {
    if (!self.htmlString) throw new Error('set the html template first with .fromHtml()')
    self.htmlString = self.htmlString.replace('', '')
    return self
  },

  addCustomHeader: (string) => {
    if (!self.htmlString) throw new Error('set the html template first with .fromHtml()')
    self.htmlString = self.htmlString.replace('', '')
    return self
  },

  render: () => {
    if (!self.htmlString) throw new Error('set the html template first with .fromHtml()')
    return self.htmlString
  }
}

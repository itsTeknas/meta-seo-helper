"use strict";
import { readFileSync } from "fs";
export class Template {
    constructor(path) {
        this.replaceAt = "</head>";
        this.template = readFileSync(path).toString();
        this.htmlString = this.template;
    }
    withNameMetaTag(tags) {
        return this;
    }
    withNameMetaTags(tags) {
        return this;
    }
    withPropertyMetaTag(tag) {
        return this;
    }
    withPropertyMetaTags(tags) {
        return this;
    }
    withCustomTag(tag) {
        return this;
    }
    setReplaceAt(replace = "</head>") {
        this.replaceAt = replace;
    }
    render() {
        this.htmlString = this.template;
        return this;
    }
    toHtml() {
        return this.htmlString;
    }
}

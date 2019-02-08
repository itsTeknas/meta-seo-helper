"use strict";
import { readFileSync } from "fs";
/**
 * Template class that holds the html index file.
 * use {@link Template.constructor} to instantiate with a html file.
 */
export class Template {
    /**
     * Load the index.html file
     * @param path absolute path of the index.html file
     */
    constructor(path) {
        this.replaceAt = "</head>";
        this.template = readFileSync(path).toString();
        this.htmlString = this.template;
    }
    /**
     * Add a meta tag like <meta name="" content="">
     * @param tag {@link IMetaTag} name tag to add
     * @returns {@link Template}
     */
    withNameMetaTag(tag) {
        return this;
    }
    /**
     * Add a meta tags like <meta name="" content="">
     * @param tags {@link IMetaTag} name tags to add
     */
    withNameMetaTags(tags) {
        return this;
    }
    /**
     * Add a meta tags like <meta property="" content="">
     * @param tags {@link IMetaTag} property tag to add
     */
    withPropertyMetaTag(tag) {
        return this;
    }
    /**
     * Add a meta tags like <meta property="" content="">
     * @param tags {@link IMetaTag} property tags to add
     */
    withPropertyMetaTags(tags) {
        return this;
    }
    /**
     * Add a meta tags like <meta property="" content="">
     * @param tag string to append to the html head
     */
    withCustomTag(tag) {
        return this;
    }
    /**
     * Set where everything gets added, default is jusy before </head>
     * @param tag replace before string.
     */
    setReplaceAt(replace = "</head>") {
        this.replaceAt = replace;
        return this;
    }
    /**
     * Start the render process
     */
    render() {
        this.htmlString = this.template;
        return this;
    }
    /**
     * Return the rendered html string
     */
    toHtml() {
        return this.htmlString;
    }
}

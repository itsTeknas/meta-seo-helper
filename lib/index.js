"use strict";
import { readFileSync } from "fs";
/**
 * Template class that holds the html index file.
 * use Template.fromFile or Template.fromString to instantiate the class.
 */
export class Template {
    /**
     * private constructor
     * @param template template html string
     */
    constructor(template) {
        this.replaceAt = "</head>";
        this.template = template;
        this.metaReplaceWith = "";
    }
    /**
     * Load the index.html file
     * @param path absolute path of the index.html file
     */
    static fromFile(path) {
        const contents = readFileSync(path).toString();
        return new Template(contents);
    }
    /**
     * Load the index.html string as a template
     * @param template index.html template string
     */
    static fromString(template) {
        return new Template(template);
    }
    /**
     * Add a meta tag like <meta name="" content="">
     * @param tag Tag to add
     */
    withNameMetaTag(tag) {
        this.metaReplaceWith += `<meta name="${this.clean(tag.key)}" content="${this.clean(tag.content)}">\n`;
        return this;
    }
    /**
     * Add a meta tags like <meta name="" content="">
     * @param tags name tags to add
     */
    withNameMetaTags(tags) {
        tags.forEach((tag) => {
            this.metaReplaceWith += `<meta name="${this.clean(tag.key)}" content="${this.clean(tag.content)}">\n`;
        });
        return this;
    }
    /**
     * Add a meta tags like <meta property="" content="">
     * @param tags property tag to add
     */
    withPropertyMetaTag(tag) {
        this.metaReplaceWith += `<meta property="${this.clean(tag.key)}" content="${this.clean(tag.content)}">\n`;
        return this;
    }
    /**
     * Add a meta tags like <meta property="" content="">
     * @param tags property tags to add
     */
    withPropertyMetaTags(tags) {
        tags.forEach((tag) => {
            this.metaReplaceWith += `<meta property="${this.clean(tag.key)}" content="${this.clean(tag.content)}">\n`;
        });
        return this;
    }
    /**
     * Sets the <meta name="description" content="...">
     * desctiption tag with descriotion shortened to 155 characters
     * @param description description of the page
     */
    withDescriptionTag(description) {
        // tslint:disable-next-line:max-line-length
        this.metaReplaceWith += `<meta name="Description" content="${this.clean(description).substring(0, Math.min(155, description.length))}">\n`;
        return this;
    }
    /**
     * Sets <meta name="keywords" content="...">
     * keywords tag
     * @param keywords keywords to add to the page
     */
    withKeywordsTag(keywords) {
        this.metaReplaceWith += `<meta name="keywords" content="${keywords.join(",")}">\n`;
        return this;
    }
    /**
     * Adds Viewport Tag
     * <meta name="viewport" content="width=device-width, initial-scale=1.0">
     */
    withViewPortTag() {
        this.metaReplaceWith += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
        return this;
    }
    /**
     * Add a meta tags like <meta property="" content="">
     * @param tag string to append to the html head
     */
    withCustomTag(tag) {
        this.metaReplaceWith += `${tag}\n`;
        return this;
    }
    /**
     * Set where everything gets added, default is jusy before </head>
     * @param replace replace before string.
     */
    setReplaceAt(replace = "</head>") {
        this.replaceAt = replace;
        return this;
    }
    /**
     * Start the render process
     */
    render() {
        if (!this.template) {
            throw new Error("call constructor first with index.html file path.");
        }
        this.metaReplaceWith = "";
        return this;
    }
    /**
     * Return the rendered html string
     */
    toHtml() {
        if (!this.template) {
            throw new Error("call constructor first with index.html file path.");
        }
        return this.template.replace(this.replaceAt, this.metaReplaceWith);
    }
    /**
     * remove " and \n characters from the string
     * @param s string to clean
     */
    clean(s) {
        return s.replace(/["\n]/g, "");
    }
}

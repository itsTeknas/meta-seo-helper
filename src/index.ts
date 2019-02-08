"use strict";

import { readFileSync } from "fs";

/**
 * Generates a Meta link like <meta name="key" content="content">
 */

export interface IMetaTag {
  key: string;
  content: string;
}

/**
 * Template class that holds the html index file.
 * use {@link Template.constructor} to instantiate with a html file.
 */
export class Template {

  private htmlString: string;
  private template: string;
  private replaceAt = "</head>";

  /**
   * Load the index.html file
   * @param path absolute path of the index.html file
   */
  constructor(path: string) {
    this.template = readFileSync(path).toString();
    this.htmlString = this.template;
  }

  /**
   * Add a meta tag like <meta name="" content="">
   * @param tag Tag to add
   */
  public withNameMetaTag(tag: IMetaTag): Template {
    return this;
  }

  /**
   * Add a meta tags like <meta name="" content="">
   * @param tags name tags to add
   */
  public withNameMetaTags(tags: IMetaTag[]): Template {
    return this;
  }

  /**
   * Add a meta tags like <meta property="" content="">
   * @param tags property tag to add
   */
  public withPropertyMetaTag(tag: IMetaTag): Template {
    return this;
  }

  /**
   * Add a meta tags like <meta property="" content="">
   * @param tags property tags to add
   */
  public withPropertyMetaTags(tags: IMetaTag[]): Template {
    return this;
  }

  /**
   * Sets the <meta name="description" content="...">
   * desctiption tag with descriotion shortened to 155 characters
   * @param description description of the page
   */
  public withDescriptionTag(description: string): Template {
    return this;
  }

  /**
   * Sets <meta name="keywords" content="...">
   * keywords tag
   * @param keywords keywords to add to the page
   */
  public withKeywordsTag(keywords: string[]): Template {
    return this;
  }

  /**
   * Adds Viewport Tag
   * <meta name="viewport" content="width=device-width, initial-scale=1.0">
   */
  public withViewPortTag(): Template {
    return this;
  }

  /**
   * Add a meta tags like <meta property="" content="">
   * @param tag string to append to the html head
   */
  public withCustomTag(tag: string): Template {
    return this;
  }

  /**
   * Set where everything gets added, default is jusy before </head>
   * @param replace replace before string.
   */
  public setReplaceAt(replace: string = "</head>"): Template {
    this.replaceAt = replace;
    return this;
  }

  /**
   * Start the render process
   */
  public render(): Template {
    this.htmlString = this.template;
    return this;
  }

  /**
   * Return the rendered html string
   */
  public toHtml(): string {
    return this.htmlString;
  }
}

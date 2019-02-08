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
 * use Template.fromFile() or Template.fromString() to instantiate the class.
 */
export class Template {

  /**
   * Load the index.html file
   * @param path absolute path of the index.html file
   */
  public static fromFile(path: string): Template {
    const contents = readFileSync(path).toString();
    return new Template(contents);
  }

  /**
   * Load the index.html string as a template
   * @param template index.html template string
   */
  public static fromString(template: string): Template {
    return new Template(template);
  }

  private template: string;
  private replaceAt = "</head>";
  private metaReplaceWith: string;

  /**
   * private constructor
   * @param template template html string
   */
  private constructor(template: string) {
    this.template = template;
    this.metaReplaceWith = "";
  }

  /**
   * Add a meta tag like <meta name="" content="">
   * @param tag Tag to add
   */
  public withNameMetaTag(tag: IMetaTag): Template {
    this.metaReplaceWith += `<meta name="${this.clean(tag.key)}" content="${this.clean(tag.content)}">\n`;
    return this;
  }

  /**
   * Add a meta tags like <meta name="" content="">
   * @param tags name tags to add
   */
  public withNameMetaTags(tags: IMetaTag[]): Template {
    tags.forEach((tag) => {
      this.metaReplaceWith += `<meta name="${this.clean(tag.key)}" content="${this.clean(tag.content)}">\n`;
    });
    return this;
  }

  /**
   * Add a meta tags like <meta property="" content="">
   * @param tags property tag to add
   */
  public withPropertyMetaTag(tag: IMetaTag): Template {
    this.metaReplaceWith += `<meta property="${this.clean(tag.key)}" content="${this.clean(tag.content)}">\n`;
    return this;
  }

  /**
   * Add a meta tags like <meta property="" content="">
   * @param tags property tags to add
   */
  public withPropertyMetaTags(tags: IMetaTag[]): Template {
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
  public withDescriptionTag(description: string): Template {
    // tslint:disable-next-line:max-line-length
    this.metaReplaceWith += `<meta name="Description" content="${this.clean(description).substring(0, Math.min(155, description.length))}">\n`;
    return this;
  }

  /**
   * Sets <meta name="keywords" content="...">
   * keywords tag
   * @param keywords keywords to add to the page
   */
  public withKeywordsTag(keywords: string[]): Template {
    this.metaReplaceWith += `<meta name="keywords" content="${keywords.join(",")}">\n`;
    return this;
  }

  /**
   * Adds Viewport Tag
   * <meta name="viewport" content="width=device-width, initial-scale=1.0">
   */
  public withViewPortTag(): Template {
    this.metaReplaceWith += `<meta name="viewport" content="width=device-width, initial-scale=1.0">\n`;
    return this;
  }

  /**
   * Add a meta tags like <meta property="" content="">
   * @param tag string to append to the html head
   */
  public withCustomTag(tag: string): Template {
    // TODO: Validate Tag with regex
    this.metaReplaceWith += `${tag}\n`;
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
    if (!this.template) {
      throw new Error("call constructor first with index.html file path.");
    }
    this.metaReplaceWith = "";
    return this;
  }

  /**
   * Return the rendered html string
   */
  public toHtml(): string {
    if (!this.template) {
      throw new Error("call constructor first with index.html file path.");
    }
    return this.template.replace(this.replaceAt, (this.metaReplaceWith + this.replaceAt));
  }

  /**
   * remove " and \n characters from the string
   * @param s string to clean
   */
  private clean(s: string) {
    return s.replace(/["\n]/g, "");
  }
}

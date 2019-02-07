"use strict";

import { readFileSync } from "fs";

export interface IMetaTag {
  key: string;
  content: string;
}

export class Template {

  private htmlString: string;
  private template: string;
  private replaceAt = "</head>";

  constructor(path: string) {
    this.template = readFileSync(path).toString();
    this.htmlString = this.template;
  }

  public withNameMetaTag(tags: IMetaTag) {
    return this;
  }

  public withNameMetaTags(tags: IMetaTag[]) {
    return this;
  }

  public withPropertyMetaTag(tag: IMetaTag) {
    return this;
  }

  public withPropertyMetaTags(tags: IMetaTag[]) {
    return this;
  }

  public withCustomTag(tag: string) {
    return this;
  }

  public setReplaceAt(replace: string = "</head>") {
    this.replaceAt = replace;
  }

  public render() {
    this.htmlString = this.template;
    return this;
  }

  public toHtml() {
    return this.htmlString;
  }
}

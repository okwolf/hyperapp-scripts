import { h, text } from "hyperapp";

const mapChildren = child =>
  typeof child === "string" || typeof child === "number" ? text(child) : child;

export const __hyperapp_html = (tag, props, ...children) =>
  typeof tag === "function"
    ? tag(props, children)
    : h(tag, props || {}, children.map(mapChildren));

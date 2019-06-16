#!/usr/bin/env sugly
# setup environment, for example: the home page tile.
export * (load "./profile");

# create global document reference.
export html (import document from "$web");

const todo-list (html getElementById "todo-list");

(const create-item (=> text
  var span (html createElement "span");
  span "innerHTML", text;
  span "className", "todo-text";

  var li (html createElement "li");
  li "className", "todo-item";

  li appendChild span;
  todo-list insertBefore li, (todo-list firstChild);
).

html "title" app-title;
create-item "Tip: this item is created from sugly side.";

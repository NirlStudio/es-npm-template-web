#!/usr/bin/env sugly
# setup environment, for example: the home page tile.
export * (load "./profile");

# create global document reference.
export html (import document from "$web");

(const bind (=? ()
  (for el in (operation slice operand) (if (el is-a symbol)
    exposing: el, (var el (html getElementById (el key);
).

bind select-color, todo-color, todo-editor, todo-save, todo-list;

(todo-color "get-value" (= ()
  options item selectedIndex:: value;
).

(todo-color addEventListener "change", (=> ()
  var classes (select-color className:: split " ");
  classes -1, (todo-color get-value); # replace the last class (color).
  select-color "className" (classes join " ");
).

(todo-list "create-item" (=> (text, color)
  var p (html createElement "p");
  p "innerHTML", text;
  p "className", "todo-text";

  var article (html createElement "article");
  (article "className"
    'todo-item tile is-child notification $(color ?* "is-success")'
  ).

  article appendChild p;
  this insertBefore article, firstChild;
).

# bound to onclick event
(todo-save addEventListener "click", (=> ()
  var text (todo-editor value);
  (if (text is-empty)
    return (todo-editor focus);
  ).
  todo-editor "value" "";
  todo-list create-item text, (todo-color get-value);
).

html "title" app-title;
todo-list create-item "Tip: this item is created from sugly side.";

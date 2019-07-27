# this is a template module which can be loaded for many times.

# '<>' is a valid sugly symbol.
const <> (import html from "$redom");

# expand arguments into names.
var (text, color, ref) arguments;

(<> 'article.todo-item tile is-child message $(color ?* "is-success")'
  (<> "div.message-header"
    (<> "label.checkbox is-small"
      ref "completed" (<> "input", (@ type: "checkbox");
      ref ? " completed", "pinned";
    ).
    ref "delete" (<> "a.delete");
  ).
  (<> "div.message-body"
    text
  ).
).

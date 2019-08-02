# this is a template module which can be loaded for many times.

# select is an alias of vanilla el.querySelector
const (on, select, add-class, remove-class) (import "window");
# '<>' is a valid Espresso symbol.
const (<>, mount) (import (html, text, mount) from "$redom");

# generate an element instance for data.
(const render (=> data
  var (id, text, color, completed) data;
  var is-completable (if (id is-a number) "is-completable");
  (<> 'article.todo-item $(is-completable ?? "") tile is-child message $(color ?* "is-success")'
    (<> "div.message-header"
      (if is-completable
        (@
          (<> "label.checkbox is-small"
            (<> "input", (@ type: "checkbox", checked: (completed ?).
            " complete";
          ).
          (<> "a.delete")
        ).
      else
        (@
          (<> "label.is-small",
            "regular task"
          ).
          (<> "span.icon", (<> "i.mdi mdi-pin").
        ).
      ).
    ).
    (<> "div.message-body"
      text
    ).
).

(export todo-item (@:class type: emitter,
  constructor: (=> data
    # call super emitter's constructor
    (this as emitter, "constructor") "complete", "delete";
    # create view
    this "el" (render data);
    # apply dynamic logic
    var (id, completed) data;
    (if (id is-a number)
      update completed;
      -bind id;
    ).
  ).

  update: (=> completed
    var label (select el, "label.checkbox");
    (label childNodes:: item 1:: "nodeValue",
      completed ? ' completed at $(date of completed:: to-string "dt")', " complete";
    ).
    var message (select el, "div.message-body");
    (completed ? add-class, remove-class) message, "is-completed";
  ).

  -bind: (=> id
    var checkbox (select el, "label.checkbox > input");
    (on checkbox, "change", (=> this:_ (=>()
      _ emit "complete", (@:@ id, completed: (checkbox checked);
    ).
    (on (select el, "a.delete"), "click", (=> this:_ (=>()
      _ emit "delete", (@:@ id);
    ).
  ).

).

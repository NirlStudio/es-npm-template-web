# this is an extension module which exports nothing.

# import a system module.
const (bind, on) (import "window");
# import a native module.
const (mount, unmount) (import "$redom");
# import an app module.
const (api) (import "./api");

# bind a UI element to its id.
bind todo-list;

# attach a method to the UI element.
(todo-list "create-item" (=> data
  # populate data's memebers into variables.
  var (text, kind, id) data;
  # only receive refs if the item data have an id.
  var ref (if (id is-a number) (@:);
  var tile (load "./todo-item", (@ text, kind, ref);
  (if ref
    on-toggle (ref completed);
    on-click (ref delete), tile, id;
  ).
  mount this, tile, firstChild;
).

# event handler factory functions.
(var on-toggle (=> completed
  (on completed "change", (=> ()
    # TODO
  ).
).

(var on-click (=> (delete, tile, id)
  (on delete "click", (=> ()
    (api delete 'api/v1/todo/$id':: finally (=> ()
      unmount todo-list, tile;
    ).
  ).
).
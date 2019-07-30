# this is an extension module which exports nothing.

# import a system module.
const (bind, on) (import "window");
# import a native module.
const (mount, unmount) (import "$redom");
# import an app module.
const (api) (import "./api");
# import todo-item element class.
const (todo-item) (import "./todo-item");

# bind a UI element to its id.
bind todo-list;

# attach a method to the UI element.
(todo-list "create-item" (=> data
  # create HTML element.
  var tile (todo-item of data);
  # listen for events.
  tile on "complete", to-complete;
  tile on "delete", to-delete;
  # mount new element into doc.
  mount this, tile, firstChild;
).

# event handler factory functions.
(var to-complete (=> (args, tile)
  var (id, completed) args;
  (api put 'api/v1/todo/$id', (@:@ completed):: finally (=> waiting
    (if (waiting excuse:: is null)
      tile update (waiting result:: data:: completed);
    else
      log w "failed to update the todo entry for", (waiting excuse);
    ).
).

(var to-delete (=> (args, tile)
  (api delete 'api/v1/todo/$(args id)':: finally (=> ()
    (if (waiting excuse:: is null)
      unmount todo-list, tile;
    else
      log w "failed to delete the todo entry for", (waiting excuse);
    ).
).

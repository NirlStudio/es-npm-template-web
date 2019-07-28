#!/usr/bin/env sugly

# setup global environment.
# note: load and expose profile file into a global -profile is a suggestion.
#       but you can do anything that you think makes sense.
export -profile (load "./profile");

# import system module(s).
const (bind, document, select-all) (import "window");
# import native RE:DOM module.
const (unmount) (import "$redom");
# import app module(s).
const (api) (import "./api");

# initialize singleton components.
# use 'import' to make sure the modules are only loaded once.
import "./todo-editor";
import "./todo-list";

# try to update document (window) title.
document "title" (-profile app-title);

# as an example, to dynamically create an incompletable todo item.
bind todo-list;
todo-list create-item (@ text: "hint: this item is created from sugly side.");

# load & update existing todos from server.
(const reload-todos (=> ()
  (api get "/api/v1/todos":: finally (=> waiting
    (if (waiting excuse:: is-not null)
      # any non-null value indicating an error, e.g. false.
      return (log w "failed to load todos for", (waiting excuse);
    ).
    # use a more meaningful name for data.
    var items (waiting result:: data);
    (if (items is-not-an array)
      # varify result data. this could be much more complex in reality.
      return (log w "invalid result data:", items);
    ).
    # data seems ok for now. so
    # delete any existing todos to avoid duplicated entries.
    # of course, in real world, this should be an incremental operation.
    var tiles (select-all todo-list "article.is-completable");
    (for i in (0: (tiles length))
      unmount todo-list, (tiles item i);
    ).
    # re-insert reloaded todo entries.
    (for item in items (if (item is-not null)
      todo-list create-item item;
    ).
).

# load todos for the first time.
reload-todos;

# as an example, simply use a timer to do the refresh.
const refeshing-task (timer of 5000, reload-todos);
refeshing-task start;

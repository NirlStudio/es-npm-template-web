#!/usr/bin/env sugly

# setup global environment.
# note: load and expose profile file into a global -profile is a suggestion.
#       but you can do anything that you think makes sense.
export -profile (load "./profile");

# import system module(s).
const (bind, document) (import "window");

# import app module(s).
const (api) (import "./api");

# initialize singleton components.
# use 'import' to make sure the module is only load once.
import "./todo-editor";
import "./todo-list";

# try to update document (window) title.
document "title" (-profile app-title);

# as an example, to dynamically create a todo item.
bind todo-list;
todo-list create-item (@ text: "hint: this item is created from sugly side.");

# load existing todo list from server.
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
  # data seems ok for now.
  (for item in items (if (item is-not null)
    todo-list create-item item;
  ).
  #( When you working on the first version, you only need one line of code:
    for item in (waiting result:: data) (todo-list create-item item);
  # or
    waiting result:: data:: for-each (todo-list "create-item");
  )#
).

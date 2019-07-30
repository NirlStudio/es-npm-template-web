# this is an extension module which exports nothing.

# import a system module.
const (bind, on) (import "window");
# import a native module.
const (unmount) (import "$redom");
# import an app module.
const (api) (import "./api"); # or: const (*) (import "./api");

# bind some UI elements to their ids.
bind select-color, todo-color, todo-editor, todo-save, todo-list;

# declare a module-private method
(const get-color (=> ()
  todo-color options:: item (todo-color selectedIndex):: value;
).

# react with user chooses a different color.
(on todo-color "change", (=> ()
  # update input's border color to its current value.
  var classes (select-color className:: split);
  # assuming the last class indicating the color.
  classes -1, (get-color );
  # put the new class value back.
  select-color "className" (classes join);
).

# save new todo item to server.
(on todo-save "click", (=> ()
  # I'm not very sure, but it looks not too bad in this case.
  (if (var text (todo-editor value):: is-empty)
    return (todo-editor focus); # let user input something.
  ).
  # construct the data to be posted.
  var data (@ color: (get-color ), text);
  # (@:@ data) is a shortcut of (@ data: data)
  (api post "/api/v1/todo", (@:@ data):: finally (=> waiting
    # any excuse value, except null, indicating an error.
    (if (waiting excuse:: is-not null)
      return (log w "failed to create todo entry for", (waiting excuse);
    ).
    var item (waiting result:: data);
    (if (item is-not-an object)
      return (log w "invalid result data:", item);
    ).
    log i item;
    # clear input data since it has been saved.
    todo-editor "value" "";
    todo-list create-item item;
  ).
).

# re-export shell commands.
export * (load "sugly/profile");

# export an app shell command.
(export hello (= world
  print 'Hello, $(world ?* "World")';
).

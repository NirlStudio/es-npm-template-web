# re-export shell commands.
export * (load "sugly/profile");

# export an app shell command for testing purpose.
(export hello (= world
  print 'Hello, $(world ?* "World")';
).

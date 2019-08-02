# expose Espresso console resources to web.
# re-export shell commands.
export * (load "es/profile");

# export an app shell command for testing purpose.
(export hello (= world
  print 'Hello, $(world ?* "World")';
).

export app-title "A Better To-Do";

(-enable-console *, (@ web: (import "$web")):: finally (=()
  (print "Console shell is enabled.\
          tip: call input function [window.]_$('...') to interact with it."
  ).
).

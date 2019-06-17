export app-title "A Better To-Do";

# a bridge object to allow app expose inner state to console.
export exposing (@:@);

# enable JS console based shell for debugging purpose.
(-enable-console *, (@ .: exposing):: finally (=()
  (print "Console shell is enabled.\
          tip: call input function [window.]_$('...') to interact with it."
  ).
).

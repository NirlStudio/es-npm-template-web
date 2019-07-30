# app configuration
export app-title "A Better To-Do";

# api configuration
export api-url "http://localhost:6502";

# a bridge object to allow app expose inner state to console.
export exposing (@:@);

# enable JS console based shell for debugging purpose.
(-enable-console *, (@ _: exposing):: finally (=()
  (print "Console shell is enabled.\
          tip: call input function [window.]_$('...') to interact with it."
  ).
).

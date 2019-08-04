# this is a feature module which exports at least one member.

# import configuration from the app profile which is globally accessible.
# note: global variable is very likely bad, but reasonable sometimes.
const (api-url) -profile;

# the only & default member is named after the module name.
(export api (import "restful":: of
  (if (api-url not-empty) (@ baseURL: api-url).
).

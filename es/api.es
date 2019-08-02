# this is a feature module which exports at least one member.

# import configuration from the app profile which is globally accessible.
# note: global variable is very likely bad, but reasonable sometimes.
const (api-url) -profile;

# the only & default member is named after the module name.
(export api (import "$restful":: of (@
  baseURL: (api-url ?? "//localhost"),
  timeout: 30000,
  headers: (@
    Accept: "application/x-espresso;q=0.9, application/json; q=0.8,*/*;q=0.7"
  ).
).

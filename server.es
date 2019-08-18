const path (import "$path");
const connect (import call from "$connect");
const static (import call from "$serve-static");

(if (arguments contains "--api")
  const api (import "@eslang/npm-template-api/app");
  (if (api not-empty)
    api main;
  else
    log warning "api module is missing. argument '--api' is ignored.";
  ).
)

const app (connect:: generic);
app use (static (path resolve -app-home, "../dist/www");
(app listen 6503, (= ()
  print "Web server is running on 6503.";
).

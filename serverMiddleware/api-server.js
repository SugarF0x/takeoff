export default async (req, res, next) => {
  let url = req._parsedUrl.pathname.replace(/^\/+|\/+$|\.+/g, "");
  url = url.split("/");
  let controller = url[1];
  let method = url[2];
  if (controller && method) {
    try {
      let api = require("../api/" + controller);
      let result = await api[method](req);
      res.end(JSON.stringify(result));
    } catch (err) {
      res.end(JSON.stringify({result: 0, message: err.code}))
    }
  } else
    res.end(JSON.stringify({result: 0, message: 'Unresolved call'}))
};

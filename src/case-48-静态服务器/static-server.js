var http = require('http');
var fs = require('fs');
var url = require('url');
var port = process.argv[2];

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？');
  process.exit(1);
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true);
  var pathWithQuery = request.url;
  var queryString = '';
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'));
  }
  let path = parsedUrl.pathname;
  path = path === "/"?"/index.html":path;
  console.log(path)
  response.statusCode = 200;
  let string = fs.readFileSync(`public${path}`).toString();
  response.write(string);
  response.end();
});

server.listen(port);

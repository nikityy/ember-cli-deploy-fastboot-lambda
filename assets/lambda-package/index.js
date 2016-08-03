var path = require('path');
var FastBoot = require('fastboot');
var outputPath = 'fastboot-dist';
var appName = 'bustle';

var app = new FastBoot({
  distPath: 'fastboot-dist'
});

exports.handler = function(event, context) {
  var options = {
    request: {
      headers: event.headers || {},
      get: function() {}
    },
    response: {}
  };

  app.visit(event.path, options)
    .then(function (result) {
      return result.html();
    })
    .then(context.succeed)
    .catch(function() {
      context.fail(new Error('500 AWS Lambda Error'));
    });
};

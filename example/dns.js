var dns = require('dns');
var retry = require('../lib/retry');

function faultTolerantResolve(address, cb) {
  var operation = retry.operation();

  operation.try(function() {
    dns.resolve(address, function(err, addresses) {
      if (operation.retry(err)) {
        return;
      }

      cb(operation.mainError(), operation.errors(), addresses);
    });
  });
}

faultTolerantResolve('nodejs.org', function(err, errors, addresses) {
  console.log(err, errors, addresses);
});
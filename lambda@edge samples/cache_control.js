'use strict';

// Lambda function to set cache control public header in case of missing cache control header
exports.handler = (event, context, callback) => {
  const { response } = event.Records[0].cf;
  const { headers } = response;

  const headerCacheControl = 'Cache-Control';

  if (response.status === '200') {
    if (!headers[headerCacheControl.toLowerCase()]) {
      headers[headerCacheControl.toLowerCase()] = [{
        key: headerCacheControl,
        value: `no-store, max-age=0`,
      }];
    }
  }

  callback(null, response);
};

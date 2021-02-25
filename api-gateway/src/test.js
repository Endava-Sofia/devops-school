const AWSXRay = require('aws-xray-sdk-core');
const AWS = AWSXRay.captureAWS(require('aws-sdk'));
const https = AWSXRay.captureHTTPs(require('https'));

var dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"});


exports.handler = function (event, context, callback) {
    statusCode = 200;
    responseBody = {
        'message': 'hello from lambda'
    };
    response = {
        statusCode: statusCode,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(responseBody)
    };
    var options = {
        hostname: 'jsonplaceholder.typicode.com',
        port: 443,
        path: '/posts/1',
        method: 'GET'
      }

    var req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
          process.stdout.write(d)
        })
      })

      req.on('error', error => {
        console.error(error)
      })

    req.end()


    var options = {
        hostname: 'jsonplaceholder.typicode.com',
        port: 443,
        path: '/posts/false',
        method: 'GET'
    }

    var req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)

        res.on('data', d => {
            process.stdout.write(d)
        })
    })

    req.on('error', error => {
    console.error(error)
    })

    req.end()

    async function scanForResults(){
        try {
            var params = {
                TableName: "test"
            };
            var result = await dynamodb.scan(params).promise()
            console.log(JSON.stringify(result))
        } catch (error) {
            console.error(error);
        }
    }
    scanForResults()

    return callback(null, response);
}

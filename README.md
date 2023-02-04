# Parental-control-app

This is the backend repositiory for a prototype parental control application.

The url to test route is:

`https://7dw32zvl44.execute-api.eu-west-3.amazonaws.com/dev/api/v1/testing`

**base url:** `https://7dw32zvl44.execute-api.eu-west-3.amazonaws.com/dev/api/v1`

1. There are 3 ways of running this repo.
   a. A local serverless function using `serverless-offline`
   b. An express server.
   c. In production as a Lambda function
2. To deploy to lambda, ensure that the **_httpServer.listen_** function in `setupServer.ts` is commented out.
